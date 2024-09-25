[![License](https://img.shields.io/badge/License-Apache2-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0) [![Community](https://img.shields.io/badge/Join-Community-blue)](https://developer.ibm.com/callforcode/solutions/projects/get-started/)
<h1 align="center"<a name="title"></a>ECOSYNC</h1>
<div align="center">
  
  >"EcoSync: Smart Farming, Sustainable Future"
>
</div>

<h1 align="center"</a></h1>

  - [Project Summary](#project-summary)
      - [The issue we are hoping to solve](#issue-we-are-solving)
      - [How our technology solution can help](#technology-solution)
      - [Our Idea](#our-idea)
  
  - [Technology Implementation](#technology-implementation)
      - [IBM watsonx product(s) used](#ibm-ai-services-used)
      - [Other IBM technology used](#other-ibm-technology-used)
      - [Solution Architecture](#solution-architecture)

  -  [Detailed Description](#detail-materials)
      -  [Ecosync Transmitter](#ecosync-transmitter)
      -  [Ecosync Receiver](#ecosync-receiver)
      -  [Ecosync Website](#ecosync-website)
          - [Realtime Firebase Data Layer](#ecosync-website-firebase)
          - [Weather & Field Sensors Update](#ecosync-website-WeatherFieldSensor)
          - [Field Sensors Alert Using SMS or Email](#ecosync-website-FieldSensorAlert)
          - [Personalised Recommendation using WatsonX AI & Interactive Maps](#ecosync-website-AI-Map)
          - [Historical Data & Graphical Representation](#ecosync-website-HistoricData)
          - [Contact Us/Case Creation](#ecosync-website-contactUs)
          - [Ecosync Bot & Live Agent](#ecosync-website-bot)
          - [Ecosync Login Page & Multilingual Capability](#ecosync-website-multilingual)
          - [Ecosync Device Compatibility](#ecosync-website-devices)

  - [Presentation materials](#presentation-materials)
      - [Solution Demo Video](#solution-demo-video)
      - [Project development roadmap](#project-development-roadmap)
     
  - [Additional Details](#additional-details)
      - [How to run the project](#run-the-project)
      - [Live Demo](#Live-Demo)
            
  - [About](#about)
      - [Authors](#Authors)
      - [License](#license)
      - [Acknowledgments](#acknowledgments)
   
<h2 align="center"> Project Summary <a name="project-summary"></a> </h2>
  
### The Issue we are hoping to solve <a name="issue-we-are-solving"></a>

Agriculture is a critical industry, supporting the livelihoods of billions and ensuring global food security. However, farmers face numerous challenges, such as unpredictable weather patterns, soil nutrient deficiencies, and inefficient water usage. According to the Food and Agriculture Organization (FAO), approximately 33% of the world's soil is moderately to highly degraded due to erosion, salinization, acidification, and chemical pollution. Additionally, the UN estimates that by 2050, the global population will reach 9.7 billion, intensifying the demand for food production.

#### Data Facts:

- <strong> Soil Degradation: </strong> 33% of soil is moderately to highly degraded [Watch Here For Details](https://www.fao.org/fileadmin/user_upload/newsroom/docs/FAO-world-soils-report-SUMMARY.pdf)

- <strong> Water Scarcity:</strong> Agriculture accounts for 70% of global freshwater withdrawals, and inefficient irrigation systems lead to significant wastage [Watch Here For Details](https://blogs.worldbank.org/en/opendata/chart-globally-70-freshwater-used-agriculture).
  
- <strong> Climate Change:</strong> Unpredictable weather patterns adversely affect crop yields. The Intergovernmental Panel on Climate Change [Watch Here For Details](https://www.ipcc.ch/srccl/chapter/chapter-5/) projects a decrease in crop production by up to 2% per decade, while demand is expected to increase by 14% per decade.

These issues underscore the need for a comprehensive, technology-driven solution to optimize farming practices, improve soil health, and ensure efficient resource utilization.

### How our technology solution can help <a name="technology-solution"></a>

EcoSync addresses critical agricultural challenges with integrated hardware and software solutions in the following ways :-

- <strong> Soil degradation</strong> impacts 33% of the world's soil, reducing productivity. Our transmitter measures soil NPK levels, pH, and EC, providing real-time data to help farmers apply the right fertilizers and restore soil fertility.

- <strong> Water scarcity</strong> is a major issue, with agriculture accounting for 70% of global freshwater withdrawals. EcoSync’s sensors monitor soil moisture, humidity, and rainfall, optimizing irrigation to reduce water waste.

- <strong> Climate change</strong> leads to unpredictable weather, affecting crop yields. EcoSync provides real-time weather data and AI-driven recommendations, helping farmers make informed decisions about planting and harvesting.

- Farmers often lack <strong> precise information </strong>, leading to inefficient resource use. Our comprehensive data collection and AI recommendations enable precise resource management, improving yields and reducing costs.

- Many farmers lack access to <strong> real-time data and timely support </strong>. EcoSync’s receiver displays real-time data and transmits it to the cloud every 15 seconds. The website provides instant access to this data.

- <strong> Access to expert advice</strong> can be limited. EcoSync utilizes Watson X AI to provide personalized recommendations on fertilizers and crop selection, tailored to each farm's unique conditions. Additionally, EcoSync incorporates a Plant Disease prediction feature using WatsonX AI, enabling farmers to upload plant photos and receive detailed insights on disease type, life cycle, causes, and remedies. EcoSync also includes a WatsonX Assistant-powered chatbot for quick resolutions or connection to a live agent for personalized support.

- <strong> Language barriers</strong> can limit access to information. EcoSync’s website, integrated with Watson Language Translator, supports eight languages, ensuring inclusivity and widespread adoption.

- Additionally, every device’s GPS data is stored and displayed on a map within the website. This feature allows users to see the precise location of each device and view field and environmental conditions on an interactive map, enhancing their ability to <strong> monitor and manage their farms effectively </strong>.

By addressing these issues with innovative solutions, EcoSync empowers farmers to enhance productivity, sustainability, and efficiency, ensuring a resilient and prosperous future for agriculture.

### Our Idea : Sustainable Farming with ECOSYNC <a name="our-idea"></a>

EcoSync aims to revolutionize farming by combining cutting-edge hardware with intelligent software solutions. Here's a detailed breakdown of its functions and functionalities:

**1. Transmitter Device:**
  
  - **Advanced Sensors:** Capture comprehensive environmental data (atmospheric temperature, humidity, rain %, sunlight %, GPS location) and detailed soil metrics (N, P, K levels, EC, pH, temperature, moisture) for precision farming.

  - **Power Supply:** Operates on a 4x4100mAh Li-ion battery charged by 6x5V solar panels, ensuring up to 9 days of operation without sunlight.

  - **Data Transmission:** Uses LORA technology to transmit data over a 5 KM range.


**2. Receiver Device:**
  
  - **Display:** Shows real-time data received from the transmitter.
  
  - **Cloud Integration:** Uses a GSM module to send data to the cloud at 15-second intervals.

**3. Website:** (Salesforce Experience Cloud + Service Cloud)

  - **Dashboard:** Provides an overview of land details, weather conditions, and sensor data.
  
  - **Historical Data:** Allows users to view and download historical data, facilitating trend analysis and informed decision-making.

  - **Graphical Representation:** Visualizes data trends for easy interpretation.

  - **Field Mapping:** Displays field and environmental conditions on a map using GPS data from the transmitter.

  - **Notifications:** Sends real-time sensor data via email or SMS.

  - **Support:** Users can lodge cases and access a WatsonX Assistant powered chatbot for quick queries or live agent support for more complex issues.

  - **AI Integration:** Watson X AI, integrated with AI guardrails, provides personalized recommendations on farming practices, including fertilizer application and crop selection. It also incorporates a Plant Disease Prediction feature, using WatsonX.AI incorporated with **llama3-llava-next-8b-hf** model, to display disease type, cause, life cycle, and remedies based on plant photos uploaded by farmers.

  - **Language Support:** The website supports eight languages through Watson Language Translator.

EcoSync leverages technology to empower farmers with the information they need to enhance productivity, sustainability, and efficiency in their farming practices. By providing real-time data and AI-driven insights, EcoSync addresses the critical challenges facing modern agriculture, ensuring a more resilient and prosperous future for farmers worldwide.

<h2 align="center"> Technology Implementation <a name="technology-implementation"></a> </h2>


### IBM watsonx product(s) used <a name="ibm-ai-services-used">

**Featured watsonx products**

- [watsonx.ai](https://www.ibm.com/products/watsonx-ai) - Watson X AI, powered by the **'meta-llama/llama-3-8b-instruct'** model and integrated with **AI guardrails**, delivers personalized farming recommendations in EcoSync. By analyzing real-time sensor data on soil health, weather, and environmental factors, it provides actionable insights such as optimal fertilizer use and crop selection. These recommendations are tailored to each farm’s specific needs, enhancing both productivity and sustainability while ensuring safe and responsible AI use. Additionally, EcoSync includes a Plant Disease Prediction feature, leveraging the **'llama3-llava-next-8b-hf'** model to identify disease type, cause, life cycle, and remedies based on plant photos uploaded by the farmer. [Watch Here For Details](#ecosync-website-AI-Map)  

- [watsonx Assistant](https://cloud.ibm.com/catalog/services/watsonx-assistant) - WatsonX Assistant is employed to handle initial user interactions and answer common queries through a chatbot. It efficiently addresses routine questions and issues, providing instant assistance to users. For more complex inquiries, WatsonX Assistant facilitates seamless transitions to live agents, ensuring that users receive timely and relevant support throughout their experience with EcoSync. [Watch Here For Details](#ecosync-website-bot)  

### Other IBM technology used <a name="other-ibm-technology-used"></a>

**Additional IBM AI services**

- [Language Translator](https://cloud.ibm.com/catalog/services/language-translator) - Watson Language Translator is integrated to make the website multilingual. This feature ensures that users from diverse linguistic backgrounds can access and understand the platform's information and recommendations. By supporting eight languages, Watson Language Translator enhances inclusivity and broadens the reach of EcoSync, making it accessible to a global audience. [Watch Here For Details](#ecosync-website-multilingual)  

### Solution Architecture <a name="solution-architecture"></a>

![Solution Architecture](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Ecosync%20Architecture.png)


**1. EcoSync Transmitter**
   
The EcoSync Transmitter is equipped with a variety of sensors that monitor key environmental factors such as atmospheric temperature, humidity, rain percentage, sunlight percentage, and GPS location. Additionally, it measures crucial soil parameters including NPK levels, EC (Electrical Conductivity), pH, temperature, and moisture. The transmitter is powered by solar panels with a backup Li-ion battery, ensuring continuous operation. It uses LORA technology to transmit the collected data to the EcoSync Receiver, with a range of up to 5 kilometers.

**3. EcoSync Receiver**
   
The EcoSync Receiver collects data from the Transmitter and displays it on its built-in screen for immediate access by the user. The device also has a GSM module that transfers the collected data to the cloud, allowing for remote monitoring and analysis. Users can access real-time field parameters directly through the receiver's interface, providing a hands-on approach to field management.

**4. Cloud Management**
   
EcoSync utilizes Firebase as its real-time database to store and manage the data transmitted from the Receiver. This system provides instant access to the environmental and soil metrics for further analysis. Additionally, a scheduled Apex job in Salesforce fetches the data from Firebase and synchronizes it with Salesforce for internal processing and storage.

**5. Ecosync Salesforce Ecosystem**
   
EcoSync's Salesforce ecosystem is powered by Service Cloud and Experience Cloud. Service Cloud manages customer support with a robust setup that includes chat agent configuration, queues, custom labels, and objects for data storage. Live agents are further supported by a Visualforce component, enabling them to access previous chat contexts, whether from the chatbot or earlier interactions. Experience Cloud drives the EcoSync website, where data is visually represented using Lightning Web Components (LWC), and backend processes are efficiently handled through APEX. This integration allows users to monitor farm conditions, receive AI-driven recommendations, and access multilingual support, all within a unified platform.

**6. IBM Cloud, Weather API & NEXMO API Integrations**

The system is enhanced with several integrations along with IBM Cloud, including Nexmo SMS API for sending critical alerts to farmers, OpenWeather API for integrating real-time weather data all backed and integrated into Salesforce Experience Cloud (Ecosync Website). 


<h2 align="center"> Detailed Description <a name="detail-materials"></a> </h2>

### Ecosync Transmitter <a name="ecosync-transmitter"></a>

<img src="https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Hardware/Assets/Transmitter.png">


-  Pointer to Code :-

    -  [Ecosync Transmitter](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Hardware/Ecosync%20Transmitter) - Microcontroller code to collect all sensor data and send it to over LORA.
    -  [3D printed Part](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Hardware/Ecosync%20Hardware%203D%20Printed%20Parts) - Here is the 3-D printed design that has been used in order to make the body of the device.


 ### Ecosync Receiver <a name="ecosync-receiver"></a>

<img src="https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Hardware/Assets/Receiver.png">


-  Pointer to Code :-

    -  [Ecosync Receiver](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Hardware/Ecosync%20Receiver) - Microcontroller code to receive data from LORA and send it to Salesforce over cloud using GSM module.
    -  [Ecosync Display](https://github.com/Ayanghosh-agno/) - Here is the code to NEXTION Display to communicate with the microcontroller.
    -  [3D printed Part](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Hardware/Ecosync%20Hardware%203D%20Printed%20Parts) - Here is the 3-D printed design that has been used in order to make the body of the device.
 
### Ecosync Website <a name="ecosync-website"></a>

  - #### Realtime Firebase Data Layer <a name="ecosync-website-firebase"></a>
  
  <img src="https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Firebase_RealtimeDB.png">
  
  -  Pointer to Code :-

      -  [Ecosync Receiver](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Hardware/Ecosync%20Receiver) - Microcontroller code to push the datalayer received from Ecosync transmitter into FIREBASE using GSM Module.
      -  [Schedule24HourSensorLog.cls](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/classes/Schedule24HourSensorLog.cls) - Schedule Apex class that is used to fetch the data from Firebase on every 1 hour. 
      -  [FirebaseCallout.cls](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/classes/FirebaseCallout.cls) - APEX API callout class that makes the API call out in order to get the latest sensor data from the realtime DB.       
      -  [EcoSyncDailySchedule.cls](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/classes/EcoSyncDailySchedule.cls) - Schedule APEX class to store the each day average data in the Salesforce Object at the end of the day.
                
   
  - #### Weather & Field Sensors Update <a name="ecosync-website-WeatherFieldSensor"></a>

    <img src="https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Ecosync_Weather_Field_Sensor.png">
  
  -  Pointer to Code :-
    
      -  [EcoSyncController.cls](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/classes/EcoSyncController.cls) - Apex class to fetch the latest and 30days average sensor data from Salesforce Object.
      -  [weatherInfoUpdateEcosync](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/lwc/weatherInfoUpdateEcosync) - LWC to show the current weather depending upon the geo-location & doing a client side API call to openWeather API.
      -  [ecoSyncSensorsData](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/lwc/ecoSyncSensorsData) - LWC to show the sensor details section, Notification buttons & Detail page button.
   
  -  #### Field Sensors Alert Using SMS or Email <a name="ecosync-website-FieldSensorAlert"></a>

  <img src="https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Ecosync%20Sensor%20Updates.png">
  
  -  Pointer to Code :-

      -  [EcoSyncController.cls](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/classes/EcoSyncController.cls) - Apex class to fetch the desired sensor data and send it to either mobile or email provided by user.
      -  [ECOSYNC_DataReport.email](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/email/unfiled%24public) - Custom Email Template used to send email with sensors data to the user.
      -  [ecoSyncSensorsData](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/lwc/ecoSyncSensorsData) - LWC to receive the user email id / mobile number using a modal popup on click of the action buttons.
   
  -  #### Personalised Recommendation, Plant Disease Analysis using WatsonX AI & Interactive Maps <a name="ecosync-website-AI-Map"></a>

  <img src="https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Ecosync%20AI%20%26%20Interactive%20Map.png">

  -  Pointer to Code :-

      -  [ecoSync_WatsonXAI](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/lwc/ecoSync_WatsonXAI) - LWC where the WatsonX.ai recommendations are shown and formated.
      -  [IBMWatsonXAIRecommendation.cls](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/classes/IBMWatsonXAIRecommendation.cls) - Apex class to make callout to WatsonX.ai for personalized reccomendations depending upon the latest sensors value & field conditions.
      -  [ecosync_WatsonX_PlantDiseasePrediction](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/lwc/ecosync_WatsonX_PlantDiseasePrediction) - LWC where the image of the plant uploaded by the farmer is sent to the APEX class and the response from the WatsonX AI is processed and formated to display to the farmer.
      -  [WatsonXAIService.cls](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/classes/WatsonXAIService.cls) - APEX class to make the callout to WatsonX AI for plant disease prediction from the image uplaoded by the farmer.
      -   [IBMIdentityAuthToken](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/classes/IBMIdentityAuthToken.cls) - APEX class to get the IBM Cloud authorization token.
      -  [ecoSyncMapComponent](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/lwc/ecoSyncMapComponent) - LWC where the map pointers with field parameters are shown.
   
  -  #### Historical Data & Graphical Representation <a name="ecosync-website-HistoricData"></a>

  <img src="https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Historical%20data.png">

  -  Pointer to Code :-

      -  [ecoSync_AvgChart](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/lwc/ecoSync_AvgChart) - LWC to display the graphical representation of historical data and customised selection of sensor parameters that needs to be displayed
        
   
  -  #### Contact Us/Case Creation <a name="ecosync-website-contactUs"></a>

  <img src="https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Ecosync%20Contact%20Us.png">
  
  -  Pointer to Code :-

      -  [ecoSync_ContactUsForm](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/lwc/ecoSync_ContactUsForm) - LWC to take input from the user and show then Case Number after succesfully creating the Case.
      -  [EcoSyncController.cls](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/classes/EcoSyncController.cls) - APEX class to insert the case in Case Object and send email to the user.
      -  [ECOSYNC_CaseCreationTemplate.email](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/email/unfiled%24public/ECOSYNC_CaseCreationTemplate.email)  - Email template for case creation email.


  -  #### Ecosync Bot & Live Agent <a name="ecosync-website-bot"></a>

  <img src="https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Ecosync%20Bot.png">
  
  -  Pointer to Code :-

      -  [Eco_Sync_Support.liveChatAgentConfig-meta.xml](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/liveChatAgentConfigs) - Chat Agent configuration Metadata file for salesforce.
      -  [ECO_SYNC_QUEUE.liveChatButton-meta.xml](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/liveChatButtons) - Chat Button configuration metadata file for salesforce.
      -  [live_agent_setup_flow.liveChatDeployment-meta.xml](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/liveChatDeployments) - Chat Deployment metadata file for salesforce.
      -  [EcoSyncLiveAgent.page](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/pages) - Visualforce page in order to show Chat Agent the context of the chat or history of the chat.
      -  [WatsonXAssistant.js](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/staticresources/WatsonXAssistant.js) - The JS file to load WatsonX Assistant in our Ecosync Website.
      -  [footerEcosync](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/tree/main/Ecosync%20Website/main/default/lwc/footerEcosync) - LWC from where the WatsonX Assistant JS file is initialized into Ecosync Website.
      -  [ecosync-bot-action-v4.json](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/staticresources/ecosync-bot-action-v4.json) - WatsonX Assistant Action file for Ecosync Bot from IBM Cloud.

  -  #### Ecosync Login Page & Multilingual Capability <a name="ecosync-website-multilingual"></a>

  <img src="https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Ecosync%20Multilingual%20capability.png">
  
  -  Pointer to Code :-

      -  [IBMTranslator.cls](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/main/default/classes/IBMTranslator.cls) - Apex class from where all the language translation is done thorugh API callout of Watson Language Translator.

  -  #### Ecosync Device Compatibility <a name="ecosync-website-devices"></a>

  <img src="https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Ecosync%20Device%20Compatibility.png">
  

<h2 align="center"> Presentation materials <a name="presentation-materials"></a> </h2>

### Solution Demo Video <a name="solution-demo-video"></a>

[![Solution Demo Video](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Ecosync%20Thumbnail.png)]()


### Project Development Roadmap <a name="project-development-roadmap"></a>


Currently ECOSYNC offers the following features :-

  - **Real-Time Environmental Monitoring**: Collects and displays data on atmospheric temperature, humidity, rain percentage, sunlight percentage, and GPS location.
  - **Soil Condition Analysis**: Monitors and provides detailed metrics on soil NPK levels, electrical conductivity (EC), pH, temperature, and moisture.
  - **Interactive Mapping**: Displays land details on an interactive map with clickable pointers that reveal detailed field data.
  - **Solar-Powered Transmitter**: Utilizes solar panels to charge the Li-ion battery, ensuring continuous operation of the transmitter device.
  - **LORA Communication**: Enables data transmission from the transmitter to the receiver over a range of up to 5 kilometers.
  - **GSM-Based Cloud Data Sync**: Transfers collected data to the cloud every 15 seconds for remote access and storage using a GSM module.
  - **AI-Driven Farming Recommendations**: Provides personalized recommendations on fertilizers and crop selection using Watson X AI, tailored to each farm’s conditions.
  - **Plant Health Prediction** : EcoSync offers plant health analysis using WatsonX AI leveraging the 'llama3-llava-next-8b-hf' model to identify disease type, cause, life cycle, and remedies based on image data.
  - **Multilingual Support**: Powered by Watson Language Translator, the platform supports eight languages, making it accessible to a global audience.
  - **Chatbot and Live Agent Support**: Includes a Watson Assistant-powered chatbot for quick resolutions and seamless transition to live agents via Visualforce pages for real-time assistance. All chat interactions, transcripts, and user information are stored in Service Cloud objects.
  - **Comprehensive Data Visualization**: Visualizes real-time and historical farm data on the EcoSync website using graphical or tabular foramt.
  - **Weather Integration**: Integrates real-time weather data via the OpenWeather API to provide current and forecasted weather conditions.
  - **Case Management**: Enables users to lodge support cases directly through the EcoSync website for any issues or assistance.
  - **SMS or Email Notifications**: Sends SMS or email notifications to users with the latest data updates, ensuring they stay informed about their farm's current conditions.
  - **Offline Operation**:The EcoSync transmitter and receiver can operate independently of network or Wi-Fi connectivity, ensuring uninterrupted functionality in remote areas.


In future I am planning to enhance/upgrade ECOSYNC in the following way :- 

  - **SOS System**: Add a voice-enabled SOS system on the EcoSync Receiver, allowing farmers to directly call customer service using the device’s built-in GSM module.
  - **Alert System**: Implement an alert system that notifies farmers when specific environmental or soil parameters reach critical thresholds.
  - **Enhanced User Interface**: Upgrade the EcoSync website and app interface to improve user experience and provide more intuitive navigation and data interaction.
  - **In-Depth Soil Health Analysis**: Expand soil analysis capabilities to include more detailed health indicators and offer tailored recommendations for soil treatment and improvement.
  - **E-Commerce Integration**: Analyze collected data and recommend relevant agricultural products directly through the EcoSync website's e-commerce platform, enabling farmers to make informed purchasing decisions based on their farm's specific needs.
  
 
![Roadmap](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Ecosync%20Roadmap.png)

<h2 align="center"> Additional Details <a name="additional-details"></a> </h2>

### How to run the project <a name="run-the-project"></a>

Step 1: Cloning of the repository :

Our first goal is to set up a developer project which we'll use to modify our application. It starts by cloning the repository. Use the command git clone 

    https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/    
    
to clone the repository. Then, open the directory.

    cd Ecosync-Website-Salesforce
    
Step 2: Deploying using CLI tools (ex-VS Code) :

Authorize to your Developer Hub (Dev Hub) org.

    sfdx force:auth:web:login -d -a "Ecosync"

If you already have an authorized Dev Hub, set it as the default:

    sfdx force:config:set defaultdevhubusername=<username|alias>

Create a scratch org.

    sfdx force:org:create -s -f config/project-scratch-def.json

If you want to use an existing scratch org, set it as the default:

    sfdx force:config:set defaultusername=<username|alias>

Push your source.

    sfdx force:source:push

Open the scratch org.

    sfdx force:org:open -u Ecosync

4. Configure a Experience Cloud site and place the components as needed pushed into the org.

6. Ensure all security settings and permissions are given for logged in as well as guest users of experience cloud in Salesforce Side.

Note: If you want to learn more about SFDX and CLI command, Click [Here](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Ecosync%20Website/README.md)

### Live Demo <a name="Live-Demo"></a>

We can see live working of Ecosync Website - [Here](https://agno-dev-ed.develop.my.site.com/CFC2024/s/)

  - **For convinience of judging the site has been kept as public accessible.**

<h2 align="center"> About <a name="about"></a> </h2>

### Author<a name="Authors"></a>

<img src="https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Ayan%20Ghosh.png" style="max-width: 70px;">

   **Ayan Ghosh**

### License<a name="license"></a>
This project is licensed under the Apache 2 License - see the [LICENSE](LICENSE) file for details.

### Acknowledgments<a name="acknowledgments"></a>

- Based on [Billie Thompson's README template](https://gist.github.com/PurpleBooth/109311bb0361f32d87a2).

