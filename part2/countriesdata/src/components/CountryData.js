import React from "react";
import Flag from "./Flag";
import RedirectButton from "./RedirectButton";

const CountryData = ({ showCountryButton, countries }) => {
    if (countries.length > 10) {
        return <p>Too many matches, specify another filter</p>
    }
    if (countries.length > 1) {
        return (
            <>
                <ul>
                    {
                        countries.map( (country) => {
                            return (
                                <React.Fragment key={country.name.common}>
                                    <li>{country.name.common}</li>
                                    <RedirectButton showCountryButton={showCountryButton} country={country.name.common} />
                                </React.Fragment>
                            )
                        })
                    }
                </ul>
            </>
        )
    }
    if (countries.length === 1) {
        const country = countries[0]
        const languages = []
        for (let lan in country.languages) {
            languages.push(country.languages[lan])
        }
        return (
            <>
                <h2>{country.name.common}</h2>
                <p>capital {country.capital}</p>
                <p>area {country.area}</p>

                <h3>languages</h3>
                <ul>
                    {
                        languages.map(lang => <li key={lang}>{lang}</li>)
                    }
                </ul>

                <Flag url={country.flags.png} />
            </>
        )
    }
    return <p>Too many matches, specify another filter</p>
}

export default CountryData