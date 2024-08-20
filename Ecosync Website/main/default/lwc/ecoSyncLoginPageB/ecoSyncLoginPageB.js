import { LightningElement } from 'lwc';
export default class EcoSyncLoginPageB extends LightningElement {
    renderedCallback() {
        const ss = this.template.querySelector('video');
        if (ss.paused) {
            console.log(ss)
            document.addEventListener('click', () => {
                ss.play()
            })

        }
    }
}