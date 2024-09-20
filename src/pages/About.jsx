import { useState } from "react";
import axios from "axios";

export default function About() {
  // Stav pro ukládání vtipu
  const [joke, setJoke] = useState(null);

  // Funkce pro získání vtipu
  async function getJoke() {
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

  return (
    <div className="outerBox">
      <div className="innerBox">  
        <h2>About</h2>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magni doloribus nulla dignissimos praesentium tenetur porro? Ducimus totam voluptas ea error, laboriosam dolores ab inventore quis aliquam nisi mollitia nulla! Inventore?</p>
        
        {/* Zobrazíme vtip nebo text */}
        {printJoke()}
        
        {/* Tlačítko pro načtení vtipu */}
        <button onClick={getJoke}>Get joke</button>
      </div>
    </div>
  );
}
