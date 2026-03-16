import subprocess

def check_power():
    try:
        result = subprocess.run(
            ["vcgencmd", "get_throttled"],
            capture_output=True,
            text=True
        )

        if "0x0" in result.stdout:
            return "POWER SUPPLY: OK"
        else:
            return "POWER SUPPLY: LOW"

    except:
        return "POWER CHECK FAILED"