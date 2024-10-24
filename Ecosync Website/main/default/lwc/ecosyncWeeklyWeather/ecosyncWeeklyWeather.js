import { LightningElement, track } from 'lwc';
const API_KEY = 'a5dba76710624a0d9ba76710627a0d2c';
import WEATHER_ICON_SVG from "@salesforce/resourceUrl/EcosyncNewWeather";
import WEATHER_ICON_SVG1 from "@salesforce/resourceUrl/Ecosync";

export default class EcosyncWeeklyWeather extends LightningElement {
    @track isModalOpen = false;
    iconMaxTemp = `${WEATHER_ICON_SVG1}/Ecosynccons/weather-icons/thermometer-warmer.svg`
    iconMinTemp = `${WEATHER_ICON_SVG1}/Ecosynccons/weather-icons/thermometer-colder.svg`
    iconSunset = `${WEATHER_ICON_SVG1}/Ecosynccons/weather-icons/sunset.svg`
    iconSunrise = `${WEATHER_ICON_SVG1}/Ecosynccons/weather-icons/sunrise.svg`
    raindropImg = `${WEATHER_ICON_SVG1}/Ecosynccons/weather-icons/raindrop-measure.svg`

    @track selectedDay = {};
    @track weatherDataWeekly;
    latitude;
    longitude;
    error;
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
                    this.fetchWeatherDataWeekly();
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

    fetchWeatherDataWeekly() {
        const apiUrl = `https://api.weather.com/v3/wx/forecast/daily/15day?geocode=${this.latitude},${this.longitude}&format=json&units=m&language=en-US&apiKey=${API_KEY}`
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

                this.weatherDataWeekly = data.dayOfWeek.map((time, index) => {
                    return {
                        day: data.daypart[0].daypartName[index * 2] == 'Today' ? data.daypart[0].daypartName[index * 2] : data.daypart[0].daypartName[(index * 2) + 1] == 'Tonight' ? data.daypart[0].daypartName[(index * 2) + 1] : data.dayOfWeek[index],
                        dayName:this.formatDateWeather(data.validTimeLocal[index]),
                        dayTemp: data.daypart[0].temperature[index * 2], // Example with null value
                        nightTemp: data.daypart[0].temperature[(index * 2) + 1],
                        nightIcon: this.getWeatherIcon(data.daypart[0].iconCode[(index * 2) + 1]),
                        dayIcon: this.getWeatherIcon(data.daypart[0].iconCode[index * 2]),
                        dayPrecp: data.daypart[0].precipChance[index * 2],
                        nightPrecp: data.daypart[0].precipChance[(index * 2) + 1],
                        dayHumid: data.daypart[0].relativeHumidity[index * 2],
                        nightHumid: data.daypart[0].relativeHumidity[(index * 2) + 1],
                        maxTemp: data.temperatureMax[index],
                        minTemp: data.temperatureMin[index],
                        sunrise: this.handlelocaltime(data.sunriseTimeLocal[index]),
                        sunset: this.handlelocaltime(data.sunsetTimeLocal[index]),
                        daywindSpeed:data.daypart[0].windSpeed[index * 2],
                        nightwindSpeed:data.daypart[0].windSpeed[(index * 2) + 1],
                        daywindDirection:data.daypart[0].windDirectionCardinal[index * 2],
                        nightwindDirection:data.daypart[0].windDirectionCardinal[(index * 2) + 1],
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
    formatDateWeather(dateTimeString) {
        // Split the string by 'T' to isolate the date part
        let datePart = dateTimeString.split('T')[0];

        // Split the date part by '-' to get year, month, and day
        let [year, month, day] = datePart.split('-');

        // Convert month number to month name
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        let monthName = monthNames[parseInt(month) - 1];

        // Function to get the correct suffix for the day
        function getDaySuffix(day) {
            if (day >= 11 && day <= 13) {
                return 'th';
            }
            switch (day % 10) {
                case 1: return 'st';
                case 2: return 'nd';
                case 3: return 'rd';
                default: return 'th';
            }
        }

        // Convert day to integer and get suffix
        let dayInt = parseInt(day);
        let daySuffix = getDaySuffix(dayInt);

        // Return the formatted date
        return `${dayInt}${daySuffix} ${monthName}`;
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
        const container = this.template.querySelector('.weather-container')
        const scrollAmount = 240;
        container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    }
    scrollListnerFlag = false;
    renderedCallback() {
        if (!this.scrollListnerFlag && this.template.querySelector('.weather-container')) {
            this.template.querySelector('.weather-container').addEventListener('scroll', this.handleScroll.bind(this))
            this.scrollListnerFlag = true;
            this.template.querySelector('.right-button').style.display = 'block';
            this.template.querySelector('.left-button').style.display = 'none';
        }
    }
    handleScroll() {
        const container = this.template.querySelector('.weather-container');
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
        const container = this.template.querySelector('.weather-container');
        const scrollAmount = 240;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
}