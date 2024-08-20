import { LightningElement } from 'lwc';

import WatsonXAssistant from '@salesforce/resourceUrl/WatsonXAssistant';
import { loadScript } from 'lightning/platformResourceLoader';
import EcoSync_Logo from "@salesforce/resourceUrl/SensorIcon";
export default class FooterEcosync extends LightningElement {
    logoUrl = `${EcoSync_Logo}/Sensor-Icons/Ecosync.png`;
    
    connectedCallback() {
        loadScript(this, WatsonXAssistant).then(() => { });
    }
}