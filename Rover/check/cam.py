from picamera2 import Picamera2
import cv2
import time
import signal
import sys

running = True

def signal_handler(sig, frame):
    global running
    running = False

signal.signal(signal.SIGINT, signal_handler)

picam2 = Picamera2()

# Use max sensor resolution
max_resolution = picam2.sensor_resolution

video_config = picam2.create_preview_configuration(
    main={"size": max_resolution, "format": "RGB888"}
)

picam2.configure(video_config)
picam2.start()

time.sleep(2)

print(f"\nStreaming live at resolution: {max_resolution}")
print("Press 'q' or Ctrl+C to exit\n")

prev_time = time.time()

while running:
    frame = picam2.capture_array()

    # FPS Calculation
    current_time = time.time()
    fps = 1 / (current_time - prev_time)
    prev_time = current_time

    # Show FPS on frame
    cv2.putText(frame,
                f"FPS: {int(fps)}",
                (20, 40),
                cv2.FONT_HERSHEY_SIMPLEX,
                1,
                (0, 255, 0),
                2)

    cv2.imshow("CSI Camera Stream", frame)

    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# Safe cleanup
cv2.destroyAllWindows()
picam2.stop()

print("\nCamera stopped safely.")