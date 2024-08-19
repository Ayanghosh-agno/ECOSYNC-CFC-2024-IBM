

 #define SIM800L_IP5306_VERSION_20200811
  #include "utilities.h"

  #define IP5306_ADDR                 0X75
#define IP5306_REG_SYS_CTL0         0x00
#define IP5306_REG_SYS_CTL1         0x01
#define IP5306_REG_SYS_CTL2         0x02
#define IP5306_REG_READ0       0x70
#define IP5306_REG_READ1      0x71
#define IP5306_REG_READ3      0x78  

#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>


String network, radio_rssi,statusCheck;
bool first_data_received = false;


#include <RadioLib.h>

// SX1262 has the following connections:
// NSS pin:   10 -> 14
// DIO1 pin:  2  -> 25
// NRST pin:  3  -> 12
// BUSY pin:  9  -> 27

#define display_TX            33
#define display_RX            32

//SX1262 radio = new Module(14, 25, 12, 27);

SX1262 radio = new Module(14, 34, 12, 25);
  

#define TINY_GSM_MODEM_SIM800
#define SerialMon Serial
#define SerialAT Serial1
#define SerialDisplay  Serial2

#define TINY_GSM_DEBUG SerialMon

// Define how you're planning to connect to the internet
#define TINY_GSM_USE_GPRS true
#define TINY_GSM_USE_WIFI false


// set GSM PIN, if any
#define GSM_PIN ""

const char apn[] = "airtelgprs.com";
const char gprsUser[] = "";
const char gprsPass[] = "";

const char FIREBASE_HOST[]  = "-WRITE-HERE-"; // Firebase Host URL
const String FIREBASE_AUTH  = "-WRITE-HERE-"; // Firebase Auth Creds
const String FIREBASE_PATH  = "/SensorData"; // Firebase path
const int SSL_PORT          = 443;

#include <ArduinoHttpClient.h> 
#include <TinyGsmClient.h>
#include <time.h>
#ifdef DUMP_AT_COMMANDS
#include "StreamDebugger.h"
StreamDebugger debugger(SerialAT, SerialMon);
TinyGsm modem(debugger);
#else
TinyGsm modem(SerialAT);
#endif

TinyGsmClientSecure gsm_client_secure_modem(modem,0);
HttpClient http_client = HttpClient(gsm_client_secure_modem, FIREBASE_HOST, SSL_PORT);

int ledStatus = LOW;
int timestamp;

uint32_t lastReconnectAttempt = 0;


#include <Arduino_JSON.h>
#include <Wire.h>

String authtoken;

void turnOffNetlight()
{
    SerialMon.println("Turning off SIM800 Red LED...");
    modem.sendAT("+CNETLIGHT=0");
}

void turnOnNetlight()
{
    SerialMon.println("Turning on SIM800 Red LED...");
    modem.sendAT("+CNETLIGHT=1");
}

void setUpGsm(){

    // Set console baud rate
    SerialMon.begin(115200);
    delay(10);
    setupModem();

    SerialMon.println("Wait...");
    loading_page("Powering Up.. Wait..", 5);
    digitalWrite(LED_GPIO, LED_ON);
    // Set GSM module baud rate and UART pins
    SerialAT.begin(115200, SERIAL_8N1, MODEM_RX, MODEM_TX);

    delay(2000);

    // Restart takes quite some time
    // To skip it, call init() instead of restart()
    loading_page("Initializing modem...", 25);
    SerialMon.println("Initializing modem...");
    modem.restart();
    // modem.init();
    
    String modemInfo = modem.getModemInfo();
    SerialMon.print("Modem Info: ");
    loading_page("Modem Setup Done", 45);
    SerialMon.println(modemInfo);

#if TINY_GSM_USE_GPRS
    // Unlock your SIM card with a PIN if needed
    if ( GSM_PIN && modem.getSimStatus() != 3 ) {
        modem.simUnlock(GSM_PIN);
    }
#endif

    SerialMon.print("Waiting for network...");
    loading_page("Waiting for network..", 55);
    if (!modem.waitForNetwork()) {
        SerialMon.println(" fail");
        delay(1000);
        return;
    }
      
    SerialMon.println(" success");

    if (modem.isNetworkConnected()) { 
      loading_page("Network connected", 65);
        SerialMon.println("Network connected");
        digitalWrite(LED_GPIO, LED_OFF);
        turnOnNetlight();
        //turnOffNetlight();
    
    }

    // GPRS connection parameters are usually set after network registration
    SerialMon.print(F("Connecting to "));
    SerialMon.print(apn);
    loading_page("Connecting to - " + String(apn), 75);
    if (!modem.gprsConnect(apn, gprsUser, gprsPass)) {
        SerialMon.println(" fail");
        delay(1000);
        return;
    }
    loading_page("Done !", 95);
    SerialMon.println(" success");

    if (modem.isGprsConnected()) {
        SerialMon.println("GPRS connected");
    }

}

String systemDate()
{
  String clk;
  SerialMon.println("Testing Clock time...");
  
    modem.sendAT("+CCLK?");
    
  if (modem.waitResponse(10000L, clk)!=1) {
    DBG(GF("Failed to get clock time. Command: +CCLK?"));
  } else {
    DBG(GF("Clock time: ") + clk);
  }
  SerialMon.println("Clock time..." + clk);
  clk.remove(0,clk.indexOf(':')+2);
  return clk;
}


String getBattery(){
  SerialMon.println("Testing Battery volt...");
  String txt;
  modem.sendAT("+CBC");
  if (modem.waitResponse(10000L,txt) != 1) {
    DBG(GF("+CBC"));}
    SerialMon.println(txt);
  txt = txt.substring(txt.indexOf(",") + 1, txt.length());
  return txt;  
}

String getOperatorName(){
  SerialMon.println("Getting Operator Name...");
  String txt;
  modem.sendAT("+COPS");
  if (modem.waitResponse(10000L,txt) != 1) {
    DBG(GF("+COPS"));}
    SerialMon.println(txt);
  return txt;  
}

void setup()
{  
  SerialDisplay.begin(9600, SERIAL_8N1, display_RX, display_TX);
  setUpGsm();
  SPI.begin(-1, -1, 15, -1);
  setup_lora_receiver();
}

void loading_page(String textVal, int loadbarVal){
      SerialDisplay.print("j0.val=");
      SerialDisplay.print(loadbarVal);  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);
      SerialDisplay.print("t0.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(textVal);  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);
}

void setup_lora_receiver(){
  Serial.print(F("[SX1262] Initializing ... "));
  int state = radio.begin(865.0, 500.0, 12, 5, 0x34, 22, 20);
  if (state == RADIOLIB_ERR_NONE) {
    loading_page("LORA Connected !", 98);
    SerialMon.println(F("success!"));
  } else {
    SerialMon.print(F("failed, code "));
    SerialMon.println(state);
    while (true);
  }
  radio.setPacketReceivedAction(setFlag);
  loading_page("LORA Listening.. Waiting for Data..", 99);
    
    
  SerialMon.print(F("[SX1262] Starting to listen ... "));
  state = radio.startReceive();
  if (state == RADIOLIB_ERR_NONE) {
    SerialMon.println(F("success!"));
  } else {
    SerialMon.print(F("failed, code "));
    SerialMon.println(state);
   // while (true);
  }
}

void loop()
{    
  digitalWrite(LED_GPIO, LED_OFF);
  delay(500);
  digitalWrite(LED_GPIO, LED_ON);
  delay(500);
  received_data_lora();
}
  
void PostToFirebase(const char* method, const String & path , const String & data, HttpClient* http) {
  String response;
  int statusCode = 0;
  http->connectionKeepAlive(); 

  String url;
  if (path[0] != '/') {
    url = "/";
  }
  url += path + ".json";
  url += "?auth=" + FIREBASE_AUTH;
  
  SerialMon.print("POST:");
  SerialMon.println(url);
  SerialMon.print("Data:");
  SerialMon.println(data);
  
  String contentType = "application/json";
  http->patch(url, contentType, data);
  
  statusCode = http->responseStatusCode();
  SerialMon.print("Status code: ");
  SerialMon.println(statusCode);
  response = http->responseBody();
  SerialMon.print("Response: ");
  Serial.println(response);

  if (!http->connected()) {
    SerialMon.println();
    http->stop();// Shutdown
    SerialMon.println("HTTP POST disconnected");
  }
}

int8_t getBatteryLevel() {
 uint8_t data;
  Wire.beginTransmission(IP5306_ADDR);
  Wire.write(IP5306_REG_READ3);
  Wire.endTransmission(false);
  Wire.requestFrom(IP5306_ADDR, 1);
  data = Wire.read()  ;
  Wire.endTransmission() ;
  switch (data & 0xF0) {
        case 0x00:
          return 100;
        case 0x80:
          return 75;
        case 0xC0:
          return 50;
        case 0xE0:
          return 25;
        default:
          return 0;
    }
}

bool isCharging() {
 uint8_t data;
  Wire.beginTransmission(IP5306_ADDR);
  Wire.write(IP5306_REG_READ0);
  Wire.endTransmission(false);
  Wire.requestFrom(IP5306_ADDR, 1) ;
  data = Wire.read() & 0x08  ;
  Wire.endTransmission() ;
 return data ;
}

bool isChargeFull() {
 uint8_t data;
  Wire.beginTransmission(IP5306_ADDR);
  Wire.write(IP5306_REG_READ1);
  Wire.endTransmission(false);
  Wire.requestFrom(IP5306_ADDR, 1);
  data = Wire.read() & 0x08 ;
  Wire.endTransmission() ;
 return data ;
}

volatile bool receivedFlag = false;

#if defined(ESP8266) || defined(ESP32)
  ICACHE_RAM_ATTR
#endif
void setFlag(void) {
  receivedFlag = true;
}

void received_data_lora(){
  
  if(receivedFlag) {
    if(!first_data_received){
      SerialDisplay.print("page 1");
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff); 
      first_data_received = true;
    }
    receivedFlag = false;
    String str;
    int state = radio.readData(str);
    
    if (state == RADIOLIB_ERR_NONE) {
      // packet was successfully received
      SerialMon.println(F("[SX1262] Received packet!"));

      // print data of the packet
      SerialMon.print(F("[SX1262] Data:\t\t"));
      SerialMon.println(str);
      Lora_Data_Handling(str);
      
      // print RSSI (Received Signal Strength Indicator)
      SerialMon.print(F("[SX1262] RSSI:\t\t"));
      SerialMon.print(radio.getRSSI());
      SerialMon.println(F(" dBm"));
      radio_rssi = String(radio.getRSSI());
      int signalStrength = map(int(radio.getRSSI()), -115, -70, 0, 100);
      signalStrength = constrain(signalStrength, 0, 100);
      network = signalStrength;
      SerialMon.print(signalStrength);
      SerialMon.print("%");

      // print SNR (Signal-to-Noise Ratio)
      SerialMon.print(F("[SX1262] SNR:\t\t"));
      SerialMon.print(radio.getSNR());
      SerialMon.println(F(" dB"));

      // print frequency error
      SerialMon.print(F("[SX1262] Frequency error:\t"));
      SerialMon.print(radio.getFrequencyError());
      SerialMon.println(F(" Hz"));

    } else if (state == RADIOLIB_ERR_CRC_MISMATCH) {
      // packet was received, but is malformed
      SerialMon.println(F("CRC error!"));

    } else {
      // some other error occurred
      SerialMon.print(F("failed, code "));
      SerialMon.println(state);

    }
  }
}

void Lora_Data_Handling(String str){
  JSONVar myObject = JSON.parse(str);
  String fieldData;
  if (JSON.typeof(myObject) != "undefined") {
  SerialMon.print("Network Connected :- ");
  SerialMon.println(modem.isNetworkConnected());
  SerialMon.println(myObject);
  String dateString;
  String dateTimeString;
  String network_strng;
  if(modem.isNetworkConnected()){
    network_strng = "AIRTEL";
    String clk = systemDate();
    dateString  = clk.substring(1,clk.indexOf(','));
    dateTimeString  = clk.substring(1,clk.indexOf('+'));
    
    SerialDisplay.print("vis p2,1");
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);
      
      SerialDisplay.print("vis p3,0");
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);
      
  }else{
    network_strng = "No Network !";
    
    SerialDisplay.print("vis p2,0");
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);
      
      SerialDisplay.print("vis p3,1");
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);
  }
  
  int rainPerc = map(int(myObject["R"]), 1023, 0, 0, 100);
  double lightPer = map(int(myObject["L"]),1024,0,0,100);
  String is_charging;
  int voltPerc = 11.9 * int(myObject["V"]);
  String Volt_detail;
  if(JSON.stringify(myObject["C"]) == "1" ){
    is_charging = "True";
    Volt_detail = "Bat Charging..";
    
      SerialDisplay.print("vis p1,0");
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);
      
      SerialDisplay.print("vis p4,1");
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);
      
  }else{
    is_charging = "False";
    Volt_detail = String(voltPerc) + " % | " + JSON.stringify(myObject["V"])+"v";

      SerialDisplay.print("vis p1,1");
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);
      
      SerialDisplay.print("vis p4,0");
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);
  }
  
  fieldData = "{";  
  fieldData += "\"Date\":\"" + dateString + "\",";
  fieldData += "\"DateTime\":\"" + dateTimeString + "\",";
  fieldData += "\"OutterTemp\":" + JSON.stringify(myObject["OT"]) + ",";
  fieldData += "\"OutterHum\":" + JSON.stringify(myObject["OH"]) + ",";
  fieldData += "\"SoilN\":" +  JSON.stringify(myObject["N"]) + ",";
  fieldData += "\"SoilP\":" + JSON.stringify(myObject["P"]) + ",";
  fieldData += "\"SoilK\":" + JSON.stringify(myObject["K"]) + ",";
  fieldData += "\"SoilM\":" + JSON.stringify(myObject["SM"]) + ",";
  fieldData += "\"SoilT\":" + JSON.stringify(myObject["ST"])+ ",";
  fieldData += "\"SoilPH\":" + JSON.stringify(myObject["PH"])+ ",";
  fieldData += "\"SoilEC\":" + JSON.stringify(myObject["EC"]) + ",";
  fieldData += "\"OutterLI\":" + String(lightPer) + ",";
  fieldData += "\"Charging\":\"" + is_charging + "\",";
  fieldData += "\"Transmitter Bat\":" + JSON.stringify(myObject["V"]) + ",";
  fieldData += "\"Rain\":" + String(rainPerc);
  fieldData += "}";


    // Setting values in the display :- 
      SerialDisplay.print("t15.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(network_strng);  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t14.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(network + " % | " +radio_rssi +" dB");  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);
    
      SerialDisplay.print("t0.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(dateString);  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t12.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(dateTimeString);  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t1.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(JSON.stringify(myObject["EC"]));  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t2.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(JSON.stringify(myObject["ST"]));  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t3.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(JSON.stringify(myObject["SM"]));  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t4.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(JSON.stringify(myObject["PH"]));  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t5.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(JSON.stringify(myObject["N"]));  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t6.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(JSON.stringify(myObject["K"]));  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t7.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(JSON.stringify(myObject["P"]));  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t11.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(JSON.stringify(myObject["OH"]));  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t9.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(JSON.stringify(myObject["OT"]));  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t10.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(String(rainPerc));  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      SerialDisplay.print("t8.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(String(lightPer));  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      
      SerialDisplay.print("t13.txt=");
      SerialDisplay.print("\"");  
      SerialDisplay.print(String(Volt_detail));  
      SerialDisplay.print("\"");  
      SerialDisplay.write(0xff);  
      SerialDisplay.write(0xff);
      SerialDisplay.write(0xff);

      }else{
        fieldData = "undefined";
      }
      if(modem.isNetworkConnected()){
        PostToFirebase("POST", FIREBASE_PATH, fieldData, &http_client);
      }
      SerialMon.println(fieldData);
}
