from sense_hat import SenseHat
import json
import time
from datetime import datetime

sense = SenseHat()

TEMP_CORRECTION = -2.0

try:
    while True:
        raw_temp = sense.get_temperature()
        temperature = raw_temp + TEMP_CORRECTION

        humidity = sense.get_humidity()
        pressure = sense.get_pressure()

        data = {
            "timestamp": datetime.now().isoformat(),
            "temperature": round(temperature, 2),
            "humidity": round(humidity, 2),
            "pressure": round(pressure, 2)
        }

        json_data = json.dumps(data)
        
        print(json_data)

        time.sleep(1)

except KeyboardInterrupt:
    print("Stopped")