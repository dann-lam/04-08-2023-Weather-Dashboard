// //This is bad. Will be replaced.
temp_apikey = "9ce2af1a4de92e18eddd61ab40ca5e62";
// //DOM elements interacted with.
let searchQuery = document.getElementById("location-search-query");
let searchBtn = document.getElementById("location-search-btn");




let feedMe = (name, country, lat, lon, state) => {
    console.log(name, country, lat, lon, state)
}
// //GOAL: Take in a input search and apply it to a dropdown menu
// //With our search results.
// //When I click on the search button...
// Right now we're grabbing the first result. We should modify this in the future to include a dropdwon menu of our 5 results so that someone could choose.
let getCityCoords = (event) => {
    console.log("Hi");
    event.preventDefault();
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=Providence&limit=5&appid=9ce2af1a4de92e18eddd61ab40ca5e62', {

        //Fetch options here if need be.
      })
        .then(function (response) {
            //We write the remainder of the fetch() request, as follows:
          return response.json();
        })
        .then(function (data) {
          console.log(data);
          let cityName = data[0].name;
          let cityCountry = data[0].country;
          let cityLat = data[0].lat
          let cityLon = data[0].lon
          let cityState = data[0].state
          console.log(cityName, cityCountry, cityLat, cityLon, cityState)
          return feedMe(cityName, cityCountry, cityLat, cityLon, cityState)
        });

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
