# Weather Dashboard

## Technology Used

| Technology Used         | Resource URL           |
| ------------- |:-------------:|
| HTML    | [https://developer.mozilla.org/en-US/docs/Web/HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) |
| CSS     | [https://developer.mozilla.org/en-US/docs/Web/CSS](https://developer.mozilla.org/en-US/docs/Web/CSS)      |
| Git | [https://git-scm.com/](https://git-scm.com/)     |
| JS  | [https://www.javascript.com/](https://www.javascript.com/)     |
| DayJS  | [https://day.js.org/](https://day.js.org/)     |
| OpenWeather  | [https://openweathermap.org/api](https://openweathermap.org/api)     |


## Description

[Visit the Deployed Site](https://dann-lam.github.io/04-02-2023-Quiz-Homework/)

This is a weather site that returns the forecast for the day, as well as a five day forecast.

When clicked, your city will be saved onto a favorites list that is stored on the local storage. You can have up to 5 favorites at the moment, with the last city on the list dropped for the newest one.

This was created to exercise the fundamentals of Javascript fetch requests for APIs, at the moment the 5 day forecast will return information forecasts for 3PM specifically.

It practices some of the other Javasript fundamentals, selecting of IDs, event listeners for buttons, local storage of items in favorites, dynamic object creation and appending, and logic for handling items coming from API calls.

Future features when I come back to this: Currently the API returns the top 5 search results for a given city. It would be nice if the search created a dropdown that returned those searches, so that if you choose a city with a name with the same name at a different location, the user is given that choice.

The styling is a bit scuffed, but it's functional for our purposes.


## Table of Contents


* [Usage](#usage)
* [Learning Points](#learning-points)
* [Credits](#credits)
* [License](#license)


## Usage

Simply insert your city in the search box, and click on the search box.

This will display your forecast along with a five day forecast.

The search will be saved as a button, you can save up to five buttons before the last favorite in the list is dropped in favor for a new one.



![Image of Application](https://raw.githubusercontent.com/dann-lam/04-08-2023-Weather-Dashboard/main/assets/better_demo.gif)



## Learning Points

I got great practice working with API requests and navigating the objects that they return.

Another thing I apppreciated was working with some of the challenges of working with objects in localStorage and the some of the logic behind how the buttons work.

I currently have somewhat of an unorthodox solution for grabbing the days from the five day forecast, and they're split into 3 hour segments. It's essentially looking for that day at specifically 3PM. This can be seen here:

But hey, it works. I think ideally next time I use the Unix code, I feel as if this would be a much cleaner official solution.

![Image of Code](https://raw.githubusercontent.com/dann-lam/04-08-2023-Weather-Dashboard/main/assets/funky_code.png)


## Credits

https://openweathermap.org/forecast5

## License

MIT License
