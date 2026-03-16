# check_interfaces.py
import subprocess

def check_i2c():
    result = subprocess.run(["lsmod"], capture_output=True, text=True)
    if "i2c_bcm2835" in result.stdout:
        print("I2C: OK")
    else:
        print("I2C: NOT ENABLED")

def check_spi():
    result = subprocess.run(["lsmod"], capture_output=True, text=True)
    if "spi_bcm2835" in result.stdout:
        print("SPI: OK")
    else:
        print("SPI: NOT ENABLED")

if __name__ == "__main__":
    check_i2c()
    check_spi()