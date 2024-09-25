import { LightningElement, track } from 'lwc';
import getWatsonXAIPrediction from '@salesforce/apex/WatsonXAIService.performWatsonXCallout';
import IBMTranslator from '@salesforce/apex/IBMTranslator.translateText';
import getLabelInfo from '@salesforce/apex/EcoSyncController.getLabelValue';
import FORM_FACTOR from "@salesforce/client/formFactor";

export default class Ecosync_WatsonX_PlantDiseasePrediction extends LightningElement {


    @track isPredictClicked = false;
    @track imageUrl = '';
    @track description = '';
    @track isLoading = false;
    @track fileName = ''
    @track heading = 'WATSON X AI PLANT DISEASE ANALYZER'
    @track buttonText = 'Choose Image'
    @track imageChoosenText ='Plant Disease Prediction for image'
    @track selectedLang=''

    connectedCallback() {
        const locationParm = this.getQueryParameters()
        if (locationParm['language']) {
            this.selectedLang = locationParm['language'] == 'en_US' ? 'en' : locationParm['language'];
        } else {
            this.selectedLang = "en";
        }
        
        let label = ['ECOSYNC_WatsonXAiPlantDisease','ECOSYNC_ChooseImageButton','ECOSYNC_ChoosenImageName'];
        getLabelInfo({ labels: label, lang: this.selectedLang }).then(res => {
            this.heading = res['ECOSYNC_WatsonXAiPlantDisease'];
            this.buttonText = res['ECOSYNC_ChooseImageButton']
            this.imageChoosenText = res['ECOSYNC_ChoosenImageName']
        })
    }

    translateAi(){
        let cleanedStr = this.formattedText.replace(/<([^>]+)>/g, ' ');
        if (this.selectedLang != 'en') {
            IBMTranslator({ sourceText: cleanedStr, sourceLanguage: 'en', targetLanguage: this.selectedLang }).then(res => {
                this.description = res
            }).catch(err=>{
                console.log(err)
            })
        }
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

    handlePredictClick() {
        this.isPredictClicked = true;
    }

    handleFileChange(event) {
        const file = event.target.files[0];
        if (file) {
            this.isLoading = true;
            this.description = ''
            // FileReader to preview image
            const reader = new FileReader();
            reader.onload = () => {
                this.imageUrl = reader.result;

                // image processing from Watson X AI
                getWatsonXAIPrediction({imageURL:reader.result}).then(res=>{
                    console.log(res)
                    this.fileName = file.name;
                    if(res != null){
                        this.description = res.choices[0].message.content;
                        this.translateAi();
                    }
                }).catch(err=>{
                    console.log(err)
                }).finally(fn=>{
                    this.isLoading = false;
                })
                
            };
            reader.readAsDataURL(file);
        }
    }

    get desktopView() {
        return FORM_FACTOR === "Large";
    }
    get mobileView() {
        return FORM_FACTOR === "Small";
    }

    get formattedText() {
        if (!this.description) return '';

        // Split the input text into paragraphs
        const paragraphs = this.description.split('\n\n');

        // Format each paragraph with appropriate HTML tags
        const formattedParagraphs = paragraphs.map(paragraph => {
            // Split paragraph by newline to identify headings and content
            const lines = paragraph.split('\n');
            const headingLine = lines.find(line => line.startsWith('**')); // Find the line that contains the heading
            const remainingLines = lines.filter(line => !line.startsWith('**')).join('\n'); // All other lines

            // If a heading was found, format it
            let heading = '';
            if (headingLine) {
                heading = `<h3 style="font-size: 24px;margin-top: 15px;color: #0070d2;font-weight: bold;">${headingLine.replace(/\*\*/g, '')}</h3>`;
            }

            // Process remaining lines for bullet points
            const bulletPoints = remainingLines.split('\n').filter(line => line.startsWith('-'));
            if (bulletPoints.length > 0) {
                const formattedBulletPoints = bulletPoints.map(point => {
                    // Remove `**` markers and add bold formatting
                    const cleanPoint = point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    return `<li style="color: #000;font-size: 18px;margin-top: 5px;list-style-type: disc;font-weight: 300;">${cleanPoint.replace(/^\- /, '').trim()}</li>`;
                }).join('');
                return heading + `<ul>${formattedBulletPoints}</ul>`;
            } else {
                // Otherwise, it's a regular paragraph
                const cleanParagraph = remainingLines.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold formatting
                return heading + `<p style="color: #555;font-size: 18px;margin-top: 10px;line-height: 1.6;font-weight: 600;">${cleanParagraph}</p>`;
            }
        });

        // Join the formatted paragraphs into a single string
        return formattedParagraphs.join('');
    }

    get formattedTextMobile() {
        if (!this.description) return '';

        // Split the input text into paragraphs
        const paragraphs = this.description.split('\n\n');

        // Format each paragraph with appropriate HTML tags
        const formattedParagraphs = paragraphs.map(paragraph => {
            // Split paragraph by newline to identify headings and content
            const lines = paragraph.split('\n');
            const headingLine = lines.find(line => line.startsWith('**')); // Find the line that contains the heading
            const remainingLines = lines.filter(line => !line.startsWith('**')).join('\n'); // All other lines

            // If a heading was found, format it
            let heading = '';
            if (headingLine) {
                heading = `<h3 style="font-size: 20px;margin-top: 15px;color: #0070d2;font-weight: bold;">${headingLine.replace(/\*\*/g, '')}</h3>`;
            }

            // Process remaining lines for bullet points
            const bulletPoints = remainingLines.split('\n').filter(line => line.startsWith('-'));
            if (bulletPoints.length > 0) {
                const formattedBulletPoints = bulletPoints.map(point => {
                    // Remove `**` markers and add bold formatting
                    const cleanPoint = point.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
                    return `<li style="color: #000;font-size: 14px;margin-top: 5px;list-style-type: disc;font-weight: 300;">${cleanPoint.replace(/^\- /, '').trim()}</li>`;
                }).join('');
                return heading + `<ul>${formattedBulletPoints}</ul>`;
            } else {
                // Otherwise, it's a regular paragraph
                const cleanParagraph = remainingLines.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>'); // Bold formatting
                return heading + `<p style="color: #555;font-size: 14px;margin-top: 10px;line-height: 1.6;font-weight: 600;">${cleanParagraph}</p>`;
            }
        });

        // Join the formatted paragraphs into a single string
        return formattedParagraphs.join('');
    }



}