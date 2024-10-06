import { useState } from "react";
import axios from "axios";
import nationalities from "../data/nationalities.json"


export default function ExternalApi() {

  const [joke, setJoke] = useState(null);

  const [cat, setCat] = useState(null);

  const [name, setName] = useState("");
  const [nationality, setNationality] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [searchedName, setSearchedName] = useState("");

  // Funkce pro získání vtipu
  const getJoke = async () => {
    try {
    const config = { headers: { accept: "application/json" } };
    const response = await axios.get("https://icanhazdadjoke.com/", config);
    console.log(response.data);
    // Uložíme logo do stavu
    setJoke(response.data);
    } catch (error) {
    console.error("Errors:", error);
    }
  }

  // Vypsání vtipu, pokud je k dispozici
  const printJoke = () => {
    if (joke) {
      return <p>{joke.joke}</p>
    } else {
      return <p>Click the button to load a daddy joke!</p>;
    }
  };


  const fetchCat = async () => {
    try {
      const response = await axios.get("https://catfact.ninja/fact");
      setCat(response.data.fact);
    } catch (err) {
      console.log(err.message);
    }
  };

  const fetchNationality = async () => {
    if (name !== "") {
      try {
        const response = await axios.get(`https://api.nationalize.io/?name=${name}`);
        setNationality(response.data.country);
        setFetchError(null);
        setSearchedName(name);
        setName("");
      } catch (err) {
        setFetchError(err.message);
        console.log(err.message);
      }
    }
  }

  return (
    <div className="outerBox">
      <div className="innerBox">  
        <h2>External API</h2>
        <p>The first API fetches a random dad joke, the second provides a random cat fact, and the third evaluates the probability of a given name's origin in specific countries. The code uses the <span>await axios.get</span> method.</p>
        
        {/* Zobrazit vtip nebo text */}
        {printJoke()}
        
        {/* Tlačítko pro načtení vtipu */}
        <button onClick={getJoke}>Get joke</button>

        {cat ?
        <p>{cat}</p>
        :
        <p>Click the button to get a random fact about cat.</p>}
        <button onClick={fetchCat}>Get a random cat fact!</button>

        <div className="nameGuess">
          <label htmlFor="name">Write a name and search the nationalities!</label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <button onClick={fetchNationality}>Search!</button>
          {fetchError && <p style={{color: "red"}}>{fetchError}</p>}
          {
            nationality.length > 0 ?
            <div>
              <p>Searched name: {searchedName}</p>
              <ul>
                {nationality.map(nation => {
                  const countryName = nationalities.country[nation.country_id] || nation.country_id;
                  return <li>Country: {countryName}, probability: {Math.round(nation.probability * 10000) / 100} %</li>
                })}
              </ul>
            </div>
            :
            <p>No name yet.</p>
          }
        </div>
      </div>
    </div>
  );
}





