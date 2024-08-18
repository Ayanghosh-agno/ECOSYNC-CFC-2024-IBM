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

- Many farmers lack access to <strong> real-time data and timely support </strong>. EcoSync’s receiver displays real-time data and transmits it to the cloud every 15 seconds. The website provides instant access to this data and customer support through a chatbot and live agents.

- <strong> Access to expert advice</strong> can be limited. EcoSync leverages Watson X AI for personalized recommendations on fertilizers and crop selection, tailored to each farm's conditions.

- <strong> Language barriers</strong> can limit access to information. EcoSync’s website, integrated with Watson Language Translator, supports eight languages, ensuring inclusivity and widespread adoption.

- Additionally, every device’s GPS data is stored and displayed on a map within the website. This feature allows users to see the precise location of each device and view field and environmental conditions on an interactive map, enhancing their ability to monitor and manage their farms effectively.

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

  - **Support:** Users can lodge cases and access a chatbot for quick queries or live agent support for more complex issues.

  - **AI Integration:** Watson X AI offers personalized recommendations to optimize farming practices.

  - **Language Support:** The website supports eight languages through Watson Language Translator.

EcoSync leverages technology to empower farmers with the information they need to enhance productivity, sustainability, and efficiency in their farming practices. By providing real-time data and AI-driven insights, EcoSync addresses the critical challenges facing modern agriculture, ensuring a more resilient and prosperous future for farmers worldwide.

<h2 align="center"> Technology Implementation <a name="technology-implementation"></a> </h2>


### IBM watsonx product(s) used <a name="ibm-ai-services-used">

**Featured watsonx products**

- [watsonx.ai](https://www.ibm.com/products/watsonx-ai) - Watson X AI is utilized to offer personalized farming recommendations based on real-time sensor data. By analyzing the collected data on soil health, weather conditions, and other environmental factors, Watson X AI generates actionable insights tailored to each farm's specific needs. These recommendations include optimal fertilizer applications, crop selection, and other farming practices that enhance productivity and sustainability.

- [watsonx Assistant](https://cloud.ibm.com/catalog/services/watsonx-assistant) - Watson Assistant is employed to handle initial user interactions and answer common queries through a chatbot. It efficiently addresses routine questions and issues, providing instant assistance to users. For more complex inquiries, Watson Assistant facilitates seamless transitions to live agents, ensuring that users receive timely and relevant support throughout their experience with EcoSync.

### Other IBM technology used <a name="other-ibm-technology-used"></a>

**Additional IBM AI services**

- [Language Translator](https://cloud.ibm.com/catalog/services/language-translator) - Watson Language Translator is integrated to make the website multilingual. This feature ensures that users from diverse linguistic backgrounds can access and understand the platform's information and recommendations. By supporting eight languages, Watson Language Translator enhances inclusivity and broadens the reach of EcoSync, making it accessible to a global audience.


### Solution Architecture <a name="solution-architecture"></a>

![Solution Architecture](https://github.com/Ayanghosh-agno/ECOSYNC-CFC-2024-IBM/blob/main/Assets/Ecosync%20Architecture.png)


**1. EcoSync Transmitter**
   
The EcoSync Transmitter is equipped with a variety of sensors that monitor key environmental factors such as atmospheric temperature, humidity, rain percentage, sunlight percentage, and GPS location. Additionally, it measures crucial soil parameters including NPK levels, EC (Electrical Conductivity), pH, temperature, and moisture. The transmitter is powered by solar panels with a backup Li-ion battery, ensuring continuous operation. It uses LORA technology to transmit the collected data to the EcoSync Receiver, with a range of up to 5 kilometers.

**3. EcoSync Receiver**
   
The EcoSync Receiver collects data from the Transmitter and displays it on its built-in screen for immediate access by the user. The device also has a GSM module that transfers the collected data to the cloud, allowing for remote monitoring and analysis. Users can access real-time field parameters directly through the receiver's interface, providing a hands-on approach to field management.

**4. Cloud Management**
   
EcoSync utilizes Firebase as its real-time database to store and manage the data transmitted from the Receiver. This system provides instant access to the environmental and soil metrics for further analysis. Additionally, a scheduled Apex job in Salesforce fetches the data from Firebase and synchronizes it with Salesforce for internal processing and storage.

**5. Ecosync Salesforce Ecosystem**
   
EcoSync's Salesforce ecosystem is built on the Service Cloud and Experience Cloud platforms. The Service Cloud handles customer support and service management, integrating custom labels, static resources, and Lightning Web Components (LWC) to provide a seamless experience. APEX code manages backend processes, while chat agents supported by Visualforce pages offer real-time customer assistance. The Experience Cloud powers the EcoSync website, where users can monitor their farm's conditions, access AI-driven recommendations, and benefit from multilingual support, all in one place.

**6. IBM Cloud, Weather API & NEXMO API Integrations**

The system is enhanced with several integrations along with IBM Cloud, including Nexmo SMS API for sending critical alerts to farmers, OpenWeather API for integrating real-time weather data all backed and integrated into Salesforce Experience Cloud (Ecosync Website). 


<h2 align="center"> Detailed Description <a name="detail-materials"></a> </h2>

### Ecosync Transmitter <a name="ecosync-transmitter"></a>

<img src="https://github.com/Ayanghosh-agno/">


-  Pointer to Code :-

    -  [Transmitter Code](https://github.com/Ayanghosh-agno/)-


 ### Ecosync Receiver <a name="ecosync-receiver"></a>

<img src="https://github.com/Ayanghosh-agno/">


-  Pointer to Code :-

    -  [Receiver Code](https://github.com/Ayanghosh-agno/)-
    -  [Display Screen Code(https://github.com/Ayanghosh-agno/)-
 
