#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

/* 1. Define the WiFi credentials */
#define WIFI_SSID "Guest"
#define WIFI_PASSWORD ""

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
bool firebaseBool;
unsigned long count = 0;
bool startTimer = 0;
unsigned long keepAliveTime;

struct Button
{
  const uint8_t PIN;
  uint32_t keyPresses;
  bool pressed;
};

Button button = {13,0};


void IRAM_ATTR interrupt()
{
  Serial.println("------INTERRUPT-----");
  button.pressed = true;
}

void setup()
{
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

  
  if (!Firebase.RTDB.beginStream(&fbdoDownload, "/TC/DoorState"))
  {
    //Could not begin stream connection, then print out the error detail
    Serial.println(fbdoDownload.errorReason());
  }
  if (!Firebase.RTDB.beginStream(&fbdoUpload, "/TC/DoorState"))
  {
    //Could not begin stream connection, then print out the error detail
    Serial.println(fbdoUpload.errorReason());
  } 
  pinMode(button.PIN, INPUT_PULLUP);
  attachInterrupt(button.PIN, interrupt, RISING); 
}


void loop()
{
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
    if(fbdoDownload.dataType() == "boolean")
    {
        firebaseBool = fbdoDownload.boolData();
        Serial.println(firebaseBool);
    }
  }

  if(startTimer == 0)
  {
      keepAliveTime = millis();
      startTimer = 1;
  }
  
  
  if(button.pressed)
  {
    long int start = millis();

    if(firebaseBool == 1)
    {
      Firebase.RTDB.setBool(&fbdoUpload, "/TC/DoorState", false);
    }
    else if(firebaseBool == 0)
    {
      Firebase.RTDB.setBool(&fbdoUpload, "/TC/DoorState", true);
    }
    
    Serial.print("Milliseconds: ");
    Serial.println(millis() - start);
    button.pressed = false;
  }
  

  if((millis() - keepAliveTime) == 39999 ||  (millis() - keepAliveTime) == 40000 || (millis() - keepAliveTime) == 40001)
  {
      Firebase.RTDB.setInt(&fbdoUpload, "/deanTest/keepAlive", 1);
      Serial.println("keep Alive!!!!");    
      keepAliveTime = millis();
      startTimer = 0;
  }
}





   
