#include <Wire.h>
#include <MPU6050.h>

MPU6050 mpu;

// ---------- CONFIG ----------
#define STEP_THRESHOLD 2500
#define MOVEMENT_THRESHOLD 800
#define STEP_LENGTH_M 0.8

#define MOVEMENT_CONFIRM_MS 500
#define STEP_DELAY_MS 350

// ---------- VARIABLES ----------
bool isMoving = false;
unsigned long stepCount = 0;
float distanceMeters = 0;

unsigned long lastStepTime = 0;
unsigned long movementStartTime = 0;

long prevMagnitude = 0;

// ---------- SETUP ----------
void setup() {
  Serial.begin(115200);
  Wire.begin();

  Serial.println("{\"status\":\"initializing\"}");

  mpu.initialize();

  if (!mpu.testConnection()) {
    Serial.println("{\"error\":\"MPU6050 not found\"}");
    while (1);
  }

  Serial.println("{\"status\":\"mpu6050_ready\"}");
}

// ---------- LOOP ----------
void loop() {
  int16_t ax, ay, az;
  mpu.getAcceleration(&ax, &ay, &az);

  long magnitude = sqrt(
    (long)ax * ax +
    (long)ay * ay +
    (long)az * az
  );

  long delta = abs(magnitude - prevMagnitude);
  prevMagnitude = magnitude;

  unsigned long now = millis();

  // ---------- MOVEMENT DETECTION ----------
  if (delta > MOVEMENT_THRESHOLD) {
    if (movementStartTime == 0) {
      movementStartTime = now;
    }
    if (now - movementStartTime > MOVEMENT_CONFIRM_MS) {
      isMoving = true;
    }
  } else {
    movementStartTime = 0;
    isMoving = false;
  }

  // ---------- STEP DETECTION ----------
  if (
    isMoving &&
    delta > STEP_THRESHOLD &&
    (now - lastStepTime) > STEP_DELAY_MS
  ) {
    stepCount++;
    distanceMeters = stepCount * STEP_LENGTH_M;
    lastStepTime = now;
  }

  // ---------- JSON OUTPUT ----------
  Serial.print("{");
  Serial.print("\"moving\":"); Serial.print(isMoving ? "true" : "false");
  Serial.print(",\"steps\":"); Serial.print(stepCount);
  Serial.print(",\"distance_m\":"); Serial.print(distanceMeters, 2);
  Serial.print(",\"delta\":"); Serial.print(delta);
  Serial.print(",\"timestamp_ms\":"); Serial.print(now);
  Serial.println("}");

  delay(100);
}
