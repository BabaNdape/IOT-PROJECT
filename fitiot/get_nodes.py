import subprocess
import json
import time

#command to create an experiment named rio_project of duration 15mins
experiment = "iotlab-experiment submit -n rio_project -d 5 -l 2,archi=m3:at86rf231+site=grenoble" 
result = subprocess.check_output(experiment, shell=True) 
print(result)
id = json.loads(result)
exp_id = id['id']

time.sleep(7) #to allow time for platform to create experiment

get_nodes = "iotlab-experiment get -i " +str(exp_id) + " -n"
nodes = subprocess.check_output(get_nodes, shell=True)
print(nodes)
items = json.loads(nodes)
br_ip     =str(items['items'][0]['uid'])
server_ip =str(items['items'][1]['uid'])

get_id = "iotlab-experiment get -i " +str(exp_id) + " -ni"
nodes_id = subprocess.check_output(get_id, shell=True)
print(nodes_id)
n_id = json.loads(nodes_id)
ids = n_id['items'][0]['grenoble']['m3']

if len(ids) in range(5,8):
        if len(ids) == 5:
                br_port = str(ids[0]) + str(ids[1])
                server_port = str(ids[3]) + str(ids[4])
        if len(ids) == 6:
                br_port =str(ids[0]) + str(ids[1])
                server_port = str(ids[3]) + str(ids[4]) + str(ids[5])
        if len(ids) == 7:
                br_port = str(ids[0]) + str(ids[1]) + str(ids[2])
                server_port = str(ids[4]) + str(ids[5]) + str(ids[6])
else:
        print( "Erreur de ID" )

print(br_port)
print(server_port)
print(br_ip)
print(server_ip)
