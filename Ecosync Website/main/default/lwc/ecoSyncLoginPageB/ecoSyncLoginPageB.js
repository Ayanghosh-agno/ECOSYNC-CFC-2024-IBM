import { LightningElement } from 'lwc';
export default class EcoSyncLoginPageB extends LightningElement {
    renderedCallback() {
        const ss = this.template.querySelector('video');
        if (ss.paused) {
            document.addEventListener('click', this.clickHandler);
        }else{
            document.removeEventListener('click', this.clickHandler);
        }
    }
    
    clickHandler = (event) => {
        const ssVideo = this.template.querySelector('video');
        if (ss.paused) {
            ss.play()
        }else{
            document.removeEventListener('click', this.clickHandler);
        }
    }
}
