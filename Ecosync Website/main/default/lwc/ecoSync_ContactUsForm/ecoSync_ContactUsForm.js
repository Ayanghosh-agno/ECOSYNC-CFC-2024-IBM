import { LightningElement, track } from 'lwc';
import createCase from '@salesforce/apex/EcoSyncController.createCase'
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
export default class EcoSync_ContactUsForm extends LightningElement {
    @track isLoading = false;

    @track caseNumberDisplayScreen = false;
    @track caseNumber=''
    handleSubmit(event) {
        this.isLoading = true;
        const nameInput = this.template.querySelector('input[name="name"]');
        const emailInput = this.template.querySelector('input[name="email"]');
        const messageInput = this.template.querySelector('textarea[name="message"]');

        const name = nameInput.value;
        const email = emailInput.value;
        const message = messageInput.value;
        createCase({ name, email, message }).then(res => {
            this.caseNumberDisplayScreen = true;
            this.caseNumber = res;
            const event = new ShowToastEvent({
                title: 'New case has been created',
                message: 'Case has been created. Please check your email for further detials',
                variant: 'success',
                mode: 'dismissable'
            });
            this.dispatchEvent(event);

            nameInput.value = '';
            emailInput.value = '';
            messageInput.value = '';

        }).catch(err => {
            console.log(err)
        }).finally(fin => {
            this.isLoading = false;
        })
        console.log('Form Data:', { name, email, message });

    }

    handleBack(){
        this.caseNumberDisplayScreen = false;
    }
}