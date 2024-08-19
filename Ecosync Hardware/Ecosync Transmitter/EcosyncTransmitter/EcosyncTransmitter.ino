
// including library

#include <RadioLib.h> // For LORA

// For Humidity & Temperature Sensor
#include "DHT.h"        
#define DHTTYPE DHT11   
#define dht_dpin 7
DHT dht(dht_dpin, DHTTYPE);


// For GPS
#include <TinyGPS++.h>

 // For Soil Sensor
#include <SoftwareSerial.h>
#include <Wire.h>
const byte temp[] = {0x01,0x03, 0x00, 0x13, 0x00, 0x01, 0x75, 0xcf};
const byte soil_moist[]  = {0x01,0x03,0x00,0x12,0x00,0x01,0x24,0x0F};
const byte ec[] = {0x01,0x03, 0x00, 0x15, 0x00, 0x01, 0x95, 0xce};
const byte soil_ph[] = {0x01,0x03, 0x00, 0x06, 0x00, 0x01, 0x64, 0x0b};

const byte nitro[] = { 0x01, 0x03, 0x00, 0x1E, 0x00, 0x01, 0xE4, 0x0C };
const byte phos[] = { 0x01, 0x03, 0x00, 0x1f, 0x00, 0x01, 0xb5, 0xcc };
const byte pota[] = { 0x01, 0x03, 0x00, 0x20, 0x00, 0x01, 0x85, 0xc0 };


// SX1262 has the following connections:
// NSS pin:   10
// DIO1 pin:  2
// NRST pin:  3
// BUSY pin:  9
SX1262 radio = new Module(10, 2, 3, 9);

// save transmission state between loops
int transmissionState = RADIOLIB_ERR_NONE;

byte values[11];
SoftwareSerial mod(6,8);////// TX AND RX

TinyGPSPlus gps;

void setup() {
  dht.begin();
  Serial.begin(9600);
  mod.begin(9600);
  pinMode(5, INPUT);
  delay(700);
  Serial.print(F("[SX1262] Initializing ... "));
  int state = radio.begin(865.0, 500.0, 12, 5, 0x34, 22, 20);
  if (state == RADIOLIB_ERR_NONE) {
    Serial.println(F("success!"));
  } else {
    Serial.print(F("failed, code "));
    Serial.println(state);
    while (true);
  }

  // set the function that will be called
  // when packet transmission is finished
  radio.setPacketSentAction(setFlag);
  // start transmitting the first packet
  Serial.print(F("[SX1262] Sending first packet ... "));
  transmissionState = radio.startTransmit("Welcome from Eco Sync!");

}

// flag to indicate that a packet was sent
volatile bool transmittedFlag = false;

#if defined(ESP8266) || defined(ESP32)
  ICACHE_RAM_ATTR
#endif
void setFlag(void) {
  // we sent a packet, set the flag
  transmittedFlag = true;
}


void loop() {
  // check if the previous transmission finished
  if(transmittedFlag) {
    // reset flag
    transmittedFlag = false;

    if (transmissionState == RADIOLIB_ERR_NONE) {
      // packet was successfully sent
      Serial.println(F("transmission finished!"));
    } else {
      Serial.print(F("failed, code "));
      Serial.println(transmissionState);

    }
    radio.finishTransmit();

    // wait a second before transmitting again
    delay(1000);

   int h = dht.readHumidity();
  int t = dht.readTemperature();

  byte val1,val2,val3,val4,val5,val6,val7;
  val1 = nitrogen();
  delay(250);
  val2 = phosphorous();
  delay(250);
  val3 = potassium();
  delay(250);
  val4 = ph();
  delay(250);
  val5 = moist();
  delay(250);
  val6 = stemp();
  delay(250);
  val7 = econd();
  delay(250);
  
  int volt = analogRead(A2);
  double voltage = map(volt,0,1023,0,2500);
  voltage /= 100 ; 
  String jsonData = "{";
  jsonData += "\"OT\":" + String(t) + ",";
  jsonData += "\"OH\":" + String(h) + ",";
  jsonData += "\"N\":" + String(val1) + ",";
  jsonData += "\"P\":" + String(val2) + ",";
  jsonData += "\"K\":" + String(val3) + ",";
  jsonData += "\"PH\":" + String(val4/25) + ",";
  jsonData += "\"SM\":" + String(val5/1.8) + ",";
  jsonData += "\"ST\":" + String(val6/10) + ",";
  jsonData += "\"EC\":" + String(val7)+",";
  jsonData += "\"V\":" + String(voltage)+",";
  jsonData += "\"C\":" + String(digitalRead(5))+",";
  jsonData += "\"L\":" + String(analogRead(A1))+",";
  jsonData += "\"R\":" + String((analogRead(A0)));
  jsonData += "}";
  
  transmissionState = radio.startTransmit(jsonData);
  Serial.println(jsonData);
  delay(15000);
  }
}

byte nitrogen(){
  delay(10);
  if(mod.write(nitro,sizeof(nitro))==8){
    for(byte i=0;i<7;i++){
    //Serial.print(mod.read(),HEX);
    values[i] = mod.read();
    //Serial.print(F(values[i],HEX));
    }
    //Serial.println();
  }
  return values[4];
}
  
byte phosphorous(){
  delay(10);
  if(mod.write(phos,sizeof(phos))==8){
    for(byte i=0;i<7;i++){
    //Serial.print(mod.read(),HEX);
    values[i] = mod.read();
    //Serial.print(values[i],HEX);
    }
    //Serial.println();
  }
  return values[4];
}
  
byte potassium(){
  delay(10);
  if(mod.write(pota,sizeof(pota))==8){
    for(byte i=0;i<7;i++){
    //Serial.print(mod.read(),HEX);
    values[i] = mod.read();
    //Serial.print(values[i],HEX);
    }
    //Serial.println();
  }
  return values[4];
}


byte ph(){
  delay(10);
  if(mod.write(soil_ph,sizeof(soil_ph))==8){
    for(byte i=0;i<7;i++){
    //Serial.print(mod.read(),HEX);
    values[i] = mod.read();
    //Serial.print(values[i],HEX);
    }
    //Serial.println();
  }
  return values[4];
}


byte moist(){
  delay(10);
  if(mod.write(soil_moist,sizeof(soil_moist))==8){
    for(byte i=0;i<7;i++){
    //Serial.print(mod.read(),HEX);
    values[i] = mod.read();
    //Serial.print(values[i],HEX);
    }
    //Serial.println();
  }
  return values[4];
}


byte stemp(){
  delay(10);
  if(mod.write(temp,sizeof(temp))==8){
    for(byte i=0;i<7;i++){
    //Serial.print(mod.read(),HEX);
    values[i] = mod.read();
    //Serial.print(values[i],HEX);
    }
    //Serial.println();
  }
  return values[4];
}


byte econd(){
  delay(10);
  if(mod.write(ec,sizeof(ec))==8){
    for(byte i=0;i<7;i++){
    //Serial.print(mod.read(),HEX);
    values[i] = mod.read();
    //Serial.print(values[i],HEX);
    }
    //Serial.println();
  }
  return values[4];
}
