import { LightningElement, track } from 'lwc';
export default class EcoSyncMapComponent extends LightningElement {
    @track mapMarkers = [
        {
            location: {
                Latitude: '23.2483126',
                Longitude: '87.8565773',
            },
            title: 'Call For Code 2024 - ECO SYNC - Device 1',
            description:
                'Summary of the Field :- <br><br> <b>Soil Phosphorus</b> 24 mg/Kg <br><br> <b>Soil Potassium </b> 24 mg/Kg <br><br> <b>Soil Nitrogen </b> 24 mg/Kg <br><br> <b>Soil EC </b> 22 u/cm <br><br> <b>Soil Ph </b> 6 <br><br> <b>Atmospheric Temperature </b> 24 C <br><br> <b>Atmospheric Humidity</b> 60%',
        }
    ];
    mapOptions = {
        draggable: true,
        disableDefaultUI: true,
        zoomControl: true,
    };

    connectedCallback() {
        this.fetchFireBaseData();
    }

    // Method to fetch latest data from Firebase
    fetchFireBaseData() {
        // Construct the API URL
        const apiUrl = `https://eco-sync-6b0ae-default-rtdb.firebaseio.com/SensorData.json?auth=AIzaSyDV0k_vxW8lrTlr7uMRjt2OWHuwEPTBJUs`;

        // Make the API request using the fetch function
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(JSON.stringify(this.mapMarkers))
                this.mapMarkers = [...this.mapMarkers,{
                    location: {
                Latitude: String(data.Latitude),
                Longitude: String(data.Longitude),
            },
            title: 'Call For Code 2024 - ECO SYNC - Device 2',
            description : 'Summary of the Field :- <br><br> <b>Soil Phosphorus</b> '+data.SoilP+' mg/Kg <br><br> <b>Soil Potassium </b> '+data.SoilK+' mg/Kg <br><br> <b>Soil Nitrogen </b> '+data.SoilN+' mg/Kg <br><br> <b>Soil EC </b> '+data.SoilEC+' u/cm <br><br> <b>Soil Ph </b> '+data.SoilPH+'<br><br> <b>Soil Moisture </b> '+data.SoilM+'<br><br> <b>Soil Temperature </b> '+data.SoilT+' C <br><br> <b>Atmospheric Temperature </b> '+data.OutterTemp+' C <br><br> <b>Atmospheric Humidity</b> '+data.OutterHum+'%',
            }]
                console.log(JSON.stringify(this.mapMarkers))
                console.log(data)
            })
            .catch((error) => {
                console.error('Error fetching Firebase data:', JSON.stringify(error));
                console.log(error.message)
            });
    }

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
