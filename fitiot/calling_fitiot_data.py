import time
import subprocess

sleepTimer = 5

while 1:
    result = subprocess.check_output("python3 fitiot_data.py", shell=True)
    time.sleep(sleepTimer)
    