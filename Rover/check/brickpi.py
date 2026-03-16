# install_brickpi.py
import subprocess
import sys

def check_brickpi():
    try:
        import brickpi3
        print("BrickPi library already installed.")
        return True
    except ImportError:
        print("BrickPi not installed. Installing...")
        return False

def install_brickpi():
    subprocess.run([sys.executable, "-m", "pip", "install", "brickpi3"])

if __name__ == "__main__":
    if not check_brickpi():
        install_brickpi()
        print("BrickPi installation complete.")