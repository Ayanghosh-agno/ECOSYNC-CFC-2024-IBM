import { LightningElement, track } from 'lwc';
import FORM_FACTOR from "@salesforce/client/formFactor";
import IBMTranslator from '@salesforce/apex/IBMTranslator.translateText';
import getLabelInfo from '@salesforce/apex/EcoSyncController.getLabelValue';
import getWatsonXAIRecommendation from '@salesforce/apex/IBMWatsonXAIRecommendation.makeWatsonCallout';
export default class EcoSync_WatsonXAI extends LightningElement {
    @track isSpinner = false
    @track selectedLang = ''
    @track heading = 'WATSON X AI RECOMMENDATION'
    //inputText = "\n\nBased on the soil and environmental conditions you've provided, here are some recommendations for best farming practices:\n\n**Soil Condition:**\n\n* Soil pH is slightly acidic (5.2), which is suitable for most crops. However, it's essential to maintain a balanced pH level to ensure optimal nutrient availability.\n* Soil phosphorus (12 mg/kg) and potassium (7 mg/kg) levels are relatively low, indicating a need for fertilization.\n* Soil nitrogen (2 mg/kg) is very low, indicating a severe deficiency.\n* Soil moisture (58%) is moderate, but it's essential to maintain optimal moisture levels for rice cultivation.\n* Soil EC (20 us/cm) is relatively high, which may indicate high salt levels. This could affect crop growth and yield.\n\n**Best Crop for this Land:**\n\nBased on the soil and environmental conditions, I would recommend growing rice (Oryza sativa) as it is well-suited for the climate and soil type. Rice is a popular crop in many parts of the world and can thrive in a variety of soil conditions.\n\n**Yield Per Hectare:**\n\nThe yield of rice per hectare depends on various factors such as soil fertility, water availability, climate, and farming practices. However, based on average yields in similar regions, you can expect a yield of around 4-5 tons per hectare.\n\n**Best Fertilizer:**\n\nBased on the soil test results, I would recommend applying a balanced fertilizer that provides nitrogen, phosphorus, and potassium (NPK) in the following proportions:\n\n* Nitrogen (N): 30-40 kg/ha (to address the severe nitrogen deficiency)\n* Phosphorus (P): 20-30 kg/ha (to address the low phosphorus levels)\n* Potassium (K): 20-30 kg/ha (to address the low potassium levels)\n\nYou can apply a fertilizer with the following composition:\n\n* Urea (46% N): 20-25 kg/ha\n* Diammonium phosphate (18-46-0): 10-15 kg/ha\n* Muriate of potash (0-0-60): 10-15 kg/ha\n\n**Additional Recommendations:**\n\n* Irrigation: Rice requires adequate water supply, especially during the germination and tillering stages. Ensure that the soil is consistently moist but not waterlogged.\n* Crop Management: Maintain a weed-free field to prevent competition for nutrients and water. Use crop rotation and intercropping to improve soil health and reduce pests and diseases.\n* Pest and Disease Management: Monitor the field regularly for pests and diseases, and apply integrated pest management (IPM) strategies to minimize the use of chemical pesticides and fungicides.\n* Soil Conservation: Implement conservation tillage or no-till farming to reduce soil erosion and improve soil structure.\n\nPlease note that these recommendations are general and may vary depending on specific local conditions and regulations. It's always a good idea to consult with local agricultural experts or conduct further soil testing to get more specific advice.";
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
            console.log(res)
            this.inputText = res.results[0].generated_text
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

    

}
