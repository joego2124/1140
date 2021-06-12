#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

/* 1. Define the WiFi credentials */
#define WIFI_SSID "Embedded Systems Class"
#define WIFI_PASSWORD "embedded1234"

/* 2. Define the API Key */
#define API_KEY "AIzaSyCBn3bdnd0mHVJ_jZndJL-PzFdInaUxT9U"

/* 3. Define the RTDB URL */
#define DATABASE_URL "ece1140-default-rtdb.firebaseio.com" //<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app

/* 4. Define the user Email and password that alreadey registerd or added in your project */
#define USER_EMAIL "joegocod3@gmail.com"
#define USER_PASSWORD "Password"

/* 5. Define the Firebase Data Object */
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

/* 6. GLOBAL VARIABLES  */
const int LED_PIN = 13;
bool ledStatus = false;
bool prevLedStatus = false;
int firebaseNumber;
int prevNumber;
int count = 0;



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
}

void loop()
{

  long int start = millis();
  //set int and check if success
  if(Firebase.RTDB.setInt(&fbdo, "/deanTest/output", count))
  {
    Serial.println(millis() - start);
  } 
  else
  {
    Serial.println(fbdo.errorReason());  
  }
  
  count++;
  delay(1000);
}
