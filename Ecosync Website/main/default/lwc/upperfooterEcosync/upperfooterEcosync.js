import { LightningElement,track } from 'lwc';
import getLabelInfo from '@salesforce/apex/EcoSyncController.getLabelValue';

export default class UpperfooterEcosync extends LightningElement {
    @track selectedLang;
    @track heading = 'What EcoSync Does'
    @track aboutUs = 'Eco-Sync is committed to promoting sustainable agriculture and ensuring equitable access to essential resources for all farmers. Powered by WatsonX AI technology, Eco-Sync provides real-time data and insights to optimize crop yields while conserving resources.'
    connectedCallback() {
        const locationParm = this.getQueryParameters()
        if (locationParm['language']) {
            this.selectedLang = locationParm['language']
        } else {
            this.selectedLang = "en_US";
        }
        let label = ['ECOSYNC_AboutUs','ECOSYNC_WhatWeDo'];
        getLabelInfo({ labels: label, lang: this.selectedLang }).then(res => {
            this.aboutUs = res['ECOSYNC_AboutUs'];
            this.heading = res['ECOSYNC_WhatWeDo'];
        })
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