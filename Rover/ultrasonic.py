import time
import brickpi3
BP = brickpi3.BrickPi3()
BP.set_sensor_type(BP.PORT_2, BP.SENSOR_TYPE.EV3_ULTRASONIC_CM)
time.sleep(1)
try:
    while True:
        try:
            distance_2 = BP.get_sensor(BP.PORT_2)
            print("Distance:", distance_2, "cm")
        except brickpi3.SensorError as error:
            print("Sensor error:", error)
        time.sleep(1)
except KeyboardInterrupt:
    BP.reset_all()
    print("Program stopped")