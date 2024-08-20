import { LightningElement, track } from "lwc";
import WEATHER_ICON_SVG from "@salesforce/resourceUrl/Ecosync";
import getLabelInfo from '@salesforce/apex/EcoSyncController.getLabelValue';

const API_KEY = '7d4f95f1b7d59702e88c1c73a5f5be39'; // Replace with your OpenWeatherMap API key


const WEATHER_ICONS = {
    "01d": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/clear-day.svg`,
    "01n": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/clear-night.svg`,
    "02d": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/partly-cloudy-day.svg`,
    "02n": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/partly-cloudy-night.svg`,
    "03d": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/cloudy.svg`,
    "03n": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/cloudy.svg`,
    "04d": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/overcast-day.svg`,
    "04n": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/overcast-night.svg`,
    "09d": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/overcast-day-drizzle.svg`,
    "09n": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/overcast-night-drizzle.svg`,
    "10d": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/overcast-day-rain.svg`,
    "10n": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/overcast-night-rain.svg`,
    "11d": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/thunderstorms-day-extreme.svg`,
    "11n": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/thunderstorms-night-extreme.svg`,
    "13d": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/partly-cloudy-day-snow.svg`,
    "13n": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/partly-cloudy-night-snow.svg`,
    "50d": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/mist.svg`,
    "50n": `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/mist.svg`
};
export default class WeatherInfoUpdateEcosync extends LightningElement {
    // SVG Icons
    compass = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/compass.svg`;
    sunriseIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/sunrise.svg`;
    sunsetIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/sunset.svg`;
    cloudy = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/cloudy.svg`;
    rain = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/rain.svg`;

    @track weatherKey = {
        'UV': 'UV Index',
        'WindStatus': 'Wind Status',
        'SunRiseSet': 'Sunrise & Sunset',
        'Humidity': 'Humidity',
        'Visibility': 'Visibility',
        'DewPoint': 'Dew Point',
    }
    @track selectedLang;

    weatherIcon;
    currentTemp;
    dateTime;
    currentTime;
    dayName;
    cloudyPercentage;
    weatherDescription;
    cityName;

    uvi = 0;
    windStatus = 0;
    sunrise = "";
    sunset = "";
    humidity = 0;
    visibility = 0;
    wind_deg = 0;
    windDirection = "";
    dew_point = 0;
    @track latitude;
    @track longitude;
    @track error = null;
    @track isSpinner = false;
    // payload checker
    isUVIAvailable = false;
    isVisibilityAvailable = false;
    isWindDirectionAvailable = false;
    isSunsetSunriseAvailable = false;
    isDewPointAvailable = false;

    // miscellaneous
    uviIconsIndicator;
    uvRadiationLevel;
    visibilityLevel;
    visibilityAlertLevelIcon;
    humidityAlertLevelIcon;
    humidityLevel;
    dewPointLevel;
    dewPointAlertLevelIcon;

    connectedCallback() {
        this.isSpinner = true;
        const locationParm = this.getQueryParameters()
        if (locationParm['language']) {
            this.selectedLang = locationParm['language']
        } else {
            this.selectedLang = "en_US";
        }
        let label = ['ECOSYNC_Weather_DewPoint', 'ECOSYNC_Weather_Humidity', 'ECOSYNC_Weather_SunRiseSet',
            'ECOSYNC_Weather_UV', 'ECOSYNC_Weather_Visibility', 'ECOSYNC_Weather_WindStatus'
        ];
        getLabelInfo({ labels: label, lang: this.selectedLang }).then(res => {
            console.log(res);
            this.weatherKey['UV'] = res['ECOSYNC_Weather_UV'];
            this.weatherKey['WindStatus'] = res['ECOSYNC_Weather_WindStatus'];
            this.weatherKey['SunRiseSet'] = res['ECOSYNC_Weather_SunRiseSet'];
            this.weatherKey['Humidity'] = res['ECOSYNC_Weather_Humidity'];
            this.weatherKey['Visibility'] = res['ECOSYNC_Weather_Visibility'];
            this.weatherKey['DewPoint'] = res['ECOSYNC_Weather_DewPoint'];

        })
        this.getLocation();
    }

    getLocation() {
        // this.latitude = '23.3173592';
        // this.longitude = '87.8299112'
        // this.fetchWeatherData();
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log(position)
                    this.latitude = position.coords.latitude;
                    this.longitude = position.coords.longitude;
                    this.fetchWeatherData();
                    this.error = null;
                },
                (error) => {
                    console.log(error)
                    this.latitude = null;
                    this.longitude = null;
                    this.error = error.message;
                }
            );
        } else {
            console.log('Geolocation is not supported by your browser.')
            this.error = 'Geolocation is not supported by your browser.';
        }
    }

    // Method to fetch weather data from OpenWeatherMap API
    fetchWeatherData() {
        // Construct the API URL
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&appid=${API_KEY}&units=metric`;

        // Make the API request using the fetch function
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                this.cityName = data.name + ', ' + data.sys.country
                this.weatherIcon = JSON.parse(
                    JSON.stringify(WEATHER_ICONS[data.weather[0].icon])
                );
                this.dateTime = new Date(data.dt * 1000);

                this.dayName = this.dateTime.toLocaleString("en-us", {
                    weekday: "short",

                });
                this.currentTime = this.dateTime.toLocaleString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true
                });
                this.currentTemp = Math.round(data.main.temp)
                this.weatherDescription = this.capitalizeFirstLetters(data.weather[0].description);
                this.cloudyPercentage = data.clouds.all
                this.handleTodaysHighlightEvt(data)
                console.log(data)
            })
            .catch((error) => {
                console.error('Error fetching weather data:', JSON.stringify(error));
                console.log(error.message)
            });
    }
    capitalizeFirstLetters(str) {
        // Split the string into words
        let words = str.split(' ');
        // Capitalize the first letter of each word
        for (let i = 0; i < words.length; i++) {
            words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
        }
        // Join the words back together
        return words.join(' ');
    }

    handleChangeLocationEvt(payload) {
        if (payload == null) return;
        let locationIsChanged = payload.isChanged;
        if (locationIsChanged) {
            // Set main & secondary attribute to default value for refresh
            this.isUVIAvailable = false;
            this.uviIconsIndicator = "";
            this.windStatus = 0;
            this.windDirection = "";
            this.isSunsetSunriseAvailable = false;
            this.humidity = 0;
            this.humidityLevel = "";
            this.visibility = 0;
            this.visibilityLevel = "";
            this.dew_point = 0;
            this.dewPointLevel = "";
        }
    }

    handleTodaysHighlightEvt(payload) {
        // DEW POINT
        if (payload.dew) {
            this.setDewPointPanelAttributes(payload);

        } else {
            this.dewPointLevel = "Comfortable";
            this.dewPointAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-green.svg`;
            this.dew_point = 22.3
            this.isDewPointAvailable = true
        }
        // WIND STATUS
        this.windStatus = payload.wind.speed.toFixed(1);
        // UVI
        if (payload.uvi) {
            this.setUVIndexPanelAttributes(payload);

        } else {
            this.uvi == 0;
            this.uviIconsIndicator = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/uv-index.svg`
            this.isUVIAvailable = true
        }
        // HUMIDITY
        this.setHumidityPanelAttributes(payload);
        // VISIBILITY
        this.setVisibilityPanelAttributes(payload);
        // WIND DEGREE
        this.isWindDirectionAvailable = payload.wind.deg ? true : false;
        this.windDirection = this.getCardinalDirection(payload.wind.deg);
        // SUNSET & SUNRISE
        this.isSunsetSunriseAvailable =
            payload.sys.sunrise && payload.sys.sunrise ? true : false;
        // Convert sunrise and sunset epoch time to readable format
        let sunriseDT = new Date(payload.sys.sunrise * 1000);
        this.sunrise = sunriseDT.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
        });

        let sunsetDT = new Date(payload.sys.sunset * 1000);
        this.sunset = sunsetDT.toLocaleString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true
        });
    }

    setDewPointPanelAttributes(payload) {
        const VERY_DRY = 10,
            COMFORTABLE_MIN = 10,
            COMFORTABLE_MAX = 13,
            PLEASANT_MIN = 13,
            PLEASANT_MAX = 16,
            SLIGHTLY_HUMID_MIN = 16,
            SLIGHTLY_HUMID_MAX = 18,
            HUMID_MIN = 18,
            HUMID_MAX = 21,
            VERY_HUMID_MIN = 21,
            VERY_HUMID_MAX = 24,
            OPPRESSIVE = 24;
        this.isDewPointAvailable = payload.dew.point ? true : false;
        this.dew_point = payload.dew.point.toFixed(1);
        if (this.dew_point < VERY_DRY) {
            this.dewPointLevel = "Very Dry";
            this.dewPointAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-green.svg`;
        } else if (
            this.dew_point >= COMFORTABLE_MIN &&
            this.dew_point <= COMFORTABLE_MAX
        ) {
            this.dewPointLevel = "Comfortable";
            this.dewPointAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-green.svg`;
        } else if (
            this.dew_point >= PLEASANT_MIN &&
            this.dew_point <= PLEASANT_MAX
        ) {
            this.dewPointLevel = "Pleasant";
            this.dewPointAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-yellow.svg`;
        } else if (
            this.dew_point >= SLIGHTLY_HUMID_MIN &&
            this.dew_point <= SLIGHTLY_HUMID_MAX
        ) {
            this.dewPointLevel = "Slightly Humid";
            this.dewPointAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-yellow.svg`;
        } else if (this.dew_point >= HUMID_MIN && this.dew_point <= HUMID_MAX) {
            this.dewPointLevel = "Humid";
            this.dewPointAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-orange.svg`;
        } else if (
            this.dew_point >= VERY_HUMID_MIN &&
            this.dew_point <= VERY_HUMID_MAX
        ) {
            this.dewPointLevel = "Very Humid";
            this.dewPointAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-red.svg`;
        } else if (this.dew_point >= OPPRESSIVE) {
            this.dewPointLevel = "Oppressive";
            this.dewPointAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-red.svg`;
        }
    }

    setHumidityPanelAttributes(payload) {
        const CRITICAL_HIGH = 70,
            HIGH_MAX = 70,
            HIGH_MIN = 60,
            NORMAL_MAX = 60,
            NORMAL_MIN = 30,
            LOW_MAX = 30,
            LOW_MIN = 25,
            CRITICAL_LOW = 25;
        this.humidity = payload.main.humidity;
        if (this.humidity >= CRITICAL_HIGH) {
            this.humidityLevel = "Poor high humidity";
            this.humidityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-red.svg`;
        } else if (this.humidity >= HIGH_MIN && this.humidity < HIGH_MAX) {
            this.humidityLevel = "Fair";
            this.humidityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-orange.svg`;
        } else if (this.humidity >= NORMAL_MIN && this.humidity < NORMAL_MAX) {
            this.humidityLevel = "Maintain your health";
            this.humidityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-green.svg`;
        } else if (this.humidity >= LOW_MIN && this.humidity < LOW_MAX) {
            this.humidityLevel = "Fair";
            this.humidityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-orange.svg`;
        } else if (this.humidity < CRITICAL_LOW) {
            this.humidityLevel = "Poor low humidity";
            this.humidityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-red.svg`;
        }
    }

    setVisibilityPanelAttributes(payload) {
        const DENSE_FOG = 0.05,
            THICK_FOG_MIN = 0.05,
            THICK_FOG_MAX = 0.2,
            MODERATE_FOG_MIN = 0.2,
            MODERATE_FOG_MAX = 0.5,
            LIGHT_FOG_MIN = 0.5,
            LIGHT_FOG_MAX = 1,
            THIN_FOG_MIN = 1,
            THIN_FOG_MAX = 2,
            HAZE_MIN = 2,
            HAZE_MAX = 4,
            LIGHT_HAZE_MIN = 4,
            LIGHT_HAZE_MAX = 10,
            CLEAR = 10;
        this.isVisibilityAvailable = payload.visibility ? true : false;
        this.visibility = (payload.visibility / 1000).toFixed(1);
        if (this.visibility < DENSE_FOG) {
            // Code Red
            this.visibilityLevel = "Dense fog";
            this.visibilityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-red.svg`;
        } else if (
            this.visibility >= THICK_FOG_MIN &&
            this.visibility < THICK_FOG_MAX
        ) {
            this.visibilityLevel = "Thick fog";
            this.visibilityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-red.svg`;
        } else if (
            // Code Orange
            this.visibility >= MODERATE_FOG_MIN &&
            this.visibility < MODERATE_FOG_MAX
        ) {
            this.visibilityLevel = "Moderate Fog";
            this.visibilityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-orange.svg`;
        } else if (
            this.visibility >= LIGHT_FOG_MIN &&
            this.visibility < LIGHT_FOG_MAX
        ) {
            this.visibilityLevel = "Light Fog";
            this.visibilityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-orange.svg`;
        } else if (
            // Code Yellow
            this.visibility >= THIN_FOG_MIN &&
            this.visibility < THIN_FOG_MAX
        ) {
            this.visibilityLevel = "Thin Fog";
            this.visibilityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-yellow.svg`;
        } else if (this.visibility >= HAZE_MIN && this.visibility < HAZE_MAX) {
            this.visibilityLevel = "Haze";
            this.visibilityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-yellow.svg`;
        } else if (
            // Code Green
            this.visibility >= LIGHT_HAZE_MIN &&
            this.visibility < LIGHT_HAZE_MAX
        ) {
            this.visibilityLevel = "Light Haze";
            this.visibilityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-green.svg`;
        } else if (this.visibility >= CLEAR) {
            this.visibilityLevel = "Clear";
            this.visibilityAlertLevelIcon = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/code-green.svg`;
        }
    }

    setUVIndexPanelAttributes(payload) {
        const LOW_MIN = 0,
            LOW_MAX = 2,
            MODERATE_MIN = 3,
            MODERATE_MAX = 5,
            HIGH_MIN = 6,
            HIGH_MAX = 7,
            VERY_HIGH_MIN = 8,
            VERY_HIGH_MAX = 10,
            EXTREME_MIN = 11;

        this.isUVIAvailable = payload.uvi || payload.uvi === 0 ? true : false;
        this.uvi = Math.round(payload.uvi);

        if (this.uvi >= 0 && this.uvi <= 10) {
            this.uviIconsIndicator =
                this.uvi === 0
                    ? `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/uv-index.svg`
                    : (this.uviIconsIndicator = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/uv-index-${this.uvi}.svg`);
        } else {
            this.uviIconsIndicator = `${WEATHER_ICON_SVG}/Ecosynccons/weather-icons/uv-index-11.svg`;
        }

        // UV Radiation Scale Conditions
        if (this.uvi >= LOW_MIN && this.uvi <= LOW_MAX) {
            this.uvRadiationLevel = "Low";
        } else if (this.uvi >= MODERATE_MIN && this.uvi <= MODERATE_MAX) {
            this.uvRadiationLevel = "Moderate";
        } else if (this.uvi >= HIGH_MIN && this.uvi <= HIGH_MAX) {
            this.uvRadiationLevel = "High";
        } else if (this.uvi >= VERY_HIGH_MIN && this.uvi <= VERY_HIGH_MAX) {
            this.uvRadiationLevel = "Very High";
        } else if (this.uvi >= EXTREME_MIN) {
            this.uvRadiationLevel = "Extreme";
        }
    }

    getCardinalDirection(angle) {
        var val = Math.floor(angle / 22.5 + 0.5);
        var arr = [
            "N",
            "NNE",
            "NE",
            "ENE",
            "E",
            "ESE",
            "SE",
            "SSE",
            "S",
            "SSW",
            "SW",
            "WSW",
            "W",
            "WNW",
            "NW",
            "NNW"
        ];
        return arr[val % 16];
    }
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