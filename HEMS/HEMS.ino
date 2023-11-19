/*
 *  Simple HTTP get webclient test
 */

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// const char* ssid     = "CenturyLink8078";
// const char* password = "2816158333";

const char* ssid     = "CenturyLink8078";
const char* password = "2816158333";

const char* host = "192.168.0.134";
const int server_port = 7000;

String serverAddress = "http://"+String(host)+":"+String(server_port); 


HTTPClient http;
WiFiClient wifiClient; // Declare a WiFiClient object

void setup() {
  Serial.begin(115200);
  delay(100);

  // We start by connecting to a WiFi network
  Serial.print("Connecting to ");
  Serial.println(ssid);
  
  WiFi.begin(ssid, password);
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("WiFi connected");  

}


void loop() {
  // delay(5000);

  Serial.print("connecting to ");
  Serial.println(serverAddress);
  

  http.begin(wifiClient, serverAddress);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded"); // Set the content type

  // Data to send in the POST request
  String postData = "Current=18"; // Replace with your data

  // int httpCode = http.GET();
  int httpCode = http.POST(postData);

  if (httpCode > 0) {
    if (httpCode == HTTP_CODE_OK) {
      String payload = http.getString();
      Serial.println("Server Response: " + payload);
    }
  } else {
    Serial.println("Error on HTTP request");
  }

  http.end();
  delay(5000); // Wait for 5 seconds
}