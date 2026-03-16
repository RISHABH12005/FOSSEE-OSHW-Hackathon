#include <Wire.h>
#include "DFRobot_BloodOxygen_S.h"

DFRobot_BloodOxygen_S_I2C sensor(&Wire, 0x57);

void setup() {
  Serial.begin(115200);
  delay(1000); 

  Wire.begin();  // SDA=A4, SCL=A5

  Serial.println("Initializing MAX30102...");

  if (!sensor.begin()) {
    Serial.println("MAX30102 NOT FOUND");
    while (1)
      ;
  }

  sensor.sensorStartCollect();
  Serial.println("✅ MAX30102 READY");
}

void loop() {
  sensor.getHeartbeatSPO2();

  int hr = sensor._sHeartbeatSPO2.Heartbeat;
  int spo2 = sensor._sHeartbeatSPO2.SPO2;
  Serial.print("{\"heartRate\":");
  Serial.print(hr);
  Serial.print(",\"spo2\":");
  Serial.print(spo2);
  Serial.println("}");


  delay(1000);
}
