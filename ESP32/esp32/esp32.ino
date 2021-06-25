#include <WiFi.h>
#include <Firebase_ESP_Client.h>

//Provide the token generation process info.
#include "addons/TokenHelper.h"
//Provide the RTDB payload printing info and other helper functions.
#include "addons/RTDBHelper.h"

/* 1. Define the WiFi credentials */
#define WIFI_SSID "FengHomeLanMaster"
#define WIFI_PASSWORD "4124788751"

/* 2. Define the API Key */
#define API_KEY "AIzaSyCBn3bdnd0mHVJ_jZndJL-PzFdInaUxT9U"

/* 3. Define the RTDB URL */
#define DATABASE_URL "https://ece1140-default-rtdb.firebaseio.com/" //<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app

/* 4. Define the user Email and password that alreadey registerd or added in your project */
#define USER_EMAIL "joegocod3@gmail.com"
#define USER_PASSWORD "Password"

//Define Firebase Data object
FirebaseData fbdo;

FirebaseAuth auth;
FirebaseConfig config;

FirebaseJson json;

const int LED_PIN = 13;

bool ledStatus = false;
bool prevLedStatus = false;

void streamCallback(FirebaseStream data)
{

  //Print out all information

  Serial.println("Stream Data...");
  Serial.println(data.streamPath());
  Serial.println(data.dataPath());
  Serial.println(data.dataType());

//  FirebaseJsonData  jsonData = data.jsonData();
//
//  if (data.dataType() == "json") {
//    Serial.println(json.get(jsonData , "LED_STATUS", true));
//    Serial.println(json.get(jsonData , "speedSettings/paused", true));
//    Serial.println(json.get(jsonData , "speedSettings/speed", true));
//  }

  if (data.dataType() == "string") {
    if (data.stringData() == "ON") {                              
      Serial.println("Led Turned ON");      
      ledStatus = true;
    } else if (data.stringData()== "OFF") {
      Serial.println("Led Turned OFF");      
      ledStatus = false;
    } else {
      Serial.println("Wrong Credential! Please send ON/OFF");
    }
  }

}

//Global function that notifies when stream connection lost
//The library will resume the stream connection automatically
void streamTimeoutCallback(bool timeout)
{
  if(timeout){
    //Stream timeout occurred
    Serial.println("Stream timeout, resume streaming...");
  }  
}

void setup()
{
  pinMode(LED_PIN, OUTPUT);

  Serial.begin(115200);

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP: ");
  Serial.println(WiFi.localIP());
  Serial.println();

  Serial.printf("Firebase Client v%s\n\n", FIREBASE_CLIENT_VERSION);

  /* Assign the api key (required) */
  config.api_key = API_KEY;

  /* Assign the user sign in credentials */
  auth.user.email = USER_EMAIL;
  auth.user.password = USER_PASSWORD;

  /* Assign the RTDB URL (required) */
  config.database_url = DATABASE_URL;

  /* Assign the callback function for the long running token generation task */
  config.token_status_callback = tokenStatusCallback; //see addons/TokenHelper.h

  Firebase.begin(&config, &auth);

  Firebase.reconnectWiFi(true);

  Firebase.RTDB.setStreamCallback(&fbdo, streamCallback, streamTimeoutCallback);

  if (!Firebase.RTDB.beginStream(&fbdo, "/LED_STATUS"))
  {
    //Could not begin stream connection, then print out the error detail
    Serial.println(fbdo.errorReason());
  }
}

void loop()
{
  if (prevLedStatus != ledStatus) {
    digitalWrite(LED_PIN, ledStatus ? HIGH : LOW);    
    prevLedStatus = ledStatus;
  }
}
