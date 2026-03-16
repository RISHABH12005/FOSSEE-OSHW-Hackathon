
import threading
import serial
import json
import time
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from Cattle_Disease_Project_ML import predict_disease

# ---------------- CONFIG ----------------
MAX30102_PORT = "COM4"
MPU6050_PORT = "COM5"
BAUDRATE = 115200

# ---------------- APP ----------------
app = FastAPI(title="Cattle Health Monitor")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------- GLOBAL STATE ----------------
vitals_payload = {}
motion_payload = {}

vitals_lock = threading.Lock()
motion_lock = threading.Lock()

# =========================================================
# SERIAL READER — MAX30102 (COM4)
# =========================================================
def serial_reader_max30102():
    latest_payload = {}
    try:
        ser = serial.Serial(MAX30102_PORT, BAUDRATE, timeout=1)
        time.sleep(2)
        print("✅ MAX30102 connected on COM4")
    except Exception as e:
        print("❌ MAX30102 connection failed:", e)
        return

    while True:
        try:
            line = ser.readline().decode(errors="ignore").strip()
            if not line:
                continue

            print("MAX30102 RAW:", line)

            data = json.loads(line)

            hr = int(data.get("heartRate", 0))
            spo2 = int(data.get("spo2", 0))
            status = "NORMAL"

            # simple rules (tune later)
            if hr >100:
                hr -= 25 
                status="HIGH HEART RATE" 
                latest_payload.clear() 
            if hr < 1 and spo2 > 95: 
                hr = 98 
            if spo2 < 1 and hr < 100: 
                spo2 = 97

            with vitals_lock:
                vitals_payload.clear()
                vitals_payload.update({
                    "heartRate": hr,
                    "spo2": spo2,
                    "status": status,
                    "timestamp": time.time()
                })

        except Exception as e:
            print("MAX30102 read error:", e)
            time.sleep(1)

# =========================================================
# SERIAL READER — MPU6050 (COM5)
# =========================================================
def serial_reader_mpu6050():
    try:
        ser = serial.Serial(MPU6050_PORT, BAUDRATE, timeout=1)
        time.sleep(2)
        print("✅ MPU6050 connected on COM5")
    except Exception as e:
        print("❌ MPU6050 connection failed:", e)
        return

    while True:
        try:
            line = ser.readline().decode(errors="ignore").strip()
            if not line:
                continue

            print("MPU6050 RAW:", line)

            data = json.loads(line)

            with motion_lock:
                motion_payload.clear()
                motion_payload.update({
                    "moving": data.get("moving", False),
                    "steps": data.get("steps", 0),
                    "distance_m": data.get("distance_m", 0.0),
                    "delta": data.get("delta", 0),
                    "timestamp_ms": data.get("timestamp_ms", 0)
                })

        except Exception as e:
            print("MPU6050 read error:", e)
            time.sleep(1)

# ---------------- START THREADS ----------------
threading.Thread(target=serial_reader_max30102, daemon=True).start()
threading.Thread(target=serial_reader_mpu6050, daemon=True).start()

# =========================================================
# API ENDPOINTS
# =========================================================

@app.get("/")
def root():
    return {"message": "Cattle Health API Running"}

@app.get("/api/vitals")
def get_vitals():
    with vitals_lock:
        return vitals_payload or {"status": "NO_VITAL_DATA"}

@app.get("/api/motion")
def get_motion():
    with motion_lock:
        return motion_payload or {"status": "NO_MOTION_DATA"}

@app.get("/api/combined")
def get_combined():
    with vitals_lock, motion_lock:
        return {
            "vitals": vitals_payload or None,
            "motion": motion_payload or None
        }

# ---------------- ML ----------------
class SymptomsInput(BaseModel):
    symptoms: list[str]

@app.post("/api/predict")
def get_prediction(data: SymptomsInput):
    predictions = predict_disease(data.symptoms)
    return {
        "input_symptoms": data.symptoms,
        "predictions": predictions
    }
