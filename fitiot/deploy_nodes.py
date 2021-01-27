import subprocess
import threading

br_port = "95"
server_port = "101"
id = "244140"

#to do: thread for tunslip
def tunslip():
  tunslip_command ="sudo tunslip6.py -v2 -L -a m3-" + br_port + " -p 20000 2001:660:5307:3140::1/64"
  deploy_tunslip = subprocess.check_output(tunslip_command, shell=True)
  print(deploy_tunslip)

t = threading.Thread(target = tunslip)
t.setDaemon(True)
t.start()

deploy_br_command = "iotlab-node --flash ~/iot-lab/parts/contiki/examples/ipv6/rpl-border-router/border-router.iotlab-m3 -l grenoble,m3," + br_port + " -i " + id
deploy_br = subprocess.check_output(deploy_br_command, shell=True)
print(deploy_br)

deploy_server_command = "iotlab-node --flash ~/iot-lab/parts/contiki/examples/iotlab/04-er-rest-example/er-example-server.iotlab-m3 -e grenoble,m3," + br_port + " -i " + id
deploy_server = subprocess.check_output(deploy_server_command, shell=True)
print(deploy_server)

