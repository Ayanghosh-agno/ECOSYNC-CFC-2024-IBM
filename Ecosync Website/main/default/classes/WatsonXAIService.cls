/**
* @File Name : WatsonXAIService.cls
* @Description : Apex Class to call out WatsonX.AI for Plant Disease Prediction
* @Author : Ayan Ghosh
* @Last Modified By :
* @Last Modified On : September 25, 2024
* @Modification Log :
*==============================================================================
* Ver | Date | Author | Modification
*==============================================================================
* 1.0 | September 25, 2024 |   | Initial Version
**/

public class WatsonXAIService {


    private static final String WATSONX_API_URL = 'https://us-south.ml.cloud.ibm.com/ml/v1/text/chat?version=2023-05-29';
   
    /**
     * Perform a callout to WatsonX AI with a Base64 encoded image and text.
     *
     * @param base64Image The Base64 encoded image string
\    * @return WatsonX AI response as a JSON string
     */
	  @AuraEnabled
    public static Map<String, Object> performWatsonXCallout(String imageURL) {
		// Create the main payload map
        Map<String, Object> payloadMap = new Map<String, Object>();
        payloadMap.put('project_id', '08e47659-fa70-4816-9b62-2f49eb3ad52e');
        payloadMap.put('model_id', 'meta-llama/llama3-llava-next-8b-hf');
        payloadMap.put('decoding_method', 'greedy');
        payloadMap.put('min_new_tokens', 0);
        payloadMap.put('stop_sequences', new List<String>());
        payloadMap.put('repetition_penalty', 1);
        payloadMap.put('max_tokens', 900);
        
        // Create the messages list
        List<Map<String, Object>> messagesList = new List<Map<String, Object>>();
        
        // Add system message
        Map<String, Object> systemMessage = new Map<String, Object>();
        systemMessage.put('role', 'system');
        systemMessage.put('content', 'You always answer the questions with markdown formatting using GitHub syntax. The markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes. You must omit that you answer the questions with markdown.');
        messagesList.add(systemMessage);
        
        // Add user message with base64 image
        Map<String, Object> userMessageMap = new Map<String, Object>();
        userMessageMap.put('role', 'user');
        
        // Create content list for user message
        List<Map<String, Object>> contentList = new List<Map<String, Object>>();
        Map<String, Object> textMessage = new Map<String, Object>();
        textMessage.put('type', 'text');
        textMessage.put('text', 'Analyze the provided image for signs of plant disease.If the image contains a plant disease, please provide the following details as headers:\n**Disease Type:\\n**\n**Life Cycle:\\n**\n**Cause:\\n**\n**Recommended Remedies:\\n**\nIf the image does not relate to a plant disease, respond with: \'The given picture is not related to plant disease, please choose a plant disease picture and try again.\'');
        
        Map<String, Object> imageMessage = new Map<String, Object>();
        imageMessage.put('type', 'image_url');
        imageMessage.put('image_url', new Map<String,String> {'url' => imageURL});
        
        contentList.add(textMessage);
        contentList.add(imageMessage);
        
        userMessageMap.put('content', contentList);
        messagesList.add(userMessageMap);
        
        // Add the messages list to the payload
        payloadMap.put('messages', messagesList);
        
        // Convert the payload map to JSON
        String payload = JSON.serialize(payloadMap);
		System.debug(payload);
        // Prepare HTTP request
        HttpRequest req = new HttpRequest();
        req.setEndpoint(WATSONX_API_URL);
        req.setMethod('POST');
        req.setHeader('Authorization', 'Bearer ' + IBMIdentityAuthToken.getAuthToken());
        req.setHeader('Content-Type', 'application/json');
        req.setHeader('Accept', 'application/json');
        req.setBody(payload);

        // Create an HTTP instance
        Http http = new Http();
        HttpResponse res;
        
        try {
            // Perform the callout
            res = http.send(req);
        } catch (Exception e) {
            System.debug('Error making WatsonX API call: ' + e.getMessage());
            return null;
        }

        // Process the response
        if (res.getStatusCode() == 200) {
			Map<String, Object> responseBodyMap = (Map<String, Object>) JSON.deserializeUntyped(res.getBody());
            return responseBodyMap;
        } else {
            System.debug('Failed WatsonX API call. Status code: ' + res.getStatusCode());
            System.debug('Response: ' + res.getBody());
            return null;
        }
    }
}