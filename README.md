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

- <strong> Soil Degradation: </strong> 33% of soil is moderately to highly degraded [FAO](https://www.fao.org/fileadmin/user_upload/newsroom/docs/FAO-world-soils-report-SUMMARY.pdf)
- <strong> Water Scarcity:</strong> Agriculture accounts for 70% of global freshwater withdrawals, and inefficient irrigation systems lead to significant wastage [World Bank](https://blogs.worldbank.org/en/opendata/chart-globally-70-freshwater-used-agriculture).
- <strong> Climate Change:</strong> Unpredictable weather patterns adversely affect crop yields. The Intergovernmental Panel on Climate Change [IPCC](https://www.ipcc.ch/srccl/chapter/chapter-5/) projects a decrease in crop production by up to 2% per decade, while demand is expected to increase by 14% per decade.

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

By addressing these issues with innovative solutions, EcoSync empowers farmers to enhance productivity, sustainability, and efficiency, ensuring a resilient and prosperous future for agriculture.

### Our Idea : Sustainable Farming with ECOSYNC <a name="our-idea"></a>

EcoSync aims to revolutionize farming by combining cutting-edge hardware with intelligent software solutions. Here's a detailed breakdown of its functions and functionalities:

**1. Transmitter Device:**
  
  - **Sensors:** Collect data on various environmental - (Atmospheric temperature,humidity,rain %, sunlight %, GPS location) and soil parameters - (N,P,K,EC,PH,temperature,moisture)

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
