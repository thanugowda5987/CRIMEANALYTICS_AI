/* ==========================================================
   KSP CRIME ANALYTICS PLATFORM

   hotspot.js

   Handles:
   - Crime hotspot visualization
   - Karnataka crime map
   - Heatmap markers
   - Hotspot API integration
   - District analysis
   - Language support

   Section 1:
   Map Setup + State Management

========================================================== */





/* ==============================
   API CONFIGURATION
================================ */


const HOTSPOT_API_URL =

"http://127.0.0.1:5000/api";









/* ==============================
   HOTSPOT APPLICATION STATE
================================ */


const HotspotState = {


    language:

    localStorage.getItem(
        "ksp_language"
    )

    ||

    "en",




    map:null,




    markers:[],




    heatLayer:null,




    hotspotData:[],




    selectedCrime:"All",




    selectedDistrict:"All",




    isLoading:false



};









/* ==============================
   MAP CONFIGURATION
================================ */


const KarnatakaMapConfig = {


    center:[


        15.3173,

        75.7139


    ],



    zoom:7



};









/* ==============================
   PAGE INITIALIZATION
================================ */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        initializeHotspot();



    }

);









/* ==============================
   INITIALIZE HOTSPOT MODULE
================================ */


function initializeHotspot(){



    console.log(

        "KSP Crime Hotspot Module Loaded"

    );





    initializeMap();





}









/* ==============================
   CREATE LEAFLET MAP
================================ */


function initializeMap(){



    const mapContainer =

    document.getElementById(

        "crimeMap"

    );





    if(!mapContainer){



        console.warn(

            "Map container not found"

        );


        return;


    }









    HotspotState.map =

    L.map(

        "crimeMap"

    )

    .setView(


        KarnatakaMapConfig.center,


        KarnatakaMapConfig.zoom


    );









    L.tileLayer(

        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",

        {


        attribution:

        "© OpenStreetMap Contributors"


        }


    )

    .addTo(

        HotspotState.map

    );






    console.log(

        "Crime map initialized"

    );



}









/* ==============================
   MAP CLEANUP
================================ */


function clearMapMarkers(){



    HotspotState.markers.forEach(

        marker=>{


            HotspotState.map.removeLayer(

                marker

            );


        }


    );





    HotspotState.markers=[];



}









/* ==============================
   LOADING STATE
================================ */


function setHotspotLoading(
    loading
){



    HotspotState.isLoading =

    loading;





    const loader =

    document.getElementById(

        "mapLoader"

    );





    if(!loader){


        return;


    }







    loader.style.display =

    loading

    ?

    "block"

    :

    "none";



}









/* ==============================
   MAP RESET
================================ */


function resetMap(){



    if(
        HotspotState.map
    ){



        HotspotState.map.setView(

            KarnatakaMapConfig.center,


            KarnatakaMapConfig.zoom


        );


    }



}









/* ==============================
   VALIDATE HOTSPOT RESPONSE
================================ */


function validateHotspotData(
    data
){



    if(
        !Array.isArray(data)
    ){



        console.error(

            "Invalid hotspot data"

        );



        return false;


    }






    return true;



}
/* ==========================================================
   SECTION 2
   HOTSPOT API INTEGRATION

   Handles:
   - Fetch crime hotspot data
   - Backend communication
   - Data processing
   - Error handling

========================================================== */





/* ==============================
   FETCH HOTSPOT DATA
================================ */


async function loadHotspotData(){



    try{



        setHotspotLoading(
            true
        );





        const response =

        await fetch(

            `${HOTSPOT_API_URL}/hotspots`

        );








        const result =

        await response.json();







        if(
            !response.ok
        ){



            throw new Error(

                result.message

                ||

                "Unable to load hotspot data"

            );


        }








        processHotspotData(

            result

        );





    }

    catch(error){



        console.error(

            "Hotspot API Error:",

            error

        );





        showHotspotMessage(

            error.message,

            "error"

        );



    }

    finally{



        setHotspotLoading(
            false
        );


    }



}









/* ==============================
   PROCESS HOTSPOT RESPONSE
================================ */


function processHotspotData(
    response
){



    console.log(

        "Hotspot Data:",

        response

    );







    let data = response;







    /*
       Supports different
       backend formats

       Example:

       {
          hotspots:[]
       }

       OR

       []
    */






    if(
        response.hotspots
    ){



        data =

        response.hotspots;



    }








    if(
        !validateHotspotData(
            data
        )
    ){



        return;


    }








    HotspotState.hotspotData =

    data;







    displayHotspots();



}









/* ==============================
   FETCH HOTSPOT BY DISTRICT
================================ */


async function loadDistrictHotspots(
    district
){



    try{



        setHotspotLoading(
            true
        );






        const response =

        await fetch(

            `${HOTSPOT_API_URL}/hotspots/${district}`

        );








        const data =

        await response.json();






        if(
            !response.ok
        ){



            throw new Error(

                "District data unavailable"

            );



        }







        processHotspotData(

            data

        );



    }

    catch(error){



        console.error(

            error

        );



        showHotspotMessage(

            error.message,

            "error"

        );



    }

    finally{


        setHotspotLoading(
            false
        );


    }



}









/* ==============================
   GET CRIME TYPES
================================ */


function getCrimeTypes(){



    const crimes =

    HotspotState.hotspotData.map(

        item=>

        item.crimeType

        ||

        item.crime


    );







    return [

        "All",

        ...new Set(
            crimes
        )

    ];



}









/* ==============================
   GET DISTRICTS
================================ */


function getDistrictList(){



    const districts =

    HotspotState.hotspotData.map(

        item=>

        item.district


    );








    return [

        "All",

        ...new Set(
            districts
        )

    ];



}









/* ==============================
   FILTER HOTSPOT DATA
================================ */


function filterHotspotData(){



    let filtered =

    HotspotState.hotspotData;







    if(

        HotspotState.selectedCrime

        !==

        "All"

    ){



        filtered =

        filtered.filter(

            item=>



            (

            item.crimeType

            ||

            item.crime

            )

            ===

            HotspotState.selectedCrime



        );



    }








    if(

        HotspotState.selectedDistrict

        !==

        "All"

    ){



        filtered =

        filtered.filter(

            item=>



            item.district

            ===

            HotspotState.selectedDistrict



        );



    }







    return filtered;



}









/* ==============================
   HOTSPOT MESSAGE DISPLAY
================================ */


function showHotspotMessage(
    message,
    type="success"
){



    let box =

    document.getElementById(

        "hotspotMessage"

    );





    if(!box){



        box =

        document.createElement(
            "div"
        );



        box.id =

        "hotspotMessage";





        const container =

        document.querySelector(

            ".hotspot-container"

        );





        if(container){



            container.prepend(
                box
            );



        }



    }








    box.className =

    `hotspot-message ${type}`;






    box.innerText =

    message;






    setTimeout(

        ()=>{


            box.innerText="";


        },

        4000

    );



}









/* ==============================
   API CONNECTION TEST
================================ */


async function checkHotspotServer(){



    try{



        const response =

        await fetch(

            `${HOTSPOT_API_URL}/status`

        );





        return response.ok;



    }

    catch(error){



        console.warn(

            "Hotspot server offline"

        );



        return false;



    }



}
/* ==========================================================
   SECTION 3
   HOTSPOT MAP VISUALIZATION

   Handles:
   - Crime markers
   - Heatmap layer
   - Popup information
   - Crime intensity display

========================================================== */





/* ==============================
   DISPLAY ALL HOTSPOTS
================================ */


function displayHotspots(){



    clearMapMarkers();





    const filteredData =

    filterHotspotData();







    filteredData.forEach(

        hotspot=>{


            addCrimeMarker(

                hotspot

            );


        }

    );







    createHeatmap(

        filteredData

    );



}









/* ==============================
   ADD CRIME MARKER
================================ */


function addCrimeMarker(
    hotspot
){



    if(
        !HotspotState.map
    ){

        return;

    }








    const latitude =

    hotspot.latitude

    ||

    hotspot.lat;







    const longitude =

    hotspot.longitude

    ||

    hotspot.lng;







    if(
        !latitude
        ||
        !longitude
    ){



        console.warn(

            "Invalid coordinates",

            hotspot

        );


        return;


    }








    const risk =

    hotspot.risk

    ||

    calculateCrimeIntensity(

        hotspot.count

        ||

        hotspot.total

        ||

        1

    );








    const marker =

    L.marker(

        [

        latitude,

        longitude

        ],

        {


        title:

        hotspot.crimeType

        ||

        "Crime Location"


        }

    );









    marker.bindPopup(`


        <div class="crime-popup">


            <h3>

            ${

            hotspot.crimeType

            ||

            hotspot.crime

            ||

            "Crime"

            }

            </h3>




            <p>

            District:

            <b>

            ${

            hotspot.district

            ||

            "Unknown"

            }

            </b>

            </p>




            <p>

            Total Cases:

            <b>

            ${

            hotspot.count

            ||

            0

            }

            </b>

            </p>




            <p>

            Risk:

            <b>

            ${risk}

            </b>

            </p>



        </div>



    `);








    marker.addTo(

        HotspotState.map

    );







    HotspotState.markers.push(

        marker

    );



}









/* ==============================
   CREATE HEATMAP
================================ */


function createHeatmap(
    data
){



    if(
        !HotspotState.map
    ){

        return;

    }









    removeHeatmap();







    const points =

    data.map(

        item=>{


            const lat =

            item.latitude

            ||

            item.lat;





            const lng =

            item.longitude

            ||

            item.lng;





            const intensity =

            normalizeIntensity(

                item.count

                ||

                item.total

                ||

                1

            );






            return [

                lat,

                lng,

                intensity

            ];



        }

    );









    /*
       Requires Leaflet Heatmap Plugin

       Include in hotspot.html:

       <script src=
       "https://unpkg.com/leaflet.heat/dist/leaflet-heat.js">
       </script>

    */








    if(
        L.heatLayer
    ){



        HotspotState.heatLayer =

        L.heatLayer(

            points,

            {


            radius:35,


            blur:25,


            maxZoom:10



            }

        )

        .addTo(

            HotspotState.map

        );



    }

    else{


        console.warn(

            "Heatmap plugin not loaded"

        );


    }



}









/* ==============================
   REMOVE HEATMAP
================================ */


function removeHeatmap(){



    if(
        HotspotState.heatLayer
    ){



        HotspotState.map.removeLayer(

            HotspotState.heatLayer

        );





        HotspotState.heatLayer = null;



    }



}









/* ==============================
   NORMALIZE INTENSITY
================================ */


function normalizeIntensity(
    value
){



    value =

    Number(
        value
    );





    if(
        value >= 100
    ){



        return 1;



    }






    return value / 100;



}









/* ==============================
   CALCULATE CRIME INTENSITY
================================ */


function calculateCrimeIntensity(
    count
){



    count =

    Number(
        count
    );





    if(
        count >= 100
    ){



        return "High";



    }





    if(
        count >= 50
    ){



        return "Medium";



    }





    return "Low";



}









/* ==============================
   FOCUS MAP LOCATION
================================ */


function focusHotspot(
    latitude,
    longitude
){



    if(
        HotspotState.map
    ){



        HotspotState.map.setView(

            [

            latitude,

            longitude

            ],


            12


        );


    }



}









/* ==============================
   SHOW HOTSPOT STATISTICS
================================ */


function updateHotspotStatistics(){



    const stats =

    document.getElementById(

        "hotspotStats"

    );





    if(
        !stats
    ){

        return;

    }








    const data =

    filterHotspotData();







    const totalCases =

    data.reduce(

        (sum,item)=>

        sum +

        Number(

            item.count

            ||

            0

        ),

        0

    );








    stats.innerHTML = `


    <div class="stat-card">


        <h3>
        Total Hotspots
        </h3>


        <p>
        ${data.length}
        </p>


    </div>



    <div class="stat-card">


        <h3>
        Crime Cases
        </h3>


        <p>
        ${totalCases}
        </p>


    </div>



    `;



}
/* ==========================================================
   SECTION 4
   HOTSPOT FILTERS & CONTROLS

   Handles:
   - Crime type filtering
   - District filtering
   - Date filtering
   - Search hotspot
   - Map controls

========================================================== */





/* ==============================
   INITIALIZE FILTER CONTROLS
================================ */


function initializeHotspotFilters(){



    populateCrimeFilter();



    populateDistrictFilter();



    setupFilterEvents();



}









/* ==============================
   POPULATE CRIME DROPDOWN
================================ */


function populateCrimeFilter(){



    const dropdown =

    document.getElementById(

        "crimeFilter"

    );





    if(!dropdown){


        return;


    }








    const crimes =

    getCrimeTypes();








    dropdown.innerHTML =

    crimes.map(

        crime=>`


        <option value="${crime}">

        ${crime}

        </option>


        `


    )

    .join("");



}









/* ==============================
   POPULATE DISTRICT DROPDOWN
================================ */


function populateDistrictFilter(){



    const dropdown =

    document.getElementById(

        "districtFilter"

    );






    if(!dropdown){


        return;


    }








    const districts =

    getDistrictList();








    dropdown.innerHTML =

    districts.map(

        district=>`


        <option value="${district}">

        ${district}

        </option>


        `


    )

    .join("");



}









/* ==============================
   FILTER EVENT HANDLERS
================================ */


function setupFilterEvents(){



    const crimeFilter =

    document.getElementById(

        "crimeFilter"

    );






    const districtFilter =

    document.getElementById(

        "districtFilter"

    );








    const searchBox =

    document.getElementById(

        "hotspotSearch"

    );









    if(crimeFilter){



        crimeFilter.addEventListener(

            "change",

            event=>{


                HotspotState.selectedCrime =

                event.target.value;





                refreshHotspotMap();



            }

        );



    }









    if(districtFilter){



        districtFilter.addEventListener(

            "change",

            event=>{


                HotspotState.selectedDistrict =

                event.target.value;





                refreshHotspotMap();



            }

        );



    }









    if(searchBox){



        searchBox.addEventListener(

            "input",

            event=>{


                searchHotspot(

                    event.target.value

                );


            }

        );



    }



}









/* ==============================
   REFRESH MAP AFTER FILTER
================================ */


function refreshHotspotMap(){



    displayHotspots();



    updateHotspotStatistics();



}









/* ==============================
   SEARCH HOTSPOTS
================================ */


function searchHotspot(
    keyword
){



    if(
        !keyword
        ||
        keyword.trim()===""
    ){



        displayHotspots();


        return;


    }








    const searchText =

    keyword

    .toLowerCase();








    const results =

    HotspotState.hotspotData.filter(

        item=>{


            return (


                item.crimeType

                ||

                item.crime

                ||

                ""

            )

            .toLowerCase()

            .includes(

                searchText

            )

            ||

            (


                item.district

                ||

                ""

            )

            .toLowerCase()

            .includes(

                searchText

            );



        }


    );








    clearMapMarkers();





    results.forEach(

        hotspot=>{


            addCrimeMarker(

                hotspot

            );


        }

    );



}









/* ==============================
   DATE FILTER
================================ */


function filterByDate(
    startDate,
    endDate
){



    let data =

    HotspotState.hotspotData;








    if(
        startDate
    ){



        data =

        data.filter(

            item=>{


                return new Date(

                    item.date

                )

                >=

                new Date(

                    startDate

                );


            }

        );


    }








    if(
        endDate
    ){



        data =

        data.filter(

            item=>{


                return new Date(

                    item.date

                )

                <=

                new Date(

                    endDate

                );


            }

        );


    }








    clearMapMarkers();






    data.forEach(

        hotspot=>{


            addCrimeMarker(

                hotspot

            );


        }

    );



}









/* ==============================
   MAP ZOOM CONTROLS
================================ */


function zoomToKarnataka(){



    resetMap();



}









/* ==============================
   LOCATE USER
================================ */


function locateUser(){



    if(
        !navigator.geolocation
    ){



        showHotspotMessage(

            "Location not supported",

            "error"

        );


        return;


    }








    navigator.geolocation.getCurrentPosition(

        position=>{


            const lat =

            position.coords.latitude;





            const lng =

            position.coords.longitude;






            focusHotspot(

                lat,

                lng

            );



        },

        error=>{


            showHotspotMessage(

                "Unable to access location",

                "error"

            );


        }


    );



}









/* ==============================
   MAP FULLSCREEN MODE
================================ */


function toggleMapFullscreen(){



    const map =

    document.getElementById(

        "crimeMap"

    );





    if(!map){


        return;


    }







    if(
        !document.fullscreenElement
    ){



        map.requestFullscreen();



    }

    else{



        document.exitFullscreen();



    }



}
/* ==========================================================
   SECTION 5
   HOTSPOT LANGUAGE SYSTEM

   Handles:
   - English ⇄ Kannada
   - UI translation
   - Map messages
   - Language memory

========================================================== */





/* ==============================
   TRANSLATION DATABASE
================================ */


const HotspotLanguage = {


    en:{


        title:
        "Crime Hotspot Analysis",


        map:
        "Crime Map",


        search:
        "Search crime or district",


        all:
        "All",


        loading:
        "Loading hotspot data...",


        success:
        "Hotspot data loaded successfully",


        error:
        "Unable to load hotspot information",


        noData:
        "No hotspot data available",


        location:
        "Location enabled",


        fullscreen:
        "Fullscreen Map",


        reset:
        "Reset Map",


        statistics:
        "Hotspot Statistics"



    },







    kn:{


        title:
        "ಅಪರಾಧ ಹಾಟ್‌ಸ್ಪಾಟ್ ವಿಶ್ಲೇಷಣೆ",


        map:
        "ಅಪರಾಧ ನಕ್ಷೆ",


        search:
        "ಅಪರಾಧ ಅಥವಾ ಜಿಲ್ಲೆ ಹುಡುಕಿ",


        all:
        "ಎಲ್ಲಾ",


        loading:
        "ಹಾಟ್‌ಸ್ಪಾಟ್ ಮಾಹಿತಿಯನ್ನು ಲೋಡ್ ಮಾಡಲಾಗುತ್ತಿದೆ...",


        success:
        "ಹಾಟ್‌ಸ್ಪಾಟ್ ಮಾಹಿತಿ ಯಶಸ್ವಿಯಾಗಿ ಲೋಡ್ ಆಗಿದೆ",


        error:
        "ಹಾಟ್‌ಸ್ಪಾಟ್ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ",


        noData:
        "ಯಾವುದೇ ಹಾಟ್‌ಸ್ಪಾಟ್ ಮಾಹಿತಿ ಲಭ್ಯವಿಲ್ಲ",


        location:
        "ಸ್ಥಳ ಸಕ್ರಿಯವಾಗಿದೆ",


        fullscreen:
        "ಪೂರ್ಣ ಪರದೆ ನಕ್ಷೆ",


        reset:
        "ನಕ್ಷೆಯನ್ನು ಮರುಹೊಂದಿಸಿ",


        statistics:
        "ಹಾಟ್‌ಸ್ಪಾಟ್ ಅಂಕಿಅಂಶಗಳು"



    }


};









/* ==============================
   SETUP LANGUAGE BUTTONS
================================ */


function setupHotspotLanguageButtons(){



    const buttons =

    document.querySelectorAll(

        ".language-btn"

    );








    buttons.forEach(

        button=>{


            button.addEventListener(

                "click",

                ()=>{


                    changeHotspotLanguage(

                        button.dataset.lang

                    );


                }

            );


        }

    );



}









/* ==============================
   CHANGE LANGUAGE
================================ */


function changeHotspotLanguage(
    language
){



    if(
        !HotspotLanguage[language]
    ){


        return;


    }








    HotspotState.language =

    language;







    localStorage.setItem(

        "ksp_language",

        language

    );








    updateHotspotLanguage();



}









/* ==============================
   UPDATE HOTSPOT PAGE TEXT
================================ */


function updateHotspotLanguage(){



    const lang =

    HotspotLanguage[

        HotspotState.language

    ];








    document

    .querySelectorAll(

        "[data-hotspot-key]"

    )

    .forEach(

        element=>{


            const key =

            element.dataset
            .hotspotKey;





            if(
                lang[key]
            ){



                element.innerText =

                lang[key];


            }



        }

    );









    document

    .querySelectorAll(

        "[data-hotspot-placeholder]"

    )

    .forEach(

        element=>{


            const key =

            element.dataset
            .hotspotPlaceholder;





            if(
                lang[key]
            ){



                element.placeholder =

                lang[key];


            }



        }

    );



}









/* ==============================
   RESTORE LANGUAGE
================================ */


function restoreHotspotLanguage(){



    const savedLanguage =

    localStorage.getItem(

        "ksp_language"

    );






    if(savedLanguage){



        changeHotspotLanguage(

            savedLanguage

        );


    }

    else{


        changeHotspotLanguage(

            "en"

        );


    }



}









/* ==============================
   GET TRANSLATED TEXT
================================ */


function getHotspotText(
    key
){



    return (


        HotspotLanguage[

            HotspotState.language

        ][key]


        ||

        key


    );



}









/* ==============================
   TRANSLATED HOTSPOT MESSAGE
================================ */


function showTranslatedHotspotMessage(
    key,
    type="success"
){



    showHotspotMessage(

        getHotspotText(

            key

        ),

        type

    );



}









/* ==============================
   UPDATE LANGUAGE BUTTON STYLE
================================ */


function updateHotspotLanguageButton(){



    document

    .querySelectorAll(

        ".language-btn"

    )

    .forEach(

        button=>{


            button.classList.remove(

                "active"

            );





            if(

                button.dataset.lang

                ===

                HotspotState.language

            ){


                button.classList.add(

                    "active"

                );


            }



        }


    );



}









/* ==============================
   TRANSLATE FILTER OPTIONS
================================ */


function translateFilterOptions(){



    document

    .querySelectorAll(

        "#crimeFilter option:first-child, #districtFilter option:first-child"

    )

    .forEach(

        option=>{


            option.innerText =

            getHotspotText(

                "all"

            );


        }

    );



}
/* ==========================================================
   SECTION 6
   FINAL HOTSPOT INITIALIZATION

   Handles:
   - Application startup
   - Backend connection
   - Loading hotspot data
   - Filter initialization
   - Global exports

========================================================== */





/* ==============================
   BACKEND CONNECTION CHECK
================================ */


async function checkHotspotBackend(){



    try{



        const response =

        await fetch(

            `${HOTSPOT_API_URL}/status`

        );





        if(response.ok){


            console.log(

                "Hotspot backend connected"

            );


            return true;


        }



    }

    catch(error){



        console.warn(

            "Hotspot backend unavailable",

            error

        );



    }





    return false;



}









/* ==============================
   LOAD INITIAL DATA
================================ */


async function loadInitialHotspotData(){



    await loadHotspotData();





    populateCrimeFilter();



    populateDistrictFilter();





    updateHotspotStatistics();



}









/* ==============================
   INITIAL BUTTON EVENTS
================================ */


function initializeHotspotButtons(){



    const resetButton =

    document.getElementById(

        "resetMap"

    );





    const locationButton =

    document.getElementById(

        "myLocation"

    );





    const fullscreenButton =

    document.getElementById(

        "fullscreenMap"

    );









    if(resetButton){



        resetButton.addEventListener(

            "click",

            zoomToKarnataka

        );


    }








    if(locationButton){



        locationButton.addEventListener(

            "click",

            locateUser

        );


    }








    if(fullscreenButton){



        fullscreenButton.addEventListener(

            "click",

            toggleMapFullscreen

        );


    }



}









/* ==============================
   DEFAULT MAP SETTINGS
================================ */


function setupHotspotDefaults(){



    HotspotState.selectedCrime =

    "All";




    HotspotState.selectedDistrict =

    "All";





}









/* ==============================
   CLEANUP FUNCTION
================================ */


function cleanupHotspot(){



    if(
        HotspotState.map
    ){



        clearMapMarkers();



        removeHeatmap();



    }



}









/* ==============================
   WINDOW CLEANUP EVENT
================================ */


window.addEventListener(

    "beforeunload",

    ()=>{


        cleanupHotspot();



    }

);









/* ==============================
   GLOBAL ERROR HANDLER
================================ */


window.addEventListener(

    "error",

    event=>{


        console.error(

            "Hotspot Module Error:",

            event.error

        );


    }

);









/* ==============================
   FINAL START FUNCTION
================================ */


async function startHotspotApplication(){



    console.log(

        "Starting KSP Crime Hotspot System..."

    );







    setupHotspotDefaults();





    setupHotspotLanguageButtons();





    restoreHotspotLanguage();





    initializeHotspotButtons();





    initializeHotspotFilters();







    const server =

    await checkHotspotBackend();







    if(!server){



        showTranslatedHotspotMessage(

            "error",

            "error"

        );



    }







    await loadInitialHotspotData();







    updateHotspotLanguage();





    updateHotspotLanguageButton();





    translateFilterOptions();





    console.log(

        "Hotspot system ready"

    );



}









/* ==============================
   START APPLICATION
================================ */


document.addEventListener(

    "DOMContentLoaded",

    ()=>{


        startHotspotApplication();



    }

);









/* ==============================
   GLOBAL EXPORTS
================================ */


window.KSPHotspot = {


    loadHotspotData,


    displayHotspots,


    filterHotspotData,


    searchHotspot,


    focusHotspot,


    locateUser,


    toggleMapFullscreen,


    changeHotspotLanguage,


    resetMap,


    HotspotState



};