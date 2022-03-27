import { useState, useEffect } from "react";
import axios from 'axios'
import Form from "./components/Form";
import CountryData from "./components/CountryData";

const App = () => {

  const [filter, setFilter] = useState("")
  const [countries, setCountries] = useState([])

  useEffect(() => {
    if (filter.length === 0) {
      return
    }
    const url = `https://restcountries.com/v3.1/name/${filter}`;
    axios
      .get(url)
      .then(response => {
        setCountries(response.data)
      })
  }, [filter])

  const editFilter = (event) => {
    setFilter(event.target.value)
  }

  return (
    <>
      <Form onChange={ editFilter }/>
      <CountryData countries={countries} />
    </>
  )
}

export default App;