
import subprocess
import json
import time

experiment = "iotlab-experiment submit -n rio_project -d 15 -l 3,archi=m3:at86rf231+site=grenoble"
result = subprocess.check_output(experiment, shell=True)
print(result)
id = json.loads(result)
exp_id = id['id']

time.sleep(10)

get_nodes = "iotlab-experiment get -i " +str(exp_id) + " -n"
print(get_nodes)
nodes = subprocess.check_output(get_nodes, shell=True)
print(nodes)
#details = json(nodes)
#print(details['items'])
