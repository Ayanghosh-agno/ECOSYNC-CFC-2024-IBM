import { LightningElement, track } from 'lwc';
import getLabelInfo from '@salesforce/apex/EcoSyncController.getLabelValue';
import fetchLatestSensorData from '@salesforce/apex/EcoSyncController.fetchLatestSensorData';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import sendSensorNotification from '@salesforce/apex/EcoSyncController.sendSensorNotification';
import Sensor_Icons from "@salesforce/resourceUrl/SensorIcon";
import { NavigationMixin } from 'lightning/navigation';

export default class EcoSyncSensorsData extends NavigationMixin(LightningElement) {
    @track selectedLang;
    @track emailBttn = 'Send Me An Email'
    @track smsBttn = 'Send Me A SMS'
    @track detailBttn = 'Go To Detail Page'
    @track isLoading =false;
    @track sensorData = [
        {
            Id: 1,
            CreatedDate: '17/06/2024, 01:00:01',
            Atmosphere_Temperature__c: '25',
            Atmosphere_Humidity__c: '60',
            Rain_Percentage__c: '10',
            Light_Intensity__c: '500',
            Soil_Electric_Conductivity__c: '500',
            Soil_Moisture_Percentage__c: '40',
            Soil_Nitrogen__c: '20',
            Soil_Phosphorus__c: '15',
            Soil_Temperature__c: '20',
            Soil_Potassium__c: '10',
            Soil_Ph__c: '6.5',
            Transmitter_Battery__c: '8.90',
        },
    ];
    get disable_submitbtn() {
        return Object.keys(this.errors).length == 0 && (this.emailId != '' || this.phoneNum != '') ? false : true;
    }
    get emailField() {
        return this.modalHeader.includes('email')
    }
    get phoneField() {
        return this.modalHeader.includes('mobile')
    }
    get sensorAvgType() {
        return this.selectedOption.includes('Average')
    }
    get title() {
        return this.selectedOption == 'Last Updated Data' ? this.lastUpdated : this.monthAvg
    }
    @track phoneNum = '';
    @track emailId = '';
    @track modalActive = false;
    @track modalHeader = '';
    @track selectedOption = 'Last Updated Data';
    @track errors = {};
    @track lastUpdated = 'Last Updated Data'
    @track monthAvg = '30 Days Average Data'
    @track localTime;
    errormsg = {
        email: 'Please enter your email address',
        phone: 'Please enter phone number',
    }
    @track options = [
        { label: 'Last Updated Data', value: 'Last Updated Data' },
        { label: '30 Days Average Data11', value: '30 Days Average Data' }
    ]

    @track allSensorData = {}

    get sensorValueStat() {
        try {
            if (this.allSensorData.latestData) {
                return this.selectedOption == 'Last Updated Data' ? this.allSensorData['latestData'] : this.allSensorData['monthAvg']
            }
            return this.sensorData[0]
        } catch (e) {
            console.log(e.message)
        }
    }

    get parameterData() {
        return [
            { key: 'AtmosphereTemperature', label: this.sensorLabel['AtmosphereTemperature'], value: Number(this.sensorValueStat.Atmosphere_Temperature__c).toFixed(2) + ' °C', image: `${Sensor_Icons}/Sensor-Icons/Atmosphere_Temp.jpg` },
            { key: 'AtmosphereHumidity', label: this.sensorLabel['AtmosphereHumidity'], value: Number(this.sensorValueStat.Atmosphere_Humidity__c).toFixed(2) + ' %', image: `${Sensor_Icons}/Sensor-Icons/Humidity.png` },
            { key: 'RainPercentage', label: this.sensorLabel['RainPercentage'], value: Number(this.sensorValueStat.Rain_Percentage__c).toFixed(2) + ' %', image: `${Sensor_Icons}/Sensor-Icons/Rain.png` },
            { key: 'LightIntensity', label: this.sensorLabel['LightIntensity'], value: Number(this.sensorValueStat.Light_Intensity__c).toFixed(2) + ' %', image: `${Sensor_Icons}/Sensor-Icons/Light.png` },
            { key: 'SoilElectricConductivity', label: this.sensorLabel['SoilElectricConductivity'], value: Number(this.sensorValueStat.Soil_Electric_Conductivity__c).toFixed(2) + ' u/cm', image: `${Sensor_Icons}/Sensor-Icons/Soil_EC.png` },
            { key: 'SoilMoisture', label: this.sensorLabel['SoilMoisture'], value: Number(this.sensorValueStat.Soil_Moisture_Percentage__c).toFixed(2) + ' %', image: `${Sensor_Icons}/Sensor-Icons/Soil_Moisture.png` },
            { key: 'SoilNitrogen', label: this.sensorLabel['SoilNitrogen'], value: Number(this.sensorValueStat.Soil_Nitrogen__c).toFixed(2) + ' mg/Kg', image: `${Sensor_Icons}/Sensor-Icons/Soil_N.png` },
            { key: 'SoilPhosphorus', label: this.sensorLabel['SoilPhosphorus'], value: Number(this.sensorValueStat.Soil_Phosphorus__c).toFixed(2) + ' mg/Kg', image: `${Sensor_Icons}/Sensor-Icons/Soil_P.jpeg` },
            { key: 'SoilTemperature', label: this.sensorLabel['SoilTemperature'], value: Number(this.sensorValueStat.Soil_Temperature__c).toFixed(2) + ' °C', image: `${Sensor_Icons}/Sensor-Icons/Soil_Temp.Png` },
            { key: 'SoilPotassium', label: this.sensorLabel['SoilPotassium'], value: Number(this.sensorValueStat.Soil_Potassium__c).toFixed(2) + ' mg/Kg', image: `${Sensor_Icons}/Sensor-Icons/Soil_K.png` },
            { key: 'SoilPh', label: this.sensorLabel['SoilPh'], value: Number(this.sensorValueStat.Soil_Ph__c).toFixed(2), image: `${Sensor_Icons}/Sensor-Icons/Soil_Ph.png` },
            { key: 'TransmitterBattery', label: this.sensorLabel['TransmitterBattery'], value: Number(this.sensorValueStat.Transmitter_Battery__c).toFixed(2) + ' V', image: `${Sensor_Icons}/Sensor-Icons/Battery_Volt.Png` }
        ]
    }

    sensorLabel = {
        'AtmosphereTemperature' : 'Atmosphere Temperature:',
        'AtmosphereHumidity': 'Atmosphere Humidity:',
        'RainPercentage':'Rain %:',
        'LightIntensity':'Light Intensity:',
        'SoilElectricConductivity':'Soil Electric Conductivity:',
        'SoilMoisture':'Soil Moisture %:',
        'SoilNitrogen':'Soil Nitrogen:',
        'SoilPhosphorus':'Soil Phosphorus:',
        'SoilTemperature':'Soil Temperature:',
        'SoilPotassium':'Soil Potassium:',
        'SoilPh':'Soil Ph:',
        'TransmitterBattery':'Transmitter Battery:'
    }


    handleOptionChange(event) {
        this.selectedOption = event.detail.value;
        // Add logic to update data based on selected option
    }
    handleNotificationSendEmail() {
        this.modalActive = true;
        this.modalHeader = 'Please enter your email address.';
    }
    handleNotificationSendSMS() {
        this.modalActive = true;
        this.modalHeader = 'Please enter your mobile number.';
    }
    handleListViewNavigation() {
        this[NavigationMixin.Navigate]({
            type: 'standard__objectPage',
            attributes: {
                objectApiName: 'EcoSync_Daily_Log__c',
                actionName: 'list'
            },
            state: {
                filterName: '00B5g00000wGqTjEAK'
            }
        });
    }
    closeModal() {
        this.modalActive = false;
        this.emailId = ''
        this.phoneNum = ''
    }
    submitModal() {
        this.isLoading = true;
        console.log(this.phoneField)
        console.log(this.emailField)
        sendSensorNotification({ isEmail: this.emailField, isPhone: this.phoneField, phoneNumber: this.phoneNum, email: this.emailId,localDateTime:this.localTime })
            .then(res => {
                this.modalActive = false;
                var notType = this.emailField ? 'email.':'phone.'
                const event = new ShowToastEvent({
                    title: 'Update Sent !',
                    message: 'Update has been sent to your ' + notType,
                    variant: 'success',
                    mode: 'dismissable'
                });
                this.dispatchEvent(event);
                this.emailId = ''
                this.phoneNum = ''
            }).catch(err=>{
                console.log(err)
            }).finally(fin=>{
                this.isLoading = false;
            })
    }
    handleInputChange(event) {
        console.log(event.target.name)
        const value = event.target.value;
        if (event.target.name == 'email') {
            this.validateEmailFormat(value);
        } else if (event.target.name == 'phone') {
            this.validatePhoneFormat(value);
        }

    }
    validateEmailFormat(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.errors.email = 'Please enter a valid email address';
        } else {
            this.emailId = email;
            delete this.errors.email;
        }
    }
    validatePhoneFormat(phone) {
        const phoneRegex = /^\+(\d{2})\d{10,}$/;
        if (!phoneRegex.test(phone)) {
            this.errors.phone = 'Please enter phone number in valid format starting with + followed by number. Eg: +919898767483';
        } else {
            this.phoneNum = phone;
            delete this.errors.phone;
        }
    }

    connectedCallback() {

        fetchLatestSensorData().then(res => {
            const utcDate = new Date(res.latestData.CreatedDate);
            const localDateString = utcDate.toLocaleString();
            this.localTime = localDateString;
            res.latestData.CreatedDate = localDateString
            console.log(res)
            this.allSensorData = res;
            this.sensorData = []
            this.sensorData.push(res.latestData)
        })

        const locationParm = this.getQueryParameters()
        if (locationParm['language']) {
            this.selectedLang = locationParm['language']
        } else {
            this.selectedLang = "en_US";
        }
        let label = ['ECOSYNC_Sensor_TransBatt', 'ECOSYNC_Sensor_Soil_Temperature', 'ECOSYNC_Sensor_Soil_Potassium',
            'ECOSYNC_Sensor_Soil_Phosphorus', 'ECOSYNC_Sensor_Soil_PH', 'ECOSYNC_Sensor_Soil_Nitrogen',
            'ECOSYNC_Sensor_Soil_Moisture', 'ECOSYNC_Sensor_Soil_EC', 'ECOSYNC_Sensor_SendMeSMS', 'ECOSYNC_Sensor_SendMeEmail',
            'ECOSYNC_Sensor_Rain', 'ECOSYNC_Sensor_LightIntensity', 'ECOSYNC_Sensor_LastUpdated', 'ECOSYNC_Sensor_GoToDetailPage',
            'ECOSYNC_Sensor_AtmTemp', 'ECOSYNC_Sensor_AtmHum', 'ECOSYNC_Sensor_30DaysAvg'
        ];
        getLabelInfo({ labels: label, lang: this.selectedLang }).then(res => {
            console.log(res)
            this.sensorLabel['AtmosphereTemperature'] = res['ECOSYNC_Sensor_AtmTemp']
            this.sensorLabel['AtmosphereHumidity'] = res['ECOSYNC_Sensor_AtmHum']
            this.sensorLabel['RainPercentage'] = res['ECOSYNC_Sensor_Rain']
            this.sensorLabel['LightIntensity'] = res['ECOSYNC_Sensor_LightIntensity']
            this.sensorLabel['SoilElectricConductivity'] = res['ECOSYNC_Sensor_Soil_EC']
            this.sensorLabel['SoilMoisture'] = res['ECOSYNC_Sensor_Soil_Moisture']
            this.sensorLabel['SoilNitrogen'] = res['ECOSYNC_Sensor_Soil_Nitrogen']
            this.sensorLabel['SoilPhosphorus'] = res['ECOSYNC_Sensor_Soil_Phosphorus']
            this.sensorLabel['SoilTemperature'] = res['ECOSYNC_Sensor_Soil_Temperature']
            this.sensorLabel['SoilPotassium'] = res['ECOSYNC_Sensor_Soil_Potassium']
            this.sensorLabel['SoilPh'] = res['ECOSYNC_Sensor_Soil_PH']
            this.sensorLabel['TransmitterBattery']= res['ECOSYNC_Sensor_TransBatt']

            this.options.forEach(eachitem => {
                if (eachitem.value == 'Last Updated Data') {
                    this.lastUpdated = res['ECOSYNC_Sensor_LastUpdated']
                    eachitem.label = res['ECOSYNC_Sensor_LastUpdated']
                } else if (eachitem.value == '30 Days Average Data') {
                    eachitem.label = res['ECOSYNC_Sensor_30DaysAvg']
                    this.monthAvg = res['ECOSYNC_Sensor_30DaysAvg']
                }
            })
            this.emailBttn = res['ECOSYNC_Sensor_SendMeEmail']
            this.smsBttn = res['ECOSYNC_Sensor_SendMeSMS']
            this.detailBttn = res['ECOSYNC_Sensor_GoToDetailPage']
        })
    };

    getQueryParameters() {
        var params = {};
        var search = location.search.substring(1);
        if (search) {
            params = JSON.parse('{"' + search.replace(/&/g, '","').replace(/=/g, '":"') + '"}', (key, value) => {
                return key === "" ? value : decodeURIComponent(value)
            });
        }
        return params;
    }

}