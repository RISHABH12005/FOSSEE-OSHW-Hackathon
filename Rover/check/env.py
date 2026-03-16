# env_setup.py
import os
import subprocess
import sys

def create_virtual_env():
    print("Creating virtual environment...")

    if not os.path.exists("venv"):
        subprocess.run([sys.executable, "-m", "venv", "venv"])
        print("Virtual environment created.")
    else:
        print("Virtual environment already exists.")

if __name__ == "__main__":
    create_virtual_env()