
import struct
from fastapi.responses import StreamingResponse
#from M import move
from cam import generate_frames
#from sensor import sensor
import asyncio
import cv2
from fastapi import FastAPI, WebSocket,Request
from fastapi.middleware.cors import CORSMiddleware
# from ultralytics import YOLO
import struct  

app = FastAPI()

# CORS Middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],   
)

# Load YOLO Model
#model_path = "./last.pt"
#model = YOLO(model_path)  
#model.eval()
#sensor()

@app.websocket("/share")
async def video_stream(websocket: WebSocket):
    await websocket.accept()
    print("✅ Client Connected!")

    cap = cv2.VideoCapture(0)
    
    if not cap.isOpened():
        print("🚨 Camera not found! Closing connection.")
        await websocket.close()
        return
    
    try:
        while True:
            ret, frame = cap.read()
            if not ret:
                print("❌ No frame captured. Closing connection.")
                break

            #results = model.predict(frame)  

            # Encode frame to JPEG
            _, buffer = cv2.imencode(".jpg", frame)
            frame_bytes = buffer.tobytes()
            frame_size = len(frame_bytes)

            # Prefix frame with its size (8-byte header)
            header = struct.pack("<Q", frame_size)  # Little-endian, 8-byte integer
            await websocket.send_bytes(header + frame_bytes)

            print(f"📤 Sent Frame ({frame_size} bytes)")

            await asyncio.sleep(0.033)  # ~30 FPS

    except Exception as e:
        print(f"⚠️ WebSocket Error: {e}")

    finally:
        cap.release()
        if websocket.client_state.name != "DISCONNECTED":
            await websocket.close()
        print("🔌 WebSocket Connection Closed")


@app.get("/")
async def root():
    return {"message": "YOLO Object Detection WebSocket Server is running!"}

@app.post("/")
async def control_motor(request: Request):
    data = await request.json()
    print(data,"data")
    direction = data.get("direction")
    if direction:
        move(direction)
        return {"status": "success", "message": f"Motor moved {direction}"}
    return {"status": "error", "message": "Direction not provided"}

