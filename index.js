/*
    Create an instance of axios with a baseURL. 

    When the web application is consuming from two separate data sources, two instances of
    axios would be created with different set of `baseURL`. 
*/
const EnvironmentAPI = axios.create({
    baseURL:"https://api.data.gov.sg/v1/environment"
})

// Register a click event for <button id="btn1">
$("#btn1").on("click", async () => {
    try{

        // The API call. API returns a promise, hence the use of async and await keyword
        const response = await EnvironmentAPI.get("/2-hour-weather-forecast")
                
        const records = response.data.items[0].forecasts;
        const area_metadata = response.data.area_metadata;

        // Loop through the results and create a marker for each
        area_metadata.forEach(_d => {            
            const forecast = records.find(r => r.area === _d.name).forecast; // Get forecast data from forecasts property

            // Create marker on map
            const _marker = L.marker([_d.label_location.latitude, _d.label_location.longitude]);
            _marker.bindPopup(`${_d.name}: ${forecast}`).openPopup(); // Bind display info to marker
            _marker.addTo(map) // Add marker to map
        })

        // throw "mock error thrown";
    }catch(e){

        // If API returns an error, display alert message.
        // You may mock this by uncommenting `throw "mock error thrown"` before the catch keyword.
        const msgEl = $("#message");
        msgEl.removeClass("hidden");
        msgEl.append("Unable to fetch data from API");
    }
    
})

// Initialize the map
var map = L.map('map').setView([1.3615208221204578, 103.8160867611435], 12); // Coordinates copied from google map: 1.3615208221204578, 103.8160867611435

// By default, no map option is selected. Here, we indicate to use the openstreetmap option.
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);