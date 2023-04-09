// //This is bad. I know. Will be replaced.
temp_apikey = "9ce2af1a4de92e18eddd61ab40ca5e62";
// //DOM elements interacted with.
let searchQuery = document.getElementById("location-search-query");
let searchBtn = document.getElementById("location-search-btn");


//Take API data and display it.
let buildForecast = (name, country, state, wind, humidity, temp, icon) => {
        // http://openweathermap.org/img/wn/${icon}@2x.png

}
//Fetch the weather at location.
let getWeather = (name, country, lat, lon, state) => {
    //units set to imperial why? Because.
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${temp_apikey}`, {
        //Future fetch options here if need be.
        //Also needs error handlers.
    })
    .then(function (response){
        //parse response
        return response.json();
    })
    .then(function (data){
        //Get relevent data
        let icon = data.weather[0].icon;
        let wind = data.wind.speed;
        let humidity = data.main.humidity;
        let temp = data.main.temp;
        return buildForecast(name, country, state, wind, humidity, temp, icon);
    })

}
// //GOAL: Take in a input search and apply it to a dropdown menu
// //With our search results.
// //When I click on the search button...
// Right now we're grabbing the first result. We should modify this in the future to include a dropdwon menu of our 5 results so that someone could choose.
let getCityCoords = (event) => {
    //Prevent default behavior of button clicked.
    event.preventDefault();
    //Get text from queryBox and trim it.
    let searchQueryText = searchQuery.value.trim();
    //Ensure we have something
    if(searchQueryText){
        //fetch city
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${searchQueryText}&limit=5&appid=${temp_apikey}`, {

        //Fetch options here if need be.
        //We should probably add in some error handlers later.
      })
        .then(function (response) {
          //parse response to useful
          return response.json();
        })
        //Grab the data that we want.
        .then(function (data) {
          let cityName = data[0].name;
          let cityCountry = data[0].country;
          let cityLat = data[0].lat
          let cityLon = data[0].lon
          let cityState = data[0].state
          return getWeather(cityName, cityCountry, cityLat, cityLon, cityState)
        });
    } else {
        //Condition for empty input box.
        console.log("Please input something in the text box!")
    }


}



searchBtn.addEventListener("click", getCityCoords);




// //wrap elements interact with DOM in .ready


// //When I type into the search option

// //I want to be able to see a dropdown of 5 options based on the search that most closely match our city

// //When I click on the match, it should automatically swap my search input to that.

// //When I click on the search option, it should bring up the weather API results for that city.

// //Five day forecaster is

// //



// // http://api.openweathermap.org/geo/1.0/direct?q={city name},{state code},{country code}&limit={limit}&appid={API key}

// //I want to use the country name, and the lat longs given to me from that response
// //Weather data based on lat long query:
// // https://openweathermap.org/current#geocoding
