import { LightningElement } from 'lwc';
import EcoSync_Logo from "@salesforce/resourceUrl/SensorIcon";

export default class EcoSyncGoToTop extends LightningElement {
    arrow = `${EcoSync_Logo}/Sensor-Icons/freeTopArrow.webp`;
    buttonClicked() {
        const event = new CustomEvent('goToTopButton', {
            detail: 'buttonClicked',
            bubbles: true, // Allows the event to bubble up through the DOM
            composed: true // Allows the event to cross the shadow DOM boundary
        });
        this.dispatchEvent(event);
    }
    connectedCallback() {
        window.addEventListener('enableTopButton', this.scrollHandler, true);
    }
    scrollHandler = (event) => {
        //console.log(event)
        if(event.detail == 'true'){
            const tmp = this.template.querySelector('.goToTopbtn');
            tmp.classList.add("show");
        }else{
            const tmp = this.template.querySelector('.goToTopbtn');
            tmp.classList.remove("show");
        }
    }
    disconnectedCallback() {
        window.removeEventListener('enableTopButton', this.scrollHandler, true);

    }
}