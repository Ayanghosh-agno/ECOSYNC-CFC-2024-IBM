import { LightningElement, track } from 'lwc';
export default class EcoSyncMapComponent extends LightningElement {
    mapMarkers = [
        {
            location: {
                Latitude: '23.2483126',
                Longitude: '87.8565773',
            },
            title: 'Call For Code 2024 - ECO SYNC - Device 1',
            description:
                'Summary of the Field :- <br><br> <b>Soil Phosphorus</b> 24 mg/Kg <br><br> <b>Soil Potassium </b> 24 mg/Kg <br><br> <b>Soil Nitrogen </b> 24 mg/Kg <br><br> <b>Soil EC </b> 22 u/cm <br><br> <b>Soil Ph </b> 6 <br><br> <b>Atmospheric Temperature </b> 24 C <br><br> <b>Atmospheric Humidity</b> 60%',
        },
        {
            location: {
                Latitude: '23.3173592',
                Longitude: '87.8299112',
            },
            title: 'Call For Code 2024 - ECO SYNC - Device 2',
            description:
                'Summary of the Field :- <br><br> <b>Soil Phosphorus</b> 14 mg/Kg <br><br> <b>Soil Potassium </b> 9 mg/Kg <br><br> <b>Soil Nitrogen </b> 9 mg/Kg <br><br> <b>Soil EC </b> 3 u/cm <br><br> <b>Soil Ph </b> 5.9 <br><br> <b>Atmospheric Temperature </b> 26 C <br><br> <b>Atmospheric Humidity</b> 78%',
        },
    ];
    mapOptions = {
        draggable: true,
        disableDefaultUI: true,
        zoomControl: true,
    };

    /* Load address from Controller 
    @wire(fetchAccounts, {})
    wireAccount({ error, data }) {
        if (data) {
            data.forEach(dataItem => {
                this.mapMarkers = [...this.mapMarkers,
                {
                    location: {
                        City: dataItem.BillingCity,
                        Country: dataItem.BillingCountry,
                    },
                    icon: 'custom:custom26',
                    title: dataItem.Name,
                }
                ];
            });
            this.error = undefined;
        } else if (error) {
            this.error = error;
        }
    }*/
}