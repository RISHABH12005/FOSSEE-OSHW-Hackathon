# Livestock Monitoring System (LMS)

## Overview

The *LMS* is an advanced solution designed to improve livestock management & ensure their well-being there animals. By utilizing modern technology, this system helps farmers efficiently track livestock movements, monitor their health, detect obstacles in their surroundings using a combination of sensors & automation tools.

This system integrates *RPi 4B, Senset HAT, BrickPi, Speed Motors, Ultrasonic Sensors, RPi 5MP Cam* to enable real-time monitoring & automated operations. It enhances efficiency by detecting obstacles, automating movement, providing remote access to livestock data.

## Hardware Components

| Component                            | Quality | Function                                                |
| ------------------------------------ | ------- | ------------------------------------------------------- |
| *Raspberry Pi 4B (8GB RAM)*          |     2   | Controls the entire system                              |
| *Raspberry Pi Senset HAT*            |     1   | Collecting environmental data                           |
| *BrickPi*                            |     1   | Interfaces Raspberry Pi with LEGO Mindstorms components |
| *Raspberry Pi 5MP Camera*            |     1   | Captures live video feed                                |
| *LEGO Mindstorms Ultrasonic Sensors* |     2   | Detects obstacles at the front & back                   |
| *LEGO Mindstorms Speed Motors*       |     4   | Controls movement of gates & feeding systems            |

## Features

For our prototype, we are using a *website* to control the motors remotely & display real-time video feed directly on the web interface.

- *Live Camera Feed* – Enables remote livestock monitoring through a RPi Cam.
- *Obstacle Detection* – Uses ultrasonic sensors to detect & respond to obstacles.
- *Motorized Control* – Automates movement using Speed Motors.
- *Alert System* – Sends real-time notifications when obstacles are detected.

## Software & Libraries

- *Python* – Manages motor control & obstacle detection
- *Uvicorn* – ASGI server for running FastAPI applications
- *Websockets* – Facilitates real-time communication
- *Ngrok* – Enables secure remote access
- *BrickPi* – Interfaces RPi with Speed Moters
- *FastAPI* – Provides a high-performance API framework
- *OpenCV* – Handles image processing & computer vision tasks
- *Torch* – Supports AI/ML functionalities
- *Ultralytic* – Offers advanced data analytics

## Expected Output

- Real-time tracking of livestock movements
- Automated obstacle detection & response
- Control of gates & feeding systems
- Remote access to live video feed & system alerts
- Display the environmental data Humidity, Temperature, Pressure, Acceleration

## Future Enhancements

- *Raspberry Pi AI HAT +* for enhanced AI-based analytics
- *Thermal Camera* for livestock health monitoring based on temperature
- *Motion Sensor* for improved movement detection
- AI-driven livestock health analysis
- Remote control capabilities via a mobile app
- Cloud-based data storage & analytics for better decision-making
- RFID Tagging for individual animal identification.
- Solar Power Support for off-grid deployment.
- Local Data Processing -> All operations are processed in real-time, ensuring fast response & system autonomy without reliance on internet connectivity.
