# This is the unique useful file, the other files are just for testing/part of this one

import subprocess
import json
import time
import threading

from datetime import datetime

#from aiocoap import *

#command to create an experiment named rio_project of duration 5mins
experiment = "iotlab-experiment submit -n rio_project -d 5 -l 2,archi=m3:at86rf231+site=grenoble"
result = subprocess.check_output(experiment, shell=True)
#print(result)
id = json.loads(result)
exp_id = id['id'] #id of experiment...useful when multiple experiments are running

time.sleep(10) #to allow time for platform to create experiment

#command to get details of an experiment
get_nodes = "iotlab-experiment get -i " +str(exp_id) + " -n"
nodes = subprocess.check_output(get_nodes, shell=True)
print(nodes)
items = json.loads(nodes)
br_ip     =str(items['items'][0]['uid']) #ip adr suffix of border router
server_ip =str(items['items'][1]['uid']) #ip adr suffix of server node

#command to get active nodes
get_id = "iotlab-experiment get -i " +str(exp_id) + " -ni"
nodes_id = subprocess.check_output(get_id, shell=True)
print(nodes_id)
n_id = json.loads(nodes_id)
ids = n_id['items'][0]['grenoble']['m3']

#get 2 digit or 3 digit node
if len(ids) in range(5,8):
        if len(ids) == 5:
                br_port =str(str(ids[0]) + str(ids[1]))
                server_port =str(str(ids[3]) + str(ids[4]))
        if len(ids) == 6:
                br_port =str(str(ids[0]) + str(ids[1]))
                server_port =str(str(ids[3]) + str(ids[4]) + str(ids[5]))
        if len(ids) == 7:
                br_port =str(str(ids[0]) + str(ids[1]) + str(ids[2]))
                server_port =str(str(ids[4]) + str(ids[5]) + str(ids[6]))
else:
        print( "Erreur de ID" )

#print(br_port)
#print(server_port)
#print(br_ip)
#print(server_ip)

time.sleep(5) #allow experiment time to launch

#thread for tunslip
alive = True # keeps daemon alive

def tunslip():
        while(alive):
                 tunslip_command ="sudo tunslip6.py -v2 -L -a m3-" + br_port + " -p 20000 2001:660:5307:3140::1/64"
                 deploy_tunslip = subprocess.check_output(tunslip_command, shell=True)
                 print(deploy_tunslip)

t = threading.Thread(target = tunslip)
t.setDaemon(True)
t.start()

#command to deploy border router
deploy_br_command = "iotlab-node --flash ~/iot-lab/parts/contiki/examples/ipv6/rpl-border-router/border-router.iotlab-m3 -l grenoble,m3," + br_port + " -i " + str(exp_id)
deploy_br = subprocess.check_output(deploy_br_command, shell=True)
print(deploy_br)

#command to deploy fit iot server node
deploy_server_command = "iotlab-node --flash ~/iot-lab/parts/contiki/examples/iotlab/04-er-rest-example/er-example-server.iotlab-m3 -e grenoble,m3," + br_port + " -i " +str(exp_id)
deploy_server = subprocess.check_output(deploy_server_command, shell=True)
print(deploy_server)

#command to get data
command = "aiocoap-client "
coap_server_prefix = "coap://[2001:660:5307:3140::"
port = "5683/"

##pressure can be used to calculate temperature
temperature_data = "sensors/pressure"

coap_server = command + coap_server_prefix + server_ip + "]:" + port + temperature_data
result = subprocess.check_output(coap_server, shell=True)
alive = False #kills daemon


pressure = int(result[0] + result[1] + result[2])
print("pressure = " + str(pressure)) #stored in a variable...to be sent to database



#command to post data
command = "aiocoap-client "
coap_http_server_prefix = "coap://[2001:660:330f:f::c8]:" #TO-DO modifier pour l'ip du serveur
port = "5683/"
path = "sensors-data-fitiot"

#To-do mettre les bonnes valeurs dans le payload

now = datetime.now()
timestamp = time.time()

temperature = pressure/2

payload = "{'timestamp':timestamp,'temperature':temperature,'humidity':pressure,'alarm':false}"

#payload = json.dumps({"timestamp":3,"temperature":2,"humidity":1,"alarm":"False"})

print(payload)

coap_http_server = command + coap_http_server_prefix+ port + path + " --payload " + payload

result = subprocess.check_output(coap_http_server, shell=True)
