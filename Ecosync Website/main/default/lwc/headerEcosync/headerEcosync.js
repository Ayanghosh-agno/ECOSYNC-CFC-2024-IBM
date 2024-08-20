import { LightningElement, track } from 'lwc';
import EcoSync_Logo from "@salesforce/resourceUrl/SensorIcon";
import { NavigationMixin } from 'lightning/navigation';
import basePath from "@salesforce/community/basePath";
import activeLanguages from '@salesforce/site/activeLanguages';
import getLabelInfo from '@salesforce/apex/EcoSyncController.getLabelValue';

export default class HeaderEcosync extends NavigationMixin(LightningElement) {
    logoUrl = `${EcoSync_Logo}/Sensor-Icons/Ecosync.png`;
    @track languages = [];
    @track selectedLang = '';
    @track home='Home';
    @track contactUs='Contact Us';
    @track logOut='Log Out';
    @track projectTitle ='EcoSync';
    handleNavigation() {
        const destination = event.target.dataset.destination;
        switch (destination) {
            case 'Home':
                this[NavigationMixin.Navigate]({
                    type: 'standard__namedPage',
                    attributes: {
                        pageName: 'home'
                    }
                });
                break;
            case 'About':
                // Handle navigation for About
                break;
            case 'Contact':
                this[NavigationMixin.Navigate]({
                    type: 'comm__namedPage',
                    attributes: {
                        name: 'contact_us__c'
                    }
                });
                break;
            case 'LogOut':
                // Handle navigation for LogOut
                break;
            default:
                console.error('Unknown destination');
                break;
        }
    }
    get logoutLink() {
        const sitePrefix = basePath.replace("/", "");
        return `/CFC2024/secur/logout.jsp`;
    }
    connectedCallback() {
        const locationParm = this.getQueryParameters()
        if (locationParm['language']) {
            this.selectedLang = locationParm['language']
        } else {
            this.selectedLang = "en_US";
        }
        let label = ['ECOSYNC_Navigation_ContactUs','ECOSYNC_Navigation_Home','ECOSYNC_Navigation_LogOut','ECOSYNC'];
        getLabelInfo({ labels: label, lang: this.selectedLang }).then(res => {
            console.log(res)
            this.home = res['ECOSYNC_Navigation_Home'];
            this.contactUs = res['ECOSYNC_Navigation_ContactUs'];
            this.logOut = res['ECOSYNC_Navigation_LogOut'];
            this.projectTitle = res['ECOSYNC']
        })

        window.addEventListener('enableTopButton', this.scrollHandler, true);
        this.languages = activeLanguages.map(item => {
            return {
                value: item.code.replace('-', '_'),
                label: item.label,
                target: '?language=' + item.code.replace('-', '_'),
                type: item.actionType,
                selected: this.selectedLang == item.code.replace('-', '_')
            }
        });
    }
    scrollHandler = (event) => {
        //console.log(event)
        if (event.detail == 'true') {
            const tmp = this.template.querySelector('.eco-sync-header');
            tmp.classList.add("fixed-header");
        } else {
            const tmp = this.template.querySelector('.eco-sync-header');
            tmp.classList.remove("fixed-header");
        }
    }
    disconnectedCallback() {
        window.removeEventListener('enableTopButton', this.scrollHandler, true);

    }
    handleLanguageChange(event) {
        const selectedLanguage = event.target.value;

        let currentUrl = window.location.href;
        // Check if the URL already contains parameters
        if (currentUrl.includes('language=')) {
            // Replace the existing language parameter with "language=hi"
            currentUrl = currentUrl.replace(/language=[^&]+/, 'language=' + selectedLanguage);
        } else {
            // If no language parameter is found, append "language=hi" to the URL
            if (currentUrl.indexOf('?') !== -1) {
                // URL already contains parameters, append lang=hi with '&'
                currentUrl += '&language=' + selectedLanguage;
            } else {
                // URL doesn't contain parameters, append lang=hi with '?'
                currentUrl += '?language=' + selectedLanguage;
            }
        }
        // Update the window's location with the modified URL
        window.location.href = currentUrl;
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