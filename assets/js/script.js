// //This is bad. I know. Will be replaced.
temp_apikey = "9ce2af1a4de92e18eddd61ab40ca5e62";
// //DOM elements interacted with.
let searchQuery = document.getElementById("location-search-query");
let searchBtn = document.getElementById("location-search-btn");
let weatherInfo = document.getElementById("weather-info");
let cityDateIcon = document.getElementById("city-date-icon");
let favorites = document.getElementById("favorites");
let forecastContainer = document.getElementById("forecast-container");
let forecastHeader = document.getElementById("five-day-forecast-header")

//Draw buttons from local storage
let redrawFavoritesDisplay = () => {
    //Reset favorites
    favorites.innerHTML = '';
    //parses value string from favorites key assigns to variable
    let storageFavorites = JSON.parse(localStorage.getItem("favorites"))
    //if something is in there
    if(storageFavorites){
    //go through array, create list and button, append to favoritesID DOM
    for(let i = 0; i < storageFavorites.length; i++){

        let currItem = storageFavorites[i];

        let liEle = document.createElement('li');

        let liBtn = document.createElement('button');
        liEle.appendChild(liBtn);
        liBtn.innerText = currItem;
        liBtn.className = "storedCity";
        liEle.style.listStyle = "none";
        favorites.appendChild(liEle);
        }
    }
    return
};

//handle items in storage, initialize if none, remove last item and insert new if full, insert if has space
let localStorageSwitch = (text) => {
    //get items from storage, if empty, create empty array, assign to var
    let entries = JSON.parse(localStorage.getItem("favorites")) || [];
        //If cityName already inside return
        if(entries.includes(text)){
            return;
        }
        //if nothing inside (is empty array)
        if(!entries){
            //add cityname to array
            entries.push(text)
            //save to storage
            localStorage.setItem("favorites", JSON.stringify(entries));

            return redrawFavoritesDisplay();

            //if we have 5 items (full)
        } else if (entries.length == 5){
            //remove last item
            entries.pop();
            //enter new item (shifts the rest of cities down)
            entries.unshift(text);

            localStorage.setItem("favorites", JSON.stringify(entries))

            return redrawFavoritesDisplay();
        } else {
            //array array not full, add city
            entries.unshift(text);

            localStorage.setItem("favorites", JSON.stringify(entries))

            return redrawFavoritesDisplay();
        }

}


//Take in five of the days, build cards for each one, and then append them to the five day forecase container div.
    //This loop goes through all objects until it finds 5 items next day at 3PM. This is not ideal but a naive solution for the time being.
    //Once I find 5 of them and append them, I exit the function.
let displayFiveDay = (data) => {
    let count = 0;
    //See if I have to initialize an header.
    if(!forecastHeader.innerText){

        forecastHeader.innerText = "Five Day Forecast: ";
    }
    //Clear out the container each time we search for city
    forecastContainer.innerHTML = '';
    for(let i = 0; i < data.list.length; i++) {
        //If I loop through, and the count has reached 5, we stop.
        if(count == 5){
            return;
        }
        let currItem = data.list[i]
        // Takes the date inside, splits it by the space inside.
        //Looks at the time, splits that, and looks at the hour.
        //(E.G. [15,00,00])
        //
        let timeFinder = currItem.dt_txt.split(" ")[1].split(":")[0];
        //If we find the next day at 3PM
        if(timeFinder == 15){
            count++
            //Takes the date inside (E.G. 2023-04-10 06:00:00 and splits it by the space, and then splits it by dashes. turns it into: ["2023-04-10", "06:00:00"], splitting it again outputs ["2023", "04", "10"]

            let formatDate = currItem.dt_txt.split(" ")[0].split("-");

            //Takes the elements in the array, rearranges elements and spits out a new string

            let outputDate = `${formatDate[1]}-${formatDate[2]}-${formatDate[0]}`
            //Key into each element and save them to a variable string.
            let tempURL = `http://openweathermap.org/img/wn/${currItem.weather[0].icon}@2x.png`
            let temp = `Temp: ${currItem.main.temp} F`
            let wind = `Wind: ${currItem.wind.speed} MPH`
            let humidity = `Humidity: ${currItem.main.humidity} %`

            //Create the card to contain the data and append it to the forecast container.
            let forecastCard = document.createElement("div");
            forecastCard.className = "forecast-card";
            forecastCard.style.border = "1px solid black";
            forecastCard.style.padding = "10px";
            forecastContainer.appendChild(forecastCard);

            let cardHeader = document.createElement("h4");
            cardHeader.innerText = outputDate;
            forecastCard.appendChild(cardHeader);

            let weatherIcon = document.createElement("img");
            weatherIcon.src = tempURL;
            forecastCard.appendChild(weatherIcon);

            let tempP = document.createElement("p");
            let windP = document.createElement("p");
            let humidityP = document.createElement("p");

            tempP.innerText = temp;
            windP.innerText = wind;
            humidityP.innerText = humidity;

            forecastCard.appendChild(tempP);
            forecastCard.appendChild(windP);
            forecastCard.appendChild(humidityP);

            }


    }
    //On the off off chance we did not somehow find 5.
    console.log("Somehow I did not find 5.");
    return;
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
        return displayFiveDay(data);
    })
}

//Take API data and display it.
let buildForecast = (name, country, state, wind, humidity, temp, icon) => {
    //Gets back a large string based on date.
    weatherInfo.innerHTML = '';
    let today = new Date(Date.now()).toLocaleString();
    "E.G: 4/9/2023, 04:43:50"
    //Splits the string on the ,
    today = today.split(",")
    //Change adds in the city name, the date with only the m/d/yyy format, and our image based on icon ID from the weather API.
    cityDateIcon.innerHTML = `${name}, ${state}, ${country}` + ` (${today[0]}) `+ `<img src="https://openweathermap.org/img/wn/${icon}@2x.png">`

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



}
//Fetch the weather at location.
//other information is passed to "remember" them.
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
        //Build the single day forecast
        return buildForecast(name, country, state, wind, humidity, temp, icon);
    })

    //send the name to localStorageSwitch for button creation and localstorage
    localStorageSwitch(name);
    //build the 5 day forecaster
    return buildFiveDay(lat, lon)

}
//Gets lat longs for inputted city.
let getCityCoords = (event, cityName) => {
    //Prevent default behavior of button clicked.
    event.preventDefault();

    //Get text from queryBox and trim it.
    let searchQueryText = searchQuery.value.trim();
    //condition only met If favorites button is clicked, we'll assign it to be what should be searched instead.
    if(cityName){
        searchQueryText = cityName;
    }
    //Ensure we have something
    if(searchQueryText){
        //fetch city
        fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${searchQueryText}&limit=5&appid=${temp_apikey}`, {

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
          //fetch the weather information
          return getWeather(cityName, cityCountry, cityLat, cityLon, cityState)
        });
    } else {
        //Condition for empty input box.
        console.log("Please input something in the text box!")
    }

    //

}

//Listen for a click on the search button.
searchBtn.addEventListener("click", getCityCoords);
//Initializes favorites display upon refresh
redrawFavoritesDisplay();
//Event delegator
document.querySelector('body').addEventListener('click', function(event) {
    //This even fires on favorited buttons.
if(event.target.className === "storedCity"){
    getCityCoords(event, event.target.innerText)
}
})
