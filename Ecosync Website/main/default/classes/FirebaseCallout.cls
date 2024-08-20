public class FirebaseCallout {

    // Method to make a callout to the Firebase URL and process the JSON response
    @future(callout=true)
    public static void makeCalloutAndProcessData() {
        String url = '***';
        
        // Make the HTTP request
        HttpRequest request = new HttpRequest();
        request.setEndpoint(url);
        request.setMethod('GET');
        // Send the request
        Http http = new Http();
        HttpResponse response = http.send(request);
        
        // Check the response
        if (response.getStatusCode() == 200) {
            // Parse the JSON response
            Map<String, Object> sensorData = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
            System.debug(sensorData);
            // Process the data
            if (sensorData != null && !sensorData.isEmpty()) {
                // Extract values from the JSON
                // String charging = (Boolean) sensorData.get('Charging');
                Eco_Sync_Sensor_Detail_24_Hour__c ec = new Eco_Sync_Sensor_Detail_24_Hour__c();
                ec.Date__c = (String) sensorData.get('Date');
                ec.Date_Time__c	= (String) sensorData.get('DateTime');
                ec.Atmosphere_Temperature__c= (Decimal) sensorData.get('OutterTemp');
                ec.Atmosphere_Humidity__c = (Decimal) sensorData.get('OutterHum');	
                ec.Soil_Phosphorus__c = (Decimal) sensorData.get('SoilP');
                ec.Rain_Percentage__c= (Decimal) sensorData.get('Rain');
                ec.Soil_Temperature__c= (Decimal) sensorData.get('SoilT');
                ec.Light_Intensity__c= (Decimal) sensorData.get('OutterLI');
                ec.Soil_Potassium__c= (Decimal) sensorData.get('SoilK');
                ec.Soil_Electric_Conductivity__c= (Decimal) sensorData.get('SoilEC');
                ec.Soil_Ph__c= (Decimal) sensorData.get('SoilPH');
                ec.Soil_Nitrogen__c = (Decimal) sensorData.get('SoilN');
                ec.Soil_Moisture_Percentage__c = (Decimal) sensorData.get('SoilM');
                ec.Transmitter_Battery__c = (Decimal) sensorData.get('Transmitter Bat');
                insert ec;
            }
        } else {
            // Handle error response
            System.debug('Error response: ' + response.getBody());
        }
    }
}