let weather = {
    apiKey: "8e76c08f6853b9e32646ff40763c24e0",
    fetchWeather: function(zip){
        fetch(
        "http://api.openweathermap.org/data/2.5/weather?zip=" 
        + zip 
        + "&units=imperial&appid=" 
        + this.apiKey
        )
            .then((response) => response.json())
            .then((data)=> this.displayWeather(data));

    },
displayWeather: function(data) {
    const {name} = data;
    const {icon, description} = data.weather[0];
    const {temp, humidity} = data.main;
    const {speed} = data.wind;
    console.log(name, icon, description, temp, humidity, speed);
    document.querySelector(".city").innerText = "Weather in " + name;
    document.querySelector(".icon").src = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
    document.querySelector(".description").innerText = description;
    document.querySelector(".temp").innerText = temp + "°F";
    document.querySelector(".humidity").innerText = "Humidity " + humidity + "%";
    document.querySelector(".wind").innerText = "Wind speed: " + speed + " km/h";
    document.querySelector(".weather").classList.remove("loading");
},
search: function(){
    this.fetchWeather(document.querySelector(".searchbar").value);
}
};

document.querySelector(".search button")
        .addEventListener("click", function(){
        weather.search();
});

document.getElementById("search-bar")
        .addEventListener("keyup", function(event){
    if(event.key == "Enter"){
        weather.search();
    }
});

weather.fetchWeather("94566");