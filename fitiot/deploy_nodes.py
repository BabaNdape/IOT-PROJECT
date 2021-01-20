import subprocess

br_port = "103"
server_port = "104"
id = "243761"

#to do: thread for tunslip
tunslip_command ="sudo tunslip6.py -v2 -L -a m3-" + br_port + " -p 20000 2001:660:5307:3140::$ 
deploy_tunslip = subprocess.check_output(tunslip_command, shell=True)
print(deploy_tunslip)

deploy_br_command = "iotlab-node --flash ~/iot-lab/parts/contiki/examples/ipv6/rpl-border-rou$
deploy_br = subprocess.check_output(deploy_br_command, shell=True)
print(deploy_br)

deploy_server_command = "iotlab-node --flash ~/iot-lab/parts/contiki/examples/iotlab/04-er-re$
deploy_server = subprocess.check_output(deploy_server_command, shell=True)
print(deploy_server)
