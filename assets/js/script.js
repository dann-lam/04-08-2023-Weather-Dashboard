// //This is bad. I know. Will be replaced.
temp_apikey = "9ce2af1a4de92e18eddd61ab40ca5e62";
// //DOM elements interacted with.
let searchQuery = document.getElementById("location-search-query");
let searchBtn = document.getElementById("location-search-btn");
let weatherInfo = document.getElementById("weather-info");
let cityDateIcon = document.getElementById("city-date-icon");
let favorites = document.getElementById("favorites");
let forecastContainer = document.getElementById("forecast-container");
//function looks through the localStorage, and sees if


//Take in five of the days, build cards for each one, and then append them to the five day forecase container div.
let displayFiveDay = (data) => {
    //Loop through the first 5 forecasts.
    for(let i = 0; i < 5; i++) {
        //Let the currItem be the i number on the list
        let currItem = data.list[i]
        console.log(currItem);
        //Takes the date inside (E.G. 2023-04-10 06:00:00 and splits it by the space, and then splits it by dashes. turns it into: ["2023-04-10", "06:00:00"], splitting it again outputs ["2023", "04", "10"]
        let formatDate = currItem.dt_txt.split(" ")[0].split("-");
        //Takes the elements in the array, rearranges elements and spits out a new string
        let outputDate = `${formatDate[1]}-${formatDate[2]}-${formatDate[0]}`
        //Key into each element and save them to a variable string.
        let tempURL = `http://openweathermap.org/img/wn/${currItem.weather[0].icon}@2x.png`
        let temp = `Temp: ${currItem.main.temp} F`
        let wind = `Wind: ${currItem.wind.speed} MPH`
        let humidity = `Humidity: ${currItem.main.humidity} %`
        //Create the card to contain the data.
        let forecastCard = document.createElement("div");

    }
}

//Split this function into two, because we want to pass on some of its functionality to the 5 day forecast API call.
let addToFavorites = (name) => {
    //Build a button
    let liEle = document.createElement('li');
    let liBtn = document.createElement('button');
    liEle.appendChild(liBtn);
    liBtn.innerText = name;
    liEle.style.listStyle = "none";
    favorites.appendChild(liEle);
    // localStorage.setItem("cityName", name)
    //add the button to local storage
}
//Make API call for 5 day weather.
let buildFiveDay = (lat, lon) => {

    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${temp_apikey}`

    fetch(url, {
        //possible additional fetch options here.
    })
    .then (function (response){
        return response.json();
    })
    .then (function (data) {
        console.log("Five Day Data");
        return displayFiveDay(data);
    })
}

//Take API data and display it.
let buildForecast = (name, country, state, wind, humidity, temp, icon) => {
    //Gets back a large string based on date.
    let today = new Date(Date.now()).toLocaleString();
    "E.G: 4/9/2023, 04:43:50"
    //Splits the string on the ,
    today = today.split(",")
    //Change adds in the city name, the date with only the m/d/yyy format, and our image based on icon ID from the weather API.
    cityDateIcon.innerHTML = `${name}, ${state}, ${country}` + ` (${today[0]}) `+ `<img src="http://openweathermap.org/img/wn/${icon}@2x.png">`

    //Creates our paragraph elements and appends them to the weatherInfo box.
    let tempEle = document.createElement("p");
    tempEle.innerHTML = `Temp: ${temp}F`
    let windEle = document.createElement("p");
    windEle.innerHTML = `Wind: ${wind} MPH`
    let humidEle = document.createElement("p");
    humidEle.innerHTML = `Humidity: ${humidity}%`
    weatherInfo.appendChild(tempEle);
    weatherInfo.appendChild(windEle)
    weatherInfo.appendChild(humidEle)

    //Build weather button here.

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
        console.log(data);
        let icon = data.weather[0].icon;
        let wind = data.wind.speed;
        let humidity = data.main.humidity;
        let temp = data.main.temp;
        return buildForecast(name, country, state, wind, humidity, temp, icon);
    })
    addToFavorites(name);
    return buildFiveDay(lat, lon)

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
