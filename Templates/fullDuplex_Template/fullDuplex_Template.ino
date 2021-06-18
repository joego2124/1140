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
#define DATABASE_URL "https://ece1140-default-rtdb.firebaseio.com/" //<databaseName>.firebaseio.com or <databaseName>.<region>.firebasedatabase.app

/* 4. Define the user Email and password that alreadey registerd or added in your project */
#define USER_EMAIL "joegocod3@gmail.com"
#define USER_PASSWORD "Password"

/* 5. Define the Firebase Data Objects */
FirebaseData fbdoDownload;
FirebaseData fbdoUpload;
FirebaseAuth auth;
FirebaseConfig config;

/* 6. GLOBAL VARIABLES  */

const int LED_PIN = 13;
bool ledStatus = false;
bool prevLedStatus = false;
int firebaseNumber;
int prevNumber;


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

  Firebase.begin(&config, &auth);

  Firebase.reconnectWiFi(true);


  if (!Firebase.RTDB.beginStream(&fbdoDownload, "/deanTest/number"))
  {
    //Could not begin stream connection, then print out the error detail
    Serial.println(fbdoDownload.errorReason());
  }
  if (!Firebase.RTDB.beginStream(&fbdoUpload, "/deanTest/output"))
  {
    //Could not begin stream connection, then print out the error detail
    Serial.println(fbdoUpload.errorReason());
  }  
}


void loop()
{
  bool result;
  
  if(!Firebase.RTDB.readStream(&fbdoDownload))
  {
    Serial.println(fbdoDownload.errorReason());
  }
  if(fbdoDownload.streamTimeout())
  {
    Serial.println("Stream timeout, resume streaming...");
    Serial.println();
  }
  if(fbdoDownload.streamAvailable())
  {
    if(fbdoDownload.dataType() == "int")
    {
        firebaseNumber = fbdoDownload.intData();
    }
  }
  

  
  if (prevNumber != firebaseNumber)
  {
    prevNumber = firebaseNumber;
    Serial.println(firebaseNumber);

    
    int outputInt = prevNumber * 2;
    long int start = millis();
    result = Firebase.RTDB.setInt(&fbdoUpload, "/deanTest/output", outputInt);
    Serial.print("Milliseconds: ");
    Serial.println(millis() - start);
    Serial.println(outputInt);    
  }
  


  /*
  //stress test
  if (prevNumber != firebaseNumber)
  {
    prevNumber = firebaseNumber;

    
    int outputInt = prevNumber + 1;
    long int start = millis();
    result = Firebase.RTDB.setInt(&fbdoUpload, "/deanTest/number", outputInt);
    Serial.print("Milliseconds: ");
    Serial.println(millis() - start);
    
  }
  */

  
}





   
