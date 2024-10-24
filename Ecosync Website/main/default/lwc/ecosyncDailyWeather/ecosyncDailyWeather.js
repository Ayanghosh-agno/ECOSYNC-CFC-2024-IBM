import { LightningElement, track } from 'lwc';
const API_KEY = 'CALL_FOR_CODE_2024';
import WEATHER_ICON_SVG from "@salesforce/resourceUrl/EcosyncNewWeather";
import WEATHER_ICON_SVG1 from "@salesforce/resourceUrl/Ecosync";

export default class EcosyncDailyWeather extends LightningElement {
    @track weatherData;
    @track error;
    selectedWeather = []
    isDetailsOpen = false
    latitude;
    longitude;

    raindropImg = `${WEATHER_ICON_SVG1}/Ecosynccons/weather-icons/raindrop-measure.svg`

    connectedCallback() {
        this.getLocation();
    }

    getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    console.log('Position' + position)
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
    fetchWeatherData() {


        const apiUrl = `https://api.weather.com/v3/wx/forecast/hourly/1day/enterprise?geocode=${this.latitude},${this.longitude}&format=json&units=m&language=en-US&apiKey=${API_KEY}`;

        // Make the API request using the fetch function
        fetch(apiUrl)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                console.log(data)
                this.weatherData = data.validTimeLocal.map((time, index) => {
                    return {
                        validTimeLocal: this.handlelocaltime(time),
                        temperature: data.temperature[index],
                        humidity: data.relativeHumidity[index],
                        cloudCover: data.cloudCover[index],
                        precipitation: data.precipChance[index],
                        windSpeed: data.windSpeed[index],
                        id: index,
                        windDirection:data.windDirectionCardinal[index],
                        wxPhraseLong: data.wxPhraseLong[index],
                        icon: this.getWeatherIcon(data.iconCode[index]),
                    };
                });
            })
            .catch((error) => {
                console.error('Error fetching weather data:', JSON.stringify(error));
                console.log(error.message)
            });

    }
    getWeatherIcon(condition) {
        
        if (condition) {
            if (typeof condition === 'number' && condition >= 0 && condition <= 9) {
                return WEATHER_ICON_SVG + '/SVGs/' + '0' + condition + '.svg';
            } else if (typeof condition === 'number') {
                return WEATHER_ICON_SVG + '/SVGs/' + condition.toString() + '.svg';; // Return the number as a string if it's already two digits
            }
        } else {
            return WEATHER_ICON_SVG + '/SVGs/na.svg'; // Default icon for unknown conditions

        }

    }
    handlelocaltime(localTime) {
        //const localTime = '2024-10-22T23:30:00+0530';

        // Extract hours and minutes from the string
        const timePart = localTime.substring(11, 16); // Get '23:30'
        const [hourStr, minuteStr] = timePart.split(':'); // Split into hour and minute
        let hour = parseInt(hourStr, 10); // Convert hour to number
        const minute = minuteStr; // Keep minute as string

        // Determine AM or PM
        const ampm = hour >= 12 ? 'PM' : 'AM';

        // Convert hours from 24-hour format to 12-hour format
        hour = hour % 12 || 12; // Adjust for 12 AM/PM

        // Combine to create the time string
        return `${hour}:${minute} ${ampm}`;
    }
    scrollLeft() {
        const container = this.template.querySelector('.hourly-weather-container')
        const scrollAmount = 240; 
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
    scrollListnerFlag = false;
    renderedCallback(){
        if(!this.scrollListnerFlag && this.template.querySelector('.hourly-weather-container')){
            this.template.querySelector('.hourly-weather-container').addEventListener('scroll', this.handleScroll.bind(this))
            this.scrollListnerFlag = true;
            this.template.querySelector('.right-button').style.display = 'block';
            this.template.querySelector('.left-button').style.display = 'none';
        }
    }
    handleScroll(){
        const container = this.template.querySelector('.hourly-weather-container');
        const scrollLeft = container.scrollLeft;
        const scrollWidth = container.scrollWidth;
        const clientWidth = container.clientWidth;

        const leftButton = this.template.querySelector('.left-button');
        const rightButton = this.template.querySelector('.right-button');

        if (scrollLeft === 0) {
            leftButton.style.display = 'none'; // Hide left button
        } else {
            leftButton.style.display = 'block'; // Show left button
        }

        if (scrollLeft + clientWidth >= scrollWidth) {
            rightButton.style.display = 'none'; // Hide right button
        } else {
            rightButton.style.display = 'block'; // Show right button
        }
    }

    scrollRight() {
        const container = this.template.querySelector('.hourly-weather-container');
        const scrollAmount = 240; 
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}
