# check_motor_ports.py

import brickpi3
import time
import sys

BP = brickpi3.BrickPi3()

def test_motor(port):
    print(f"\nChecking Motor Port {port}...")

    try:
        BP.reset_motor_encoder(port)
        start = BP.get_motor_encoder(port)

        print("  Rotating motor...")
        BP.set_motor_power(port, 40)
        time.sleep(2)
        BP.set_motor_power(port, 0)

        end = BP.get_motor_encoder(port)
        movement = end - start

        if abs(movement) > 10:
            print("  ✔ Status: WORKING")
            print(f"  ➜ Encoder Change: {movement}")
        else:
            print("  ❌ Status: NOT WORKING")
            print(f"  ➜ Encoder Change: {movement}")
            print("  ➜ Detail: Motor powered but no rotation")

    except Exception as e:
        BP.set_motor_power(port, 0)  # Force stop motor
        print("  ❌ Status: ERROR / NOT CONNECTED")
        print(f"  ➜ Error Detail: {e}")

if __name__ == "__main__":
    print("====== MOTOR PORT DIAGNOSTIC ======")

    try:
        for port in [BP.PORT_A, BP.PORT_B, BP.PORT_C, BP.PORT_D]:
            test_motor(port)

    except Exception as e:
        print("\n❌ Critical Error:", e)

    finally:
        BP.reset_all()   # Force stop everything safely
        print("\nAll motors safely stopped.")
        print("====== TEST COMPLETE ======")