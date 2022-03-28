import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import WeatherIcon from "./WeatherIcon";

const api_key_openweather = process.env.REACT_APP_API_KEY_OPENWEATHER

const Weather = ({ city }) => {

    const [coords, setCoords] = useState(
        {
            'lat': 0,
            'lon': 0
        }
    )

    const [weather, setWeather] = useState({})

    //retreive city coords, openweather needs coords, not city name
    useEffect(() => {
        const url = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&appid=${api_key_openweather}`;
        axios
            .get(url)
            .then(response => {
                const data = response.data[0]
                const newCoords = {
                    'lat': data.lat,
                    'lon': data.lon
                }
                setCoords(newCoords)
            })
    })

    //retreive coords weather
    useEffect(() => {
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lon}&units=metric&appid=${api_key_openweather}`;
        axios
            .get(url)
            .then(response => {
                const data = response.data
                const newWeather = {
                    'temperature': data.main.temp,
                    'weather': data.weather[0].description,
                    'weather_icon': data.weather[0].icon,
                    'wind': data.wind.speed
                }
                setWeather(newWeather)
            })
    })


    return (
        <>
            <h3>Weather in {city}</h3>
            <p>temperature {weather.temperature} °C</p>
            <WeatherIcon icon={weather.weather_icon} />
            <p>wind {weather.wind} m/s</p>
        </>
    )
}

export default Weather