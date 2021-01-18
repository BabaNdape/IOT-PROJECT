import subprocess

server_ip ="8477]"
command = "aiocoap-client"
coap_server_prefix = "coap://[2001:660:5307:3100::"
port = "5683/"

##pressure can be used to calculate temperature
temperature = "sensors/pressure"

coap_server = command + coap_server_prefix + port + temperature
result = subprocess.check_output(coap_server, shell=True)

##to do temperature calculations with ideal gas formula

pressure = int(coap_server[0] + coap_server[1] + coap_server[2])

####Création du JSON

        #measurementsJson = {
            #"timestamp": {type: Date, default:new Date()},
            #"temperature": temperature,
            #"humidity" : humidity,
            #"alarm": Boolean

        #}

        #url = 'localhost:3000 + '/sensoirs-data-fitiot'
        #response = requests.post(url, headers=headers, json=transactionJson)  # etape2
        #responseJson = response.json()
        #print(responseJson)

