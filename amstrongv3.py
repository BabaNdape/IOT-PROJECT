'''
**********************************************************************
* Filename    : client_amstrong.py
* Description : Test for DHT11 and bmp280 module
* Author      : GROUP 6
* E-mail      : 
* Website     : 
* Update      : Dream    2021-01-22   New release
**********************************************************************
'''


#from datetime import datetime

import requests
import json
import RPi.GPIO as GPIO
import smbus
import time

#########
# Config #
#########



### start###

#Numbers GPIOs 
GPIO.setmode(GPIO.BCM) 
      

# the baramoter bmp280 -> temp in/Out and pressure in/Out
delay = 0.05
address = 0x77
"""
bus I2C 1 -> temp In and pressure In
SDA1 	Donnees. A relier a SDI 
SCL1 	Horloge (clock). A relier a SCK 
"""
bus1 = smbus.SMBus(1)
"""
bus I2C 3  -> temp Out and pressure Out
SDA3 = GPIO23 	Donnees. A relier a SDI 
SCL1 = GPIO24 	Horloge (clock). A relier a SCK
"""
bus3 = smbus.SMBus(3)


# the dht11 ->  humidity in/Out

#GPIO17 ->  humidity In
DHTPIN_HIN = 17

#GPIO18 ->  humidity Out
DHTPIN_HOUT = 18


#FANS
#GPIO27 ->  Actuator  -> Fan1
RelayFAN1 = 27 
GPIO.setup(RelayFAN1, GPIO.OUT)


#start FAN1 
GPIO.output(RelayFAN1, GPIO.HIGH)

#GPIO22 -> Actuator -> Fan2
RelayFAN2 = 22
GPIO.setup(RelayFAN2, GPIO.OUT)
GPIO.output(RelayFAN2, GPIO.HIGH) 

# Alarm
#GPIO25 ->  Actuator  -> Buzzer
Buzzer = 25    # pin11
GPIO.setup(Buzzer, GPIO.OUT)
GPIO.output(Buzzer, GPIO.HIGH)

## base dictionnary
raspyData_dict = {}

#raspyAlarm_dict = {}

#debug
debug = True

# send data to server
url_post ="http://137.194.15.200:3000/sensors-data-raspy"

# abs(cTempin - cTempout) inf ss
ss = 1.0

# sleep time
sleep_time =  10

# NSS
nss = 12

# time_alarm
time_alarm = 0
"""
raspyData_dict = {
	"timestamp":"2021-01-17 10:12:25", 
	"temperatureIn" : 33.4,
	"temperatureOut" : 31.2, 
	"pressureIn" : 10,
	"pressureOut" : 11,
    "humidityIn" : 12,
	"humidityOut" : 12			
}

raspyAlarm_dict = {
	"timestamp":"2021-01-17 10:12:25", 
	"temperatureIn" : False,
	"temperatureOut" : False, 
	"pressureIn" : False,
	"pressureOut" : False,
    "humidityIn" : False,
	"humidityOut" : False			
}
"""

"""

functions of project

"""
def raspyData(hour,temp_i=33.4,temp_o=31.2,pres_i=10,pres_o=11,hum_i=12,hum_o=12):
	Data_dict = {}
	Data_dict["timestamp"]=hour
	Data_dict["temperatureIn"]=temp_i
	Data_dict["temperatureOut"]=temp_o
	Data_dict["pressureIn"]=pres_i
	Data_dict["pressureOut"]=pres_o
	Data_dict["humidityIn"]=hum_i
	Data_dict["humidityOut"]=hum_o
	return Data_dict
	
"""
def raspyAlarm(hour,temp_i=False,temp_o=False,pres_i=False,pres_o=False,hum_i=False,hum_o=False):
	Data_dict = {}
	Data_dict["timestamp"]=hour
	Data_dict["temperatureIn"]=temp_i
	Data_dict["temperatureOut"]=temp_o
	Data_dict["pressureIn"]=pres_i
	Data_dict["pressureOut"]=pres_o
	Data_dict["humidityIn"]=hum_i
	Data_dict["humidityOut"]=hum_o
	return Data_dict
"""

### for bmp280 ###
# requires smbus and time
###input bus with address of i2c device (bmp280) and delay (0.05 by default)
#output : cTemp in Celsius,  pressure in hPa

def read_bmp280_dat(bus, address,delay): 
	#Reading Data from i2c bus on address
    try:
    	b1 = bus.read_i2c_block_data(address, 0x88, 24)
    except:
	return False

    # Convert the data
    # Temp coefficents
    dig_T1 = b1[1] * 256 + b1[0]
    dig_T2 = b1[3] * 256 + b1[2]
    if dig_T2 > 32767 :
        dig_T2 -= 65536
    dig_T3 = b1[5] * 256 + b1[4]
    if dig_T3 > 32767 :
        dig_T3 -= 65536

    # Pressure coefficents
    dig_P1 = b1[7] * 256 + b1[6]
    dig_P2 = b1[9] * 256 + b1[8]
    if dig_P2 > 32767 :
        dig_P2 -= 65536
    dig_P3 = b1[11] * 256 + b1[10]
    if dig_P3 > 32767 :
        dig_P3 -= 65536
    dig_P4 = b1[13] * 256 + b1[12]
    if dig_P4 > 32767 :
        dig_P4 -= 65536
    dig_P5 = b1[15] * 256 + b1[14]
    if dig_P5 > 32767 :
        dig_P5 -= 65536
    dig_P6 = b1[17] * 256 + b1[16]
    if dig_P6 > 32767 :
        dig_P6 -= 65536
    dig_P7 = b1[19] * 256 + b1[18]
    if dig_P7 > 32767 :
        dig_P7 -= 65536
    dig_P8 = b1[21] * 256 + b1[20]
    if dig_P8 > 32767 :
        dig_P8 -= 65536
    dig_P9 = b1[23] * 256 + b1[22]
    if dig_P9 > 32767 :
        dig_P9 -= 65536

    # BMP280 address, 0x77(119)
    # Select Control measurement register, 0xF4(244)
    #		0x27(39)	Pressure and Temperature Oversampling rate = 1
    #					Normal mode
    bus.write_byte_data(address, 0xF4, 0x27)
    # BMP280 address, 0x77(119)
    # Select Configuration register, 0xF5(245)
    #		0xA0(00)	Stand_by time = 1000 ms
    bus.write_byte_data(address, 0xF5, 0xA0)

    time.sleep(delay)

    # BMP280 address, 0x77(119) 
    # Read data back from 0xF7(247), 8 bytes
    # Pressure MSB, Pressure LSB, Pressure xLSB, Temperature MSB, Temperature LSB
    # Temperature xLSB, Humidity MSB, Humidity LSB
    data = bus.read_i2c_block_data(address, 0xF7, 8)

    # Convert pressure and temperature data to 19-bits
    adc_p = ((data[0] * 65536) + (data[1] * 256) + (data[2] & 0xF0)) / 16
    adc_t = ((data[3] * 65536) + (data[4] * 256) + (data[5] & 0xF0)) / 16

    # Temperature offset calculations
    var1 = ((adc_t) / 16384.0 - (dig_T1) / 1024.0) * (dig_T2)
    var2 = (((adc_t) / 131072.0 - (dig_T1) / 8192.0) * ((adc_t)/131072.0 - (dig_T1)/8192.0)) * (dig_T3)
    # TEST
    if var1 == 0 :
	if debug:
		print "Data not good, skip bmp280"
	return False
    t_fine = (var1 + var2)
    cTemp = (var1 + var2) / 5120.0
    #fTemp = cTemp * 1.8 + 32

    # Pressure offset calculations
    var1 = (t_fine / 2.0) - 64000.0
    var2 = var1 * var1 * (dig_P6) / 32768.0
    var2 = var2 + var1 * (dig_P5) * 2.0
    var2 = (var2 / 4.0) + ((dig_P4) * 65536.0)
    var1 = ((dig_P3) * var1 * var1 / 524288.0 + ( dig_P2) * var1) / 524288.0
    var1 = (1.0 + var1 / 32768.0) * (dig_P1)
    p = 1048576.0 - adc_p
    p = (p - (var2 / 4096.0)) * 6250.0 / var1
    var1 = (dig_P9) * p * p / 2147483648.0
    var2 = p * (dig_P8) / 32768.0
    pressure = (p + (var1 + var2 + (dig_P7)) / 16.0) / 100
	
    return cTemp, pressure 


##for fan ##
# input RelayPin where relay's fan is connected
#output : FAN start
def start_fan(Relay) :
	GPIO.output(Relay, GPIO.HIGH)
	if debug:
		print "start FAN2 /n"
	
#output : FAN stop
def stop_fan(Relay) :
	GPIO.output(Relay, GPIO.LOW)
	if debug:
		print "stop FAN2 /n"
	
### FOR HUMIDITY ##
# input : port of dht11
# output : humidity in %
# paramaters of humidity : mandotory

MAX_UNCHANGE_COUNT = 100

STATE_INIT_PULL_DOWN = 1
STATE_INIT_PULL_UP = 2
STATE_DATA_FIRST_PULL_DOWN = 3
STATE_DATA_PULL_UP = 4
STATE_DATA_PULL_DOWN = 5

def read_dht11_dat(DHTPIN):
	GPIO.setup(DHTPIN, GPIO.OUT)
	GPIO.output(DHTPIN, GPIO.HIGH)
	time.sleep(0.05)
	GPIO.output(DHTPIN, GPIO.LOW)
	time.sleep(0.02)
	GPIO.setup(DHTPIN, GPIO.IN, GPIO.PUD_UP)

	unchanged_count = 0
	last = -1
	data = []
	while True:
		current = GPIO.input(DHTPIN)
		data.append(current)
		if last != current:
			unchanged_count = 0
			last = current
		else:
			unchanged_count += 1
			if unchanged_count > MAX_UNCHANGE_COUNT:
				break

	state = STATE_INIT_PULL_DOWN

	lengths = []
	current_length = 0

	for current in data:
		current_length += 1

		if state == STATE_INIT_PULL_DOWN:
			if current == GPIO.LOW:
				state = STATE_INIT_PULL_UP
			else:
				continue
		if state == STATE_INIT_PULL_UP:
			if current == GPIO.HIGH:
				state = STATE_DATA_FIRST_PULL_DOWN
			else:
				continue
		if state == STATE_DATA_FIRST_PULL_DOWN:
			if current == GPIO.LOW:
				state = STATE_DATA_PULL_UP
			else:
				continue
		if state == STATE_DATA_PULL_UP:
			if current == GPIO.HIGH:
				current_length = 0
				state = STATE_DATA_PULL_DOWN
			else:
				continue
		if state == STATE_DATA_PULL_DOWN:
			if current == GPIO.LOW:
				lengths.append(current_length)
				state = STATE_DATA_PULL_UP
			else:
				continue
	if len(lengths) != 40:
		if debug:
			print "Data not good, skip dht11v1"
		return False

	shortest_pull_up = min(lengths)
	longest_pull_up = max(lengths)
	halfway = (longest_pull_up + shortest_pull_up) / 2
	bits = []
	the_bytes = []
	byte = 0

	for length in lengths:
		bit = 0
		if length > halfway:
			bit = 1
		bits.append(bit)
	#print "bits: %s, length: %d" % (bits, len(bits))
	for i in range(0, len(bits)):
		byte = byte << 1
		if (bits[i]):
			byte = byte | 1
		else:
			byte = byte | 0
		if ((i + 1) % 8 == 0):
			the_bytes.append(byte)
			byte = 0
	#print the_bytes
	checksum = (the_bytes[0] + the_bytes[1] + the_bytes[2] + the_bytes[3]) & 0xFF
	if the_bytes[4] != checksum:
		if debug:
			print "Data not good, skip dht11v2"
		return False
# the_bytes[2] == temperature
	return the_bytes[0]

##for buzzer ##
# input BuzzerPin where buzzer is connected

#output : buzzer start
def start_buz(BuzzerPin):
	GPIO.output(BuzzerPin, GPIO.LOW)
	if debug:
		print "buzzer start"
		print "/n"	

#output : buzzer stop
def stop_buz(BuzzerPin):
	GPIO.output(BuzzerPin, GPIO.HIGH)
	if debug:
		print "buzzer stop"
		print "/n"

def destroy():
	GPIO.cleanup()
	if debug:
		print "clean GPIO"
	

def main():

	#get time

	seconds = int(time.time())
	time_alarm = 0

	while True:
		#get temp in/out and pressure in/out
		#reading temp in and pressure in from i2c bus3
		bresultin = read_bmp280_dat(bus1, address, delay)
		#reading temp out and pressure out from i2c bus1
		bresultout = read_bmp280_dat(bus3, address, delay)
		#reading humidity in
		dresultin = read_dht11_dat(DHTPIN_HIN)
		#reading humidity out
		dresultout = read_dht11_dat(DHTPIN_HOUT)
 		
		if (bresultin and bresultout and dresultin and dresultout):
			cTempin, pressurein = bresultin
			cTempout, pressureout = bresultout
			raspyData_dict = raspyData(seconds,temp_i=cTempin,pres_i=pressurein,hum_i=dresultin,temp_o=cTempout,pres_o=pressureout,hum_o=dresultout)
			
			if debug:
				print "/n"
				print raspyData_dict
				print "/n"
			#send data to server
			res = requests.post(url_post, json=raspyData_dict)
			
			if debug:
				print "response of server :"
				print(res.text)
				print "/n"	
			
			#stop buzzer
			stop_buz(Buzzer)
			
			if (abs(cTempin-cTempout) > ss):
			#start fan
				start_fan(RelayFAN2)
			else:
			#stop fan
				stop_fan(RelayFAN2)
			time_alarm = 0
		else:
			time_alarm = time_alarm + 1
			if (time_alarm > nss):

				#start buzzer
				start_buz(Buzzer)
				time_alarm = 0

		time.sleep(sleep_time)	

if __name__ == '__main__':
	try:
		main()
	except KeyboardInterrupt:
		destroy()


