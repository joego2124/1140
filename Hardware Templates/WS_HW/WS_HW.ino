#include <WiFi.h>
#include <Firebase_ESP_Client.h>
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

/* 1. Define the WiFi credentials */
#define WIFI_SSID "Gas Leak"
#define WIFI_PASSWORD "backleftburner"

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


// FIREBASE VARIABLES
bool switchState;
bool signalState;
bool * hello;

// GLOBAL VARIABLES
unsigned long count = 0;
bool startTimer = 0;
unsigned long keepAliveTime;
int currentSpeed;
portMUX_TYPE mux = portMUX_INITIALIZER_UNLOCKED;
unsigned long timer;





// ----------------- STRUCTS -------------------
struct Button
{
  const uint8_t PIN;
  uint32_t keyPresses;
  bool pressed;
};

Button signalCommand = {13,0};
Button switchSignal = {12,0};
// ------------------ END STRUCTS ---------------



// ----------------- INTERRUPTS -----------------------

//void IRAM_ATTR signalInterrupt()
//{
//  portENTER_CRITICAL_ISR(&mux); 
//  Serial.println("------INTERRUPT-----");
//  signalCommand.pressed = true;
//  portEXIT_CRITICAL_ISR(&mux); 
//}
//
//void IRAM_ATTR switchInterrupt()
//{
//  portENTER_CRITICAL_ISR(&mux); 
//  Serial.println("------INTERRUPT-----");
//  switchSignal.pressed = true;
//  portEXIT_CRITICAL_ISR(&mux); 
//}
// ------------------ END INTERRUPTS -----------------------



// ------------------ HELP FUNCTIONS -----------------------
void WifiSetup()
{
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
}
// ---------------- END HELP FUNCTIONS ---------------------


// ---------------- START SETUP ----------------------
void setup()
{
  Serial.begin(115200);
  WifiSetup();
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


  // START STREAMS
  if (!Firebase.RTDB.beginStream(&fbdoDownload, "/WSC"))
  {
    //Could not begin stream connection, then print out the error detail
    Serial.println(fbdoDownload.errorReason());
  }
  if (!Firebase.RTDB.beginStream(&fbdoUpload, "/WSC"))
  {
    //Could not begin stream connection, then print out the error detail
    Serial.println(fbdoUpload.errorReason());
  } 

  // ATTACH INTERRUPTS
  pinMode(signalCommand.PIN, INPUT_PULLUP);
//  attachInterrupt(digitalPinToInterrupt(signalCommand.PIN), signalInterrupt, FALLING);
  pinMode(switchSignal.PIN, INPUT_PULLUP);
//  attachInterrupt(digitalPinToInterrupt(switchSignal.PIN), switchInterrupt, FALLING); 

timer = millis();
}
// --------------------- END SETUP ----------------



// -------------------- START LOOP -----------------
void loop()
{
  // READ FIREBASE STREAM
  if(!Firebase.RTDB.readStream(&fbdoDownload))
  {
    Serial.println(fbdoDownload.errorReason());
  }


  // TIMEOUT HANDLING
  if(fbdoDownload.streamTimeout())
  {
    Serial.println("Stream timeout, resume streaming...");
    Serial.println();
  }


  // DOWNLOAD NECESSARY VARIABLES
//  if(fbdoDownload.streamAvailable())
//  {
//    if(fbdoDownload.dataType() == "boolean")
//    {
//        firebaseNum = fbdoDownload.intData();
//        Serial.println(firebaseNum);
//    }
//  }


  // KEEP ALIVE TIMER INIT
  if(startTimer == 0)
  {
      keepAliveTime = millis();
      startTimer = 1;
  }

  if(millis() - timer > 100)
  {
    // INTERRUPT READ/WRITE HANDLING
    if(digitalRead(signalCommand.PIN) == LOW)
    {
          if(fbdoDownload.streamAvailable())
            {
              if(fbdoDownload.dataType() == "boolean")
              {
                const String path = "/SignalCommand";
                  Firebase.RTDB.getBool(fbdoDownload, path, &signalState);
                  Serial.println(signalState);
              }
            }
      long int start = millis();
      Serial.println("Signal State: " + signalState);
  
      Firebase.RTDB.setBool(&fbdoUpload, "/WSC/SignalCommand", !signalState);
  
      Serial.print("Milliseconds: ");
      Serial.println(millis() - start);
      signalCommand.pressed = false;
      delay(100);
      
    }
    if(digitalRead(switchSignal.PIN) == LOW)
    {
      if(fbdoDownload.streamAvailable())
        {
          if(fbdoDownload.dataType() == "boolean")
          {
              switchState = fbdoDownload.boolData();
              Serial.println(switchState);
          }
        }
      
      long int start = millis();
      Serial.println(switchState);
  
      Firebase.RTDB.setBool(&fbdoUpload, "/WSC/SwitchState", !switchState);
  
      Serial.print("Milliseconds: ");
      Serial.println(millis() - start);
      switchSignal.pressed = false;
      
      
    }
  }
  

  // KEEP ALIVE HANDLING
  if((millis() - keepAliveTime) == 39999 ||  (millis() - keepAliveTime) == 40000 || (millis() - keepAliveTime) == 40001)
  {
      Firebase.RTDB.setInt(&fbdoUpload, "/deanTest/keepAlive", 1);
      Serial.println("keep Alive!!!!");    
      keepAliveTime = millis();
      startTimer = 0;
  }
}





   
