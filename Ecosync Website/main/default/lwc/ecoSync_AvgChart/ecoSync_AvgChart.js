import { LightningElement, wire, track } from 'lwc';
import getOpportunityList from '@salesforce/apex/DailyDataFetchController.getOpportunityList';

export default class EcoSync_AvgChart extends LightningElement {

    @track atmTempData;
    @track atmHumData;
    @track soilPData;
    @track soilKData;
    @track soilNData;
    @track soilTempData;
    @track soilMoisData;
    @track soilECData;
    @track soilPhData;
    @track lightIntensityData;
    @track rainPerData;
    @track transBatData;

    @track atmTempDataFlag = true;
    @track atmHumDataFlag = true;
    @track soilPDataFlag = true;
    @track soilKDataFlag = true;
    @track soilNDataFlag = true;
    @track soilTempDataFlag = true;
    @track soilMoisDataFlag = false;
    @track soilECDataFlag = false;
    @track soilPhDataFlag = false;
    @track lightIntensityDataFlag = false;
    @track rainPerDataFlag = false;
    @track transBatDataFlag = false;

    @track modalActive = false;



    @track selectedValues = ['atmTempData', 'atmHumData', 'soilPData', 'soilKData', 'soilNData', 'soilTempData'];
    options = [
        { label: 'Atmospheric Temperature', value: 'atmTempData' },
        { label: 'Atmospheric Humidity', value: 'atmHumData' },
        { label: 'Soil Phosphorus', value: 'soilPData' },
        { label: 'Soil Potassium', value: 'soilKData' },
        { label: 'Soil Nitrogen', value: 'soilNData' },
        { label: 'Soil Temperature', value: 'soilTempData' },
        { label: 'Soil Moisture', value: 'soilMoisData' },
        { label: 'Soil Electric Conductivity', value: 'soilECData' },
        { label: 'Soil PH', value: 'soilPhData' },
        { label: 'Light Intensity', value: 'lightIntensityData' },
        { label: 'Rain Percentage', value: 'rainPerData' },
        { label: 'Transmitter Battery', value: 'transBatData' }
    ];

    handleChange(event) {
        this.selectedValues = event.detail.value;
    }
    submitModal() {
        if (this.selectedValues.includes('atmTempData')) {
            this.atmTempDataFlag = true;
        } else {
            this.atmTempDataFlag = false;
        }
        if (this.selectedValues.includes('atmHumData')) {
            this.atmHumDataFlag = true;
        } else {
            this.atmHumDataFlag = false;
        }
        if (this.selectedValues.includes('soilPData')) {
            this.soilPDataFlag = true;
        } else {
            this.soilPDataFlag = false;
        }
        if (this.selectedValues.includes('soilKData')) {
            this.soilKDataFlag = true;
        } else {
            this.soilKDataFlag = false;
        }
        if (this.selectedValues.includes('soilNData')) {
            this.soilNDataFlag = true;
        } else {
            this.soilNDataFlag = false;
        }
        if (this.selectedValues.includes('soilTempData')) {
            this.soilTempDataFlag = true;
        } else {
            this.soilTempDataFlag = false;
        }
        if (this.selectedValues.includes('soilMoisData')) {
            this.soilMoisDataFlag = true;
        } else {
            this.soilMoisDataFlag = false;
        }
        if (this.selectedValues.includes('soilECData')) {
            this.soilECDataFlag = true;
        } else {
            this.soilECDataFlag = false;
        }
        if (this.selectedValues.includes('soilPhData')) {
            this.soilPhDataFlag = true;
        } else {
            this.soilPhDataFlag = false;
        }

        if (this.selectedValues.includes('lightIntensityData')) {
            this.lightIntensityDataFlag = true;
        } else {
            this.lightIntensityDataFlag = false;
        }
        if (this.selectedValues.includes('rainPerData')) {
            this.rainPerDataFlag = true;
        } else {
            this.rainPerDataFlag = false;
        }
        if (this.selectedValues.includes('transBatData')) {
            this.transBatDataFlag = true;
        } else {
            this.transBatDataFlag = false;
        }
        this.modalActive = false;
    }
    handleClick() {
        this.modalActive = true;
    }
    closeModal() {
        this.modalActive = false;
    }


    @wire(getOpportunityList)
    wiredOpprtunityList({ error, data }) {
        if (data) {
            let atmTempValue = []
            let atmTempLabel = []

            let atmHumValue = []
            let atmHumLabel = []

            let soilPValue = []
            let soilPLabel = []

            let soilKValue = []
            let soilKLabel = []

            let soilNValue = []
            let soilNLabel = []

            let soilTempValue = []
            let soilTempLabel = []

            let soilMoistureValue = []
            let soilMoistureLabel = []

            let soilECValue = []
            let soilECLabel = []

            let soilPhValue = []
            let soilPhLabel = []

            let lightIntensityValue = []
            let lightIntensityLabel = []

            let rainPercValue = []
            let rainPercLabel = []

            let transBatValue = []
            let transBatLabel = []

            data.forEach(item => {
                atmTempLabel.push(item.Date__c);
                atmTempValue.push(item.Atmosphere_Temperature__c)

                atmHumLabel.push(item.Date__c);
                atmHumValue.push(item.Atmosphere_Humidity__c)

                soilPLabel.push(item.Date__c);
                soilPValue.push(item.Soil_Phosphorus__c)

                soilNLabel.push(item.Date__c);
                soilNValue.push(item.Soil_Nitrogen__c)

                soilKLabel.push(item.Date__c);
                soilKValue.push(item.Soil_Potassium__c)

                soilMoistureLabel.push(item.Date__c);
                soilMoistureValue.push(item.Soil_Moisture_Percentage__c)

                soilECLabel.push(item.Date__c);
                soilECValue.push(item.Soil_Electric_Conductivity__c)

                soilTempLabel.push(item.Date__c);
                soilTempValue.push(item.Soil_Temperature__c)

                soilPhLabel.push(item.Date__c);
                soilPhValue.push(item.Soil_Ph__c)

                rainPercLabel.push(item.Date__c);
                rainPercValue.push(item.Rain_Percentage__c)

                lightIntensityLabel.push(item.Date__c);
                lightIntensityValue.push(item.Light_Intensity__c)

                transBatLabel.push(item.Date__c);
                transBatValue.push(item.Transmitter_Battery__c)

            })
            //#316f36a1 -> Light Gree, #7d5e16a1 -> light Yellow, #7d1616a1 Light Red,#5a167da1 -> Light Violet,0070d2a1 -> Light Blue
            this.atmTempData = {
                type: 'line',
                data: {
                    labels: atmTempLabel,
                    datasets: [
                        this.generateDatasetConfig('#d7892b8f', atmTempValue, '#d7892b')
                    ]
                },
                options: this.generateOptionsConfig('Atmospheric Temperature')
                ,
            };
            this.atmHumData = {
                type: 'line',
                data: {
                    labels: atmHumLabel,
                    datasets: [
                        this.generateDatasetConfig('#0070d2a1', atmHumValue, '#0070d2')
                    ]
                },
                options: this.generateOptionsConfig('Atmospheric Humidity')
                ,
            };
            this.soilPData = {
                type: 'line',
                data: {
                    labels: soilPLabel,
                    datasets: [
                        this.generateDatasetConfig('#5a167da1', soilPValue, '#5a167d')
                    ]
                },
                options: this.generateOptionsConfig('Soil Phosphorus')
                ,
            };
            this.soilKData = {
                type: 'line',
                data: {
                    labels: soilKLabel,
                    datasets: [
                        this.generateDatasetConfig('#7d1616a1', soilKValue, '#7d1616')
                    ]
                },
                options: this.generateOptionsConfig('Soil Potassium ')
                ,
            };
            this.soilNData = {
                type: 'line',
                data: {
                    labels: soilNLabel,
                    datasets: [
                        this.generateDatasetConfig('#7d5e16a1', soilNValue, '#7d5e16')
                    ]
                },
                options: this.generateOptionsConfig('Soil Nitrogen')
                ,
            };
            this.soilTempData = {
                type: 'line',
                data: {
                    labels: soilTempLabel,
                    datasets: [
                        this.generateDatasetConfig('#316f36a1', soilTempValue, '#316f36')
                    ]
                },
                options: this.generateOptionsConfig('Soil Temperature')
                ,
            };
            this.soilMoisData = {
                type: 'line',
                data: {
                    labels: soilMoistureLabel,
                    datasets: [
                        this.generateDatasetConfig('#0070d2a1', soilMoistureValue, '#0070d2')
                    ]
                },
                options: this.generateOptionsConfig('Soil Moisture')
                ,
            };
            this.soilECData = {
                type: 'line',
                data: {
                    labels: soilECLabel,
                    datasets: [
                        this.generateDatasetConfig('#5a167da1', soilECValue, '#5a167d')
                    ]
                },
                options: this.generateOptionsConfig('Soil Electronic Conductivity')
                ,
            };
            this.soilPhData = {
                type: 'line',
                data: {
                    labels: soilPhLabel,
                    datasets: [
                        this.generateDatasetConfig('#7d1616a1', soilPhValue, '#7d1616')
                    ]
                },
                options: this.generateOptionsConfig('Soil PH')
                ,
            };
            this.lightIntensityData = {
                type: 'line',
                data: {
                    labels: lightIntensityLabel,
                    datasets: [
                        this.generateDatasetConfig('#7d1616a1', lightIntensityValue, '#7d1616')
                    ]
                },
                options: this.generateOptionsConfig('Light Intensity')
                ,
            };
            this.rainPerData = {
                type: 'line',
                data: {
                    labels: rainPercLabel,
                    datasets: [
                        this.generateDatasetConfig('#7d5e16a1', rainPercValue, '#7d5e16')
                    ]
                },
                options: this.generateOptionsConfig('Rain Percentage')
                ,
            };
            this.transBatData = {
                type: 'line',
                data: {
                    labels: transBatLabel,
                    datasets: [
                        this.generateDatasetConfig('#7d5e16a1', transBatValue, '#7d5e16')
                    ]
                },
                options: this.generateOptionsConfig('Transmitter Battery')
                ,
            };
        }
        else if (error) {
            console.log(error);
        }
    }
    generateDatasetConfig(backgroundColor, chartData, borderColor) {
        const fill = true;
        return {
            backgroundColor,
            data: chartData,
            fill,
            borderWidth: 1,
            borderColor
        };
    }
    generateOptionsConfig(sensorParameter) {
        return {
            responsive: true,
            legend: { display: false },
            scales: {
                xAxes: [{ scaleLabel: { display: true, labelString: 'Date' }, gridLines: { color: "rgba(0, 0, 0, 0)" } }],
                yAxes: [{
                    scaleLabel: { display: true, labelString: `${sensorParameter}` }, gridLines: { color: "rgba(0, 0, 0, 0)" }, ticks: { stepSize: 10 }
                }]
            },
        };
    }
}