import React from "react";

const RedirectButton = ({ showCountryButton, country }) => {
    return (
        <button onClick={showCountryButton} country={country}>show</button>
    )
}

export default RedirectButton