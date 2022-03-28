import React from "react";

const WeatherIcon = ({ icon }) => {
    const src = `http://openweathermap.org/img/wn/${icon}@2x.png`
    return (
        <img src={src} alt='weather icon' />
    )
}

export default WeatherIcon