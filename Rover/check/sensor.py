# check_ultrasonic_sensor.py

import brickpi3
import time

BP = brickpi3.BrickPi3()

def test_ultrasonic(port):
    print(f"\nChecking Ultrasonic Sensor on Port {port}...")

    try:
        BP.set_sensor_type(port, BP.SENSOR_TYPE.EV3_ULTRASONIC_CM)
        time.sleep(1)

        value1 = BP.get_sensor(port)
        time.sleep(1)
        value2 = BP.get_sensor(port)

        if 0 <= value2 <= 255:
            print("  ✔ Status: WORKING")
            print("  ➜ Sensor: LEGO EV3 Ultrasonic")
            print(f"  ➜ Distance: {value2} cm")

            if value1 != value2:
                print("  ➜ Detail: Sensor responding")
            else:
                print("  ➜ Detail: Stable reading")

        else:
            print("  ❌ Status: NOT WORKING")
            print("  ➜ Detail: Invalid distance value")

    except Exception as e:
        print("  ❌ Status: ERROR / NOT CONNECTED")
        print(f"  ➜ Error Detail: {e}")


if __name__ == "__main__":
    print("====== LEGO EV3 ULTRASONIC SENSOR TEST ======")

    try:
        for port in [BP.PORT_1, BP.PORT_2, BP.PORT_3, BP.PORT_4]:
            test_ultrasonic(port)

    except Exception as e:
        print("\n❌ Critical Error:", e)

    finally:
        BP.reset_all()   # Safe cleanup
        print("\nBrickPi safely reset.")
        print("====== TEST COMPLETE ======")