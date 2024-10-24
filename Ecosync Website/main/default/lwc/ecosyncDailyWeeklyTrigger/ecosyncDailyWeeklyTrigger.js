import { LightningElement,track } from 'lwc';
export default class EcosyncDailyWeeklyTrigger extends LightningElement {
@track isDaily = true; // Default to daily forecast
    @track isWeekly = false;
    error;

    get dailyButtonClass() {
        return this.isDaily ? 'active-button' : 'inactive-button';
    }

    get weeklyButtonClass() {
        return this.isWeekly ? 'active-button' : 'inactive-button';
    }

    showDailyForecast() {
        this.isDaily = true;
        this.isWeekly = false;
    }

    showWeeklyForecast() {
        this.isDaily = false;
        this.isWeekly = true;
    }

    connectedCallback() {
        this.getLocation();
    }
    getLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    this.error = null;
                },
                (error) => {
                    console.log(error)
                    this.error = error.message;
                }
            );
        } else {
            console.log('Geolocation is not supported by your browser.')
            this.error = 'Geolocation is not supported by your browser.';
        }
    }
}