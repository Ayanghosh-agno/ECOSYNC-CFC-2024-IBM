import { LightningElement, track } from 'lwc';
import getLabelInfo from '@salesforce/apex/EcoSyncController.getLabelValue';
import FORM_FACTOR from '@salesforce/client/formFactor';

export default class EcoSyncGreetings extends LightningElement {
        @track greetingMessage = "Hello Farmer, Showing the summary of Device - CFC2024";
        @track selectedLang;
        @track eventInitialized = false

        get desktopView() {
                return FORM_FACTOR === "Large";
        }
        renderedCallback() {
                if (!this.eventInitialized && FORM_FACTOR == "Large") {
                        const ss = this.template.querySelector('video');
                        console.log(JSON.stringify(ss.style.display))
                        if (ss.paused) {
                                document.addEventListener('click', this.clickHandler, true);
                                this.eventInitialized = true;
                        }
                }
        }
        clickHandler = (event) => {
                const ss = this.template.querySelector('video');
                ss.play();
                document.removeEventListener('click', this.clickHandler, true);
        }

        labels = {};

        connectedCallback() {
                const locationParm = this.getQueryParameters()
                if (locationParm['language']) {
                        this.selectedLang = locationParm['language']
                } else {
                        this.selectedLang = "en_US";
                }
                let label = ['ECOSYNC_Greeting'];
                getLabelInfo({ labels: label, lang: this.selectedLang }).then(res => {
                        this.greetingMessage = res['ECOSYNC_Greeting'];
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