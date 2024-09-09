public without sharing class EcoSyncController {
    @AuraEnabled
    public static Map<String,String> getLabelValue(List<String> labels,String lang){
        Map<String,String> labelWithLang = new Map<String,String> ();
        for(String ss: labels){
            String val;
            try{
                val = System.Label.get('',ss,lang);
            }catch(Exception e){
                val ='Label or Language error';
            }
            labelWithLang.put(ss,val);
        }
        return labelWithLang;
    }

    public static void sendSMS(){
        String smsBody='🎉 Case #[CaseNumber] created successfully! 🎉'+
        '\n\nHi [Name], your message: [CaseMessage] has been received. We\'ll review it and get back to you soon. Thanks for reaching out! 📝 '+
        '\n\n Visit our website for updates.';

        String smsBody2 = '🌿 ECOSYNC Environmental Report 🌿'+
        '\n\nHi [Name], here\'s your latest environmental data:'+
        '\n🌡 Temp: [AtmosphericTemperature]°C\n'+
        '💧 Humidity: [Humidity]%\n'+
        '🌧 Rain: [Rain]%\n'+
        '💡 Light: [LightIntensity] %\n'+
        '🌱 Soil Moisture: [SoilMoisture]%'+
        '\n🌾 N: [Nitrogen]mg/kg | P: [Phosphorus]mg/kg | K: [Potassium]mg/kg\n⚡️ EC: [EC] mS/cm | pH: [pH]\n\nLearn more at ECOSYNC.com.';
    }

    @AuraEnabled
    public static String createCase(String name, String email, String message){
        Case ca =new Case();
        ca.Subject='ECOSYNC Site case Raised by farmer - '+name;
        ca.Description=message;
        ca.SuppliedName=name;
        ca.SuppliedEmail=email;
        ca.Status='New';
        ca.Origin='Web';
        insert ca;

        EmailTemplate et = [SELECT Id,Subject, Body FROM EmailTemplate WHERE Name ='ECOSYNC_CaseCreationTemplate'];

        Messaging.SingleEmailMessage mymail = new Messaging.SingleEmailMessage();
        String[] toaddresses = new String[] {email}; 
        OrgWideEmailAddress[] owea = [select Id from OrgWideEmailAddress where Address ='ayanghosh.ece.20182037@gmail.com'];
		mymail.setOrgWideEmailAddressId(owea.get(0).Id);
        mymail.setToAddresses(toAddresses);
        mymail.setWhatId(ca.Id);
        mymail.setTargetObjectId('003J1000001jj9SIAQ');
        mymail.setSaveAsActivity(false);
        mymail.setTemplateId(et.id);
        Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mymail });

        return String.valueOf([SELECT id,CaseNumber from Case where Id = :ca.id].CaseNumber);
    } 

    @AuraEnabled
    public static void sendSensorNotification(Boolean isEmail, Boolean isPhone, String phoneNumber,String email,String localDateTime){
         List<Eco_Sync_Sensor_Detail_24_Hour__c> escDaily = [SELECT Id,Date__c,Atmosphere_Temperature__c,Atmosphere_Humidity__c,
         Soil_Phosphorus__c,Rain_Percentage__c,Soil_Temperature__c,Light_Intensity__c,
         Soil_Potassium__c,Soil_Electric_Conductivity__c,Soil_Ph__c,Soil_Nitrogen__c,
         Soil_Moisture_Percentage__c,Transmitter_Battery__c,CreatedDate
         FROM Eco_Sync_Sensor_Detail_24_Hour__c ORDER BY CreatedDate Desc limit 1];

        if(isEmail){
            EmailTemplate et = [SELECT Id,Subject, Body FROM EmailTemplate WHERE Name ='ECOSYNC_DataReport'];
            Messaging.SingleEmailMessage mymail = new Messaging.SingleEmailMessage();
            String[] toaddresses = new String[] {email}; 
            OrgWideEmailAddress[] owea = [select Id from OrgWideEmailAddress where Address ='ayanghosh.ece.20182037@gmail.com'];
            mymail.setOrgWideEmailAddressId(owea.get(0).Id);
            mymail.setToAddresses(toAddresses);
            mymail.setWhatId(escDaily[0].Id);
            mymail.setTargetObjectId('003J1000001jj9SIAQ');
            mymail.setSaveAsActivity(false);
            mymail.setTemplateId(et.id);
            Messaging.sendEmail(new Messaging.SingleEmailMessage[] { mymail });
        }

    if(isPhone){

        phoneNumber=phoneNumber.trim().right(10);
        phoneNumber='91'+phoneNumber;
        String api_key = '****';  // change with your api key
        String api_secret= '****'; // change with your api secret
        string fromNumber='*****';
        DateTime  createdDateTimeSensor = escDaily[0].CreatedDate;
        String strConvertedDate = createdDateTimeSensor.format('MM/dd/yyyy HH:mm:ss', 'Asia/kolkata');

        String message = 'ECOSYNC Environmental Report -' + localDateTime+
        '\n\nHi Farmer, here\'s your latest environmental data:\n'+
        '\n Temp: '+escDaily[0].Atmosphere_Temperature__c+' C\n'+
        ' Humidity: '+escDaily[0].Atmosphere_Humidity__c+' %\n'+
        ' Rain: '+escDaily[0].Rain_Percentage__c+' %\n'+
        ' Light: '+escDaily[0].Light_Intensity__c+' %\n'+
        ' Soil Moisture: '+escDaily[0].Soil_Moisture_Percentage__c+' %'+
        '\n Soil Nitrogen: '+escDaily[0].Soil_Nitrogen__c+' mg/kg' +
        '\n Soil Phosphorus: '+escDaily[0].Soil_Phosphorus__c+' mg/kg'+
        '\n Soil Potassium: '+escDaily[0].Soil_Potassium__c+' mg/kg'+
        '\n Soil EC: '+escDaily[0].Soil_Electric_Conductivity__c+' mS/cm '+
        '\n Soil pH: '+escDaily[0].Soil_Ph__c+
        '\n\nLearn more at https://agno-dev-ed.develop.my.site.com/CFC2024/s/.';

        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://rest.nexmo.com/sms/json');
        req.setMethod('POST'); 
        req.setHeader('Content-Type','application/json');
        req.setHeader('Content-Type','application/x-www-form-urlencoded');
        
        if(string.isNotBlank(fromNumber) && string.isNotBlank(phoneNumber) && string.isNotBlank(message))
        {
            string jsonString='from='+EncodingUtil.urlEncode(fromNumber, 'UTF-8')+'&text='+EncodingUtil.urlEncode(message, 'UTF-8')+
                '&to='+EncodingUtil.urlEncode(phoneNumber, 'UTF-8')
                +'&api_key='+EncodingUtil.urlEncode(api_key, 'UTF-8')+'&api_secret='+EncodingUtil.urlEncode(api_secret, 'UTF-8')+'';
            req.setBody(jsonString);
            system.debug('jsonString:'+jsonString);
            try{
                Http http = new Http();
                HTTPResponse res = http.send(req);
                
                if(res.getStatusCode()==200)
                {
                    system.debug('SMS Sent to '+fromNumber);
                }
                else{
                    system.debug('SMS Failed to sent :'+fromNumber);
                }
                
            }
            catch(Exception e){
                System.debug(e.getMessage());
            } 
        }
    }
    }

    @AuraEnabled
    public static SensorDataDisplay fetchLatestSensorData (){
        List<Eco_Sync_Sensor_Detail_24_Hour__c> escDaily = [SELECT Id,Date__c,Atmosphere_Temperature__c,Atmosphere_Humidity__c,
                                                                Soil_Phosphorus__c,Rain_Percentage__c,Soil_Temperature__c,Light_Intensity__c,
                                                                Soil_Potassium__c,Soil_Electric_Conductivity__c,Soil_Ph__c,Soil_Nitrogen__c,
                                                                Soil_Moisture_Percentage__c,Transmitter_Battery__c,CreatedDate
                                                                FROM Eco_Sync_Sensor_Detail_24_Hour__c ORDER BY CreatedDate Desc limit 1];

        List<AggregateResult> results = [ SELECT AVG(Atmosphere_Temperature__c) avgAtmTemp, AVG(Atmosphere_Humidity__c) avgAtmHum,
                                                AVG(Soil_Phosphorus__c) avgSoilP,AVG(Rain_Percentage__c) avgRain, AVG(Soil_Temperature__c) avgSoilT,
                                                AVG(Light_Intensity__c) avgLight,AVG(Soil_Potassium__c) avgSoilK, AVG(Soil_Electric_Conductivity__c) avgSoilEC,
                                                AVG(Soil_Ph__c) avgSoilPh, AVG(Soil_Nitrogen__c) avgSoilN, AVG(Soil_Moisture_Percentage__c) avgSoilM ,
                                                AVG(Transmitter_Battery__c) avgTransBat 
                                                FROM EcoSync_Daily_Log__c  
                                                WHERE CreatedDate < LAST_N_DAYS:30];
                                                
        EcoSync_Daily_Log__c ec = new EcoSync_Daily_Log__c();
                ec.Atmosphere_Temperature__c= (Decimal) results[0].get('avgAtmTemp');
                ec.Atmosphere_Humidity__c = (Decimal) results[0].get('avgAtmHum');	
                ec.Soil_Phosphorus__c = (Decimal) results[0].get('avgSoilP');
                ec.Rain_Percentage__c= (Decimal) results[0].get('avgRain');
                ec.Soil_Temperature__c= (Decimal) results[0].get('avgSoilT');
                ec.Light_Intensity__c= (Decimal) results[0].get('avgLight');
                ec.Soil_Potassium__c= (Decimal) results[0].get('avgSoilK');
                ec.Soil_Electric_Conductivity__c= (Decimal) results[0].get('avgSoilEC');
                ec.Soil_Ph__c= (Decimal) results[0].get('avgSoilPh');
                ec.Soil_Nitrogen__c = (Decimal) results[0].get('avgSoilN');
                ec.Soil_Moisture_Percentage__c = (Decimal) results[0].get('avgSoilM');
                ec.Transmitter_Battery__c = (Decimal) results[0].get('avgTransBat');

        SensorDataDisplay ecsyncDataDisplay = new SensorDataDisplay ();
        ecsyncDataDisplay.monthAvg = ec;
        ecsyncDataDisplay.latestData = escDaily[0];
                                  
        return ecsyncDataDisplay;
    }

    public class SensorDataDisplay{
        @AuraEnabled
        public Eco_Sync_Sensor_Detail_24_Hour__c latestData { get; set; }
    
        @AuraEnabled
        public EcoSync_Daily_Log__c  monthAvg { get; set; }
    }

@AuraEnabled(cacheable=true)
public static List<EcoSync_Daily_Log__c> getSoilEnvironParam()
    {
        return [Select Date__c, Atmosphere_Temperature__c,Atmosphere_Humidity__c,Soil_Phosphorus__c,
                 Rain_Percentage__c,Soil_Temperature__c,Light_Intensity__c,Soil_Potassium__c,
                 Soil_Electric_Conductivity__c,Soil_Ph__c,Soil_Nitrogen__c,Soil_Moisture_Percentage__c,
                 Transmitter_Battery__c from EcoSync_Daily_Log__c ORDER BY CreatedDate ASC Limit 10];
    }
	

}
