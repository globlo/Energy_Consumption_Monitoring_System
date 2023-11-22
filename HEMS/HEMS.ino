/*
 *  Simple HTTP get webclient test
 */

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define acs712 A0

const String deviceID = "Treadmill"; 

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

  pinMode(acs712, INPUT);

}


void loop() {
  // delay(5000);

  unsigned int x=0;
  float sensor_data=0.0, average=0.0, current=0.0;

    for (int x = 0; x < 150; x++){ //Get 150 samples
    sensor_data = analogRead(acs712);     //Read current sensor values   
    average = average + sensor_data;  //Add samples together
    delay (3); // let ADC settle before next sample 3ms
    }
  average=average/150.0;//Taking Average of Samples

  Serial.print("average : ");
  Serial.println(average);//
  Serial.println();//

  average = average - 202;


  current = float(((average * (5.0 / 1024.0)) - 2.5 )/0.185);

  if (current < 0.006) {
    current = 0;
  }

  Serial.print("current : ");
  Serial.println(current, 5);//Print the read current on Serial monitor
  Serial.println();//
  

  Serial.print("connecting to ");
  Serial.println(serverAddress);
  

  http.begin(wifiClient, serverAddress);
  http.addHeader("Content-Type", "application/x-www-form-urlencoded"); // Set the content type

  

  // Data to send in the POST request
  String postData = "SensorId="+deviceID+"&Current=" + String(current, 16); // Convert the float# to a string with 16 decimal places

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
  delay(1000); // Wait for 5 seconds
}