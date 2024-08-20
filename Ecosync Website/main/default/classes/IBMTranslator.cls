public class IBMTranslator {

    // Replace with your IBM Watson API credentials
    private static final String API_KEY = '***';
    private static final String API_URL = '***';
	@Auraenabled
    public static String translateText(String sourceText, String sourceLanguage, String targetLanguage) {
        Http http = new Http();
        HttpRequest request = new HttpRequest();
        HttpResponse response = new HttpResponse();
        System.debug(sourceText);
        // sourceText = sourceText.replace('\'', '\\\'');
        // System.debug(sourceText);
        // Build the URL for the translation API
        String apiUrl = API_URL + '/v3/translate?version=2018-05-01';
        request.setEndpoint(apiUrl);
        request.setMethod('POST');
        request.setTimeout(120000);
        request.setBody('{"text": "'+ sourceText+'","source": "'+ sourceLanguage+'","target": "'+targetLanguage+'"}');
        request.setHeader('Content-Type', 'application/json');
        request.setHeader('Authorization', 'Bearer '+ IBMIdentityAuthToken.getAuthToken());

        try {
            // Send the HTTP request
            response = http.send(request);
            
            if (response.getStatusCode() == 200) {
                Map<String, Object> jsonResponse = (Map<String, Object>) JSON.deserializeUntyped(response.getBody());
                List<Object> translations = (List<Object>) jsonResponse.get('translations');
                Map<String,Object> getData= (Map<String,Object>) translations[0];
                if (translations.size() > 0) {
                   return String.valueof(getData.get('translation'));
               }
            } else {
                System.debug('HTTP Error Response: ' + response.getStatusCode() + ' ' + response.getStatus());            }
        } catch (Exception e) {
            System.debug('Exception: ' + e.getMessage());
        }
        return null;
    }
}