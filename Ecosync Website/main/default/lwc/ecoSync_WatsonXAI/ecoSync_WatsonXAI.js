import { LightningElement, track } from 'lwc';
import FORM_FACTOR from "@salesforce/client/formFactor";
import IBMTranslator from '@salesforce/apex/IBMTranslator.translateText';
import getLabelInfo from '@salesforce/apex/EcoSyncController.getLabelValue';
import getWatsonXAIRecommendation from '@salesforce/apex/IBMWatsonXAIRecommendation.makeWatsonCallout';
export default class EcoSync_WatsonXAI extends LightningElement {
    @track isSpinner = false
    @track selectedLang = ''
    @track heading = 'WATSON X AI RECOMMENDATION'
    @track inputText

    get formattedText() {
        if (!this.inputText) return '';
        // Split the input text into paragraphs
        const paragraphs = this.inputText.split('\n\n');
        if (paragraphs[0].includes('assistant')) {
            paragraphs.shift();
        }
        //console.log(JSON.stringify(paragraphs))
        // Format each paragraph with appropriate HTML tags
        const formattedParagraphs = paragraphs.map(paragraph => {
            if (paragraph.startsWith('**')) {
                // If it starts with '**', it's a heading
                return `<h3 style="font-size: 24px;margin-top: 15px;color: #0070d2;font-weight: bold;">${paragraph.replace(/\*\*/g, '')}</h3>`;
            } else if (paragraph.startsWith('*')) {
                // If it starts with '*', it's a bullet point
                const bulletPoints = paragraph.split('\n*');
                const formattedBulletPoints = bulletPoints.map(point => 
                    `<li style="color: #000;;font-size: 18px;margin-top: 5px;list-style-type: disc;font-weight: 300;">${point.replace(/^\*\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`
                    ).join('');
                return `<ul>${formattedBulletPoints}</ul>`;
            } else {
                // Otherwise, it's a regular paragraph
                return `<p style="color: #555;font-size: 18px;margin-top: 10px;line-height: 1.6;font-weight: 600;">${paragraph}</p>`;
            }
        });
        // Join the formatted paragraphs into a single string
        return formattedParagraphs.join('');
    }

    get formattedTextMobile() {
        if (!this.inputText) return '';
        // Split the input text into paragraphs
        const paragraphs = this.inputText.split('\n\n');
        if (paragraphs[0].includes('assistant')) {
            paragraphs.shift();
        }
        //console.log(JSON.stringify(paragraphs))
        // Format each paragraph with appropriate HTML tags
        const formattedParagraphs = paragraphs.map(paragraph => {
            if (paragraph.startsWith('**')) {
                // If it starts with '**', it's a heading
                return `<h3 style="font-size: 20px;margin-top: 15px;color: #0070d2;font-weight: bold;">${paragraph.replace(/\*\*/g, '')}</h3>`;
            } else if (paragraph.startsWith('*')) {
                // If it starts with '*', it's a bullet point
                const bulletPoints = paragraph.split('\n*');
                const formattedBulletPoints = bulletPoints.map(point => `<li style="color: #000;;font-size: 14px;margin-top: 5px;list-style-type: disc;font-weight: 300;">${point.replace(/^\*\s/, '').replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')}</li>`).join('');
                return `<ul>${formattedBulletPoints}</ul>`;
            } else {
                // Otherwise, it's a regular paragraph
                return `<p style="color: #555;font-size: 14px;margin-top: 10px;line-height: 1.6;font-weight: 600;">${paragraph}</p>`;
            }
        });
        // Join the formatted paragraphs into a single string
        return formattedParagraphs.join('');
    }
    get desktopView() {
        return FORM_FACTOR === "Large";
    }
    get mobileView() {
        return FORM_FACTOR === "Small";
    }
    connectedCallback() {
        const locationParm = this.getQueryParameters()
        if (locationParm['language']) {
            this.selectedLang = locationParm['language'] == 'en_US' ? 'en' : locationParm['language'];
        } else {
            this.selectedLang = "en";
        }
        
        //this.translateAi();

        let label = ['ECOSYNC_WatsonXAi'];
        getLabelInfo({ labels: label, lang: this.selectedLang }).then(res => {
            this.heading = res['ECOSYNC_WatsonXAi'];
        })

        this.isSpinner = true;
        getWatsonXAIRecommendation().then(res=>{
            console.log(res['generated_text'])
            this.inputText = res['generated_text']
            this.translateAi();
        }) .catch(err=>{
            console.log(err)
        })
        .finally(fin=>{
            this.isSpinner = false;
        })
    }

    translateAi(){
        let cleanedStr = this.formattedText.replace(/<([^>]+)>/g, ' ');
        if (this.selectedLang != 'en') {
            IBMTranslator({ sourceText: cleanedStr, sourceLanguage: 'en', targetLanguage: this.selectedLang }).then(res => {
                this.inputText = res
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
}
