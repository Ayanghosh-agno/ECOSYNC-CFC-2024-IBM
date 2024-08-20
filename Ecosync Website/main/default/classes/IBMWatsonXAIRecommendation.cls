public class IBMWatsonXAIRecommendation {
    @AuraEnabled
    public static Map<String, Object> makeWatsonCallout() {
        // Define the JSON payload 
        String plantationTime = '2 Months';
        List<Eco_Sync_Sensor_Detail_24_Hour__c> escDaily = [SELECT Id,Date__c,Atmosphere_Temperature__c,Atmosphere_Humidity__c,
                                                                Soil_Phosphorus__c,Rain_Percentage__c,Soil_Temperature__c,Light_Intensity__c,
                                                                Soil_Potassium__c,Soil_Electric_Conductivity__c,Soil_Ph__c,Soil_Nitrogen__c,
                                                                Soil_Moisture_Percentage__c,Transmitter_Battery__c,CreatedDate
                                                                FROM Eco_Sync_Sensor_Detail_24_Hour__c ORDER BY CreatedDate Desc];
        Map<String, Object> jsonMap = new Map<String, Object>{
            'input' => '<|start_header_id|>user<|end_header_id|>\n\nI have planted rice '+plantationTime+' back, Current Atmosphere Temperature is '+escDaily[0].Atmosphere_Temperature__c+' C, Humidity '+escDaily[0].Atmosphere_Humidity__c+' % , Rain '+escDaily[0].Rain_Percentage__c+' % , Soil Phosphorus is '+escDaily[0].Soil_Phosphorus__c+' mg/Kg, Soil Potassium is '+escDaily[0].Soil_Potassium__c+' mg/kg , Soil Nitrogen is '+escDaily[0].Soil_Nitrogen__c+' mg/Kg, Soil Ph '+escDaily[0].Soil_Ph__c+', Soil Moisture '+escDaily[0].Soil_Moisture_Percentage__c+'%, Soil EC is '+escDaily[0].Soil_Electric_Conductivity__c+' us/cm,Soil Temperature '+escDaily[0].Soil_Temperature__c+' C.\nCan you tell me the advices for best farming practice. also Mention the Best Crop for this Land,Best Fertilizer as paragraphs and header point. Donot use number formating<|eot_id|>',
                'parameters' => new Map<String, Object>{
                    'decoding_method' => 'greedy',
                        'max_new_tokens' => 900,
                        'min_new_tokens' => 0,
                        'stop_sequences' => new List<Object>(),
                        'repetition_penalty' => 1
                        },
                            'model_id' => 'meta-llama/llama-3-8b-instruct',
                            'project_id' => 'c150f5c3-3d73-4fbe-a2ac-2560d72fd8cd'
                            };
                                
                                String jsonPayload = JSON.serialize(jsonMap);
        
        
        // Define the endpoint URL
        String endpoint = 'https://eu-gb.ml.cloud.ibm.com/ml/v1/text/generation?version=2023-05-29';
        
        // Create an HTTP request
        HttpRequest request = new HttpRequest();
        request.setEndpoint(endpoint);
        request.setMethod('POST');
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('Authorization', 'Bearer '+ IBMIdentityAuthToken.getAuthToken());
        request.setBody(jsonPayload);
        
        // Create an HTTP object to send the request
        Http http = new Http();
        Map<String, Object> generatedText = new Map<String, Object>();
        try {
            // Send the request and get a response
            HttpResponse response = http.send(request);
            
            // Parse the response
            if (response.getStatusCode() == 200) {
                Map<String, Object> responseBodyMap = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                List<Object> parameters = (List<Object>) responseBodyMap.get('results');
                generatedText = (Map<String, Object>) parameters[0];
                system.debug(generatedText.get('generated_text'));
                // Handle successful response
                System.debug('HTTP Response Body: ' + response.getBody());
            } else {
                // Handle error response
                System.debug('HTTP Error Response: ' + response.getStatusCode() + ' ' + response.getStatus());
            }
        } catch (Exception e) {
            // Handle exception
            System.debug('HTTP Callout Error: ' + e.getMessage());
        }
        return generatedText;
    }
    
    
    
}