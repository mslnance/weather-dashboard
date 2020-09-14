var locationFormEl = document.querySelector("#city-form");
var cityInputEl = document.querySelector("#cityname");
var currLocContainerEl = document.querySelector("#current-container");
var forcastLocContainerEl = document.querySelector("#forecast-container");
var locationSearchTerm = document.querySelector("#city-search-term");
var forcastContainerEl = document.querySelector("#forecast-cards");
var historyButtons = document.querySelector("#cty-buttons");

var getCityWeather = function(city) {
    var currentApiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city +"US&units=imperial&appid=7237e13bdfbbebde9cabfb6df127c7f2";
        
    fetch(currentApiUrl)
        .then(function(weatherResponse) {
            return weatherResponse.json();
        })
        .then(function(weatherResponse) {
            var lat =weatherResponse.coord.lat;
            var lon =weatherResponse.coord.lon;
            var oneCallUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=minutely,hourly&units=imperial&appid=7237e13bdfbbebde9cabfb6df127c7f2";
            return fetch(oneCallUrl);
        })
        .then(function(response) {
            if (response.ok) {
            return response.json();
            } 
        })
        .then(function(response) {
            if (response.length === 0) {
                console.log('There is no data for the city you selected');
            } else {
                displayWeather(response, city);
            }
    })
};

var displayCurWeather = function(allWeather, searchTerm) {
    var curIcon = allWeather.current.weather[0].icon;
    // create a div element to hold Icon
    var curIconDispEl = document.createElement("span");
    var curImg = document.createElement('img'); 
        
    curImg.src =  "http://openweathermap.org/img/wn/" + curIcon + "@2x.png";
    curIconDispEl.appendChild(curImg);
        
    var curDate = new Date(allWeather.current.dt *1000 );
    // clear old content
    currLocContainerEl.textContent = "";
    locationSearchTerm.textContent = searchTerm + " (" +  moment(curDate).format("l") + ")" ;
    var cityDispEl = document.createElement("h3"); 
    cityDispEl.classList = "subtitle";   
    // format current temp element
    var curTemp = allWeather.current.temp;
    var curHum = allWeather.current.humidity;
    var curWindSpeed = allWeather.current.wind_speed;
    var curUv = allWeather.current.uvi;
            
    var curWeatherEl = document.createElement("div");
    curWeatherEl.classList = "list-item flex-row justify-space-between align-center";
    
    // create a div element to hold temperature
    var curTempEl = document.createElement("div");
    curTempEl.classList = "padDiv col-12 col-md-8";

    var tempDispEl = document.createElement("span");
    tempDispEl.textContent = "Temperature: " + curTemp + " °F";
    //console.log(tempDispEl.textContent);

    // create a div element to hold Humidity
    var curHumEl = document.createElement("div");
    curHumEl.classList = "padDiv col-12 col-md-8";

    var humDispEl = document.createElement("span");
    humDispEl.textContent = "Humidity: " + curHum + "%";
    
    // create a div element to hold Wind Speed
    var curWindEl = document.createElement("div");
    curWindEl.classList = "padDiv col-12 col-md-8";
 
    var windDispEl = document.createElement("span");
    windDispEl.textContent = "Wind Speed: " + curWindSpeed + " MPH";
     
    // create a div element to hold UV Index
    var curUviEl = document.createElement("div");
    curUviEl.classList = "padDiv col-12 col-md-8";
    curUviEl.textContent = "UV Index: "
     
    var uviDispEl = document.createElement("span");
    uviDispEl.textContent=curUv ;
    uviDispEl.classList="corners";
    if (curUv <= 2) {
        uviDispEl.style.backgroundColor="var(--success)";
        
    } else if (curUv >=3 && curUv <6 ) {
        uviDispEl.style.backgroundColor="var(--warning)";  
    } else {
        uviDispEl.style.backgroundColor="var(--danger)"; 
    }

    // append to container
    curTempEl.appendChild(tempDispEl);
    curHumEl.appendChild(humDispEl);
    curWindEl.appendChild(windDispEl);
    curUviEl.appendChild(uviDispEl);
    curWeatherEl.appendChild(curTempEl);
    curWeatherEl.appendChild(curHumEl);
    curWeatherEl.appendChild(curWindEl);
    curWeatherEl.appendChild(curUviEl);
    // append container to the dom
    cityDispEl.appendChild(locationSearchTerm);
    cityDispEl.appendChild(curIconDispEl);
    currLocContainerEl.appendChild(cityDispEl);
    currLocContainerEl.appendChild(curWeatherEl);
}

var displayForecast = function(allWeather, searchTerm) {
    // clear old content
    forcastLocContainerEl.textContent = "";
    var secTitleDispEl = document.createElement("h3"); 
    secTitleDispEl.textContent= "5-Day Forecast:";
    secTitleDispEl.classList = "padDiv";
    var forCardEl = document.createElement("div"); 
    forCardEl.setAttribute("id","forecast-cards"); 
    forCardEl.classList = "row justify-space-between";
   
    for (i=1; i <= 5 ; i++) {
        var dailyDate = new Date(allWeather.daily[i].dt *1000 );
                        
        // format daily temp element
        var dlyTemp = allWeather.daily[i].temp.day;
        var dlyHum = allWeather.daily[i].humidity;
        var dlyIcon = allWeather.daily[i].weather[0].icon;
        //console.log(dlyIcon);       
        var dlyWeatherEl = document.createElement("div");
        dlyWeatherEl.classList = "card bg-primary ";

        // create a div element to hold temperature
        var dlyDateEl = document.createElement("h3");
        dlyDateEl.classList = "card-header bg-primary text-light";
        dlyDateEl.textContent = moment(dailyDate).format("l");
        
        var dlyCardEl = document.createElement("div");
        dlyCardEl.classList = "card-body bg-primary text-light";
        // create a div element to hold temperature
        var dlyTempEl = document.createElement("div");
        

        var tempDispEl = document.createElement("span");
        tempDispEl.textContent = "Temperature: " + dlyTemp + " °F";
       
        // create a div element to hold Humidity
        var dlyHumEl = document.createElement("div");
        var humDispEl = document.createElement("span");
        humDispEl.textContent = "Humidity: " + dlyHum + "%";
       
        // create a div element to hold Icon
        
        var dlyIconEl = document.createElement("div");
        var iconDispEl = document.createElement("span");
        var img = document.createElement('img'); 
        img.src =  "http://openweathermap.org/img/wn/" + dlyIcon + "@2x.png";
        
        // append to container
        dlyIconEl.appendChild(img);
        dlyTempEl.appendChild(tempDispEl);
        dlyHumEl.appendChild(humDispEl);
        dlyCardEl.appendChild(dlyIconEl); 
        dlyCardEl.appendChild(dlyTempEl);
        dlyCardEl.appendChild(dlyHumEl);
        dlyWeatherEl.appendChild(dlyDateEl);
        dlyWeatherEl.appendChild(dlyCardEl);
        forCardEl.appendChild(dlyWeatherEl);
        forcastLocContainerEl.appendChild(secTitleDispEl);
        forcastLocContainerEl.appendChild(forCardEl);
    }
}

function renderCity() {
    var city = localStorage.getItem("city");
    
    if (city === null) {
      return;
    }
  
    var cityButtonEl=document.createElement("button");
    cityButtonEl.textContent = city;
    cityButtonEl.classList = "cty-btn";
    cityButtonEl.setAttribute("data-city",city);
    historyButtons.appendChild(cityButtonEl);
}
  
//combine current and forecast info
var displayWeather = function(allWeather, searchTerm) {
    console.log(allWeather);
    console.log(searchTerm);
    localStorage.setItem("city", searchTerm);
    displayCurWeather(allWeather, searchTerm);
    displayForecast(allWeather, searchTerm);
    renderCity();
};

var formSubmitHandler = function(event) {
    event.preventDefault();

    // get value from input element
    var cityname = cityInputEl.value.trim();
   
    if (cityname) {
        getCityWeather(cityname);
        cityInputEl.value = "";
    } else {
     alert("Please enter a City");
    }
};

locationFormEl.addEventListener("submit", formSubmitHandler);

var buttonClickHandler = function(event) {
    var city = event.target.getAttribute("data-city");
    if (city) {
        getCityWeather(city);
    
      
    }
  };
  
  historyButtons.addEventListener("click", buttonClickHandler);