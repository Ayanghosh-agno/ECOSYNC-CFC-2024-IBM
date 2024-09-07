global class EcoSyncDailySchedule implements Schedulable {
    global void execute(SchedulableContext sc) {
        List<Eco_Sync_Sensor_Detail_24_Hour__c> escDate = [Select Id,Date__c FROM Eco_Sync_Sensor_Detail_24_Hour__c order by createddate desc Limit 1];
        if(escDate.size() > 0){
            List<AggregateResult> results = [ SELECT AVG(Atmosphere_Temperature__c) avgAtmTemp, AVG(Atmosphere_Humidity__c) avgAtmHum,
                                                AVG(Soil_Phosphorus__c) avgSoilP,AVG(Rain_Percentage__c) avgRain, AVG(Soil_Temperature__c) avgSoilT,
                                                AVG(Light_Intensity__c) avgLight,AVG(Soil_Potassium__c) avgSoilK, AVG(Soil_Electric_Conductivity__c) avgSoilEC,
                                                AVG(Soil_Ph__c) avgSoilPh, AVG(Soil_Nitrogen__c) avgSoilN, AVG(Soil_Moisture_Percentage__c) avgSoilM ,
                                                AVG(Transmitter_Battery__c) avgTransBat 
                                                FROM Eco_Sync_Sensor_Detail_24_Hour__c  
                                                WHERE Date__c = :escDate[0].Date__c ];
        
            List<Eco_Sync_Sensor_Detail_24_Hour__c> escDaily = [SELECT Id,Date__c,Atmosphere_Temperature__c,Atmosphere_Humidity__c,
                                                                Soil_Phosphorus__c,Rain_Percentage__c,Soil_Temperature__c,Light_Intensity__c,
                                                                Soil_Potassium__c,Soil_Electric_Conductivity__c,Soil_Ph__c,Soil_Nitrogen__c,
                                                                Soil_Moisture_Percentage__c,Transmitter_Battery__c 
                                                                FROM Eco_Sync_Sensor_Detail_24_Hour__c 
                                                                WHERE Date__c = :escDate[0].Date__c];
            List<EcoSync_Daily_Log__c> dailyLogcheck = [SELECT Id FROM EcoSync_Daily_Log__c WHERE Date__c = :escDate[0].Date__c];
            if(results.size() > 0 && dailyLogcheck.size() == 0){
                EcoSync_Daily_Log__c ec = new EcoSync_Daily_Log__c();
                ec.Date__c = escDate[0].Date__c;
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
                insert ec;
            }
            delete [SELECT Id FROM Eco_Sync_Sensor_Detail_24_Hour__c];
        } 
    }
}
