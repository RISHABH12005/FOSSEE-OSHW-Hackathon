hostname -I

ip r

sudo nano /etc/dhcpcd.conf

interface wlan0                            # For Wi-Fi, use 'eth0' for Ethernet
static ip_address=192.168.1.100/24         # Set your desired static IP
static routers=192.168.1.1                 # Your router's IP (Gateway)
static domain_name_servers=192.168.1.1     # DNS server (can also use 8.8.8.8 for Google DNS)

# 192.168.1.100 -> 192.168.1.1               # Replace IP

# Ctrl+O -> Enter -> Ctrl + X                # Save & Exit

sudo systemctl restart dhcpcd

sudo reboot

hostname -I
