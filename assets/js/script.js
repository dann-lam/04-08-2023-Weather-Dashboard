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
//function looks through the localStorage, and sees if
//There are already up to five elements inside of an array.
//if the array is "full" (5).
//Then remove the last button from the list
//move each element down
//insert the new one into the front of the list
//redraw the list.

//If there are elements in the local storage, then I want to get them.
let getLocalStorage = () => {
    if
    localStorage.setItem("favorites");
}
redrawFavoritesDisplay(newBtnLi, newBtn){
    for(let i = 0; i < localStorage.favorites.length; i++){

    }
};

let localStorageSwitch = (text, newBtnLi, newBtn) => {

    if(!localStorage.favorites){
        localStorage.favorites = [text];
        redrawFavoritesDisplay(newBtnLi, newBtn);
    } else if (localStorage.favorites.length == 5){
        localStorage.favorites.pop();
        localStorage.favorites.unshift(text);
        redrawFavoritesDisplay(newBtnLi, newBtn);
    }

}
let buttonBuilder = (text) => {
    let newBtnLi = document.createElement("li");
    let newBtn = document.createElement("button");
    newBtn.innerText = text;
    newBtnLi.style.listStyle = "none";
    localStorageSwitch(text, newBtnLi, newBtn);
}

//Take in five of the days, build cards for each one, and then append them to the five day forecase container div.
    //This loop goes through all objects until it finds 5 items next day at 3PM. This is not ideal but a naive solution for the time being.
    //Once I find 5 of them and append them, I exit the function.
let displayFiveDay = (data) => {
    let count = 0;
    //Logic to check if the Five Day Forecast exists or not already.
    //If it does, let it be.
    if(forecastHeader.innerHTML){
        console.log("I should've added text.");
        forecastHeader.innerText = "Five Day Forecast: ";
    }
    //Clear out the container each time we click.
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
            forecastContainer.appendChild(forecastCard);

            let cardHeader = document.createElement("h2");
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

//When I click on search
//The name is added to an array inside of localstorage.
//The max number of items in that array should be 5.
//If the array is full, kick out the last name on that array,
//Move all of my items in the array down one, and then add in the new item.
//Redraw the buttons
//The buttons will call getcityCoords on that button's text.
//Need event listeners for generated buttons.
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
    // api.openweathermap.org/data/2.5/forecast/daily?lat=44.34&lon=10.99&cnt=7&appid=
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
    weatherInfo.innerHTML = '';
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

    //Check if localStorage is full or not.
    //If localStorage is FULL (returns true or false)
    //Then remove the last and append the new thing
    // If it's NOT full, then we can simply unshift a name into the array.
    if(localStorageFullChecker){
        localStorageRemoveLastAppendNew(name);
    } else {

    }
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
        buttonBuilder(searchQueryText);
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
          //getWeather starts on line 143.
          return getWeather(cityName, cityCountry, cityLat, cityLon, cityState)
        });
    } else {
        //Condition for empty input box.
        console.log("Please input something in the text box!")
    }

    //

}

// let fuel = fetch("https://www.fueleconomy.gov/ws/rest/ympg/shared/ympgVehicle/26425", { headers: { Accept: 'application/json',}})
// .then(function (response) {

//      promise = response.json();
//     return promise;
// })
// .then(function (data){
//     console.log(data);
// });

//Listen for a click on the search button.
searchBtn.addEventListener("click", getCityCoords);
