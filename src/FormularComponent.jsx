import React, { useState } from 'react';
import "./FormularComponent.css";


const FormularComponent = () => {
    const [short, setShort] = useState('');
    const [long, setLong] = useState('');
    const [options, setOptions] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Zakódování hodnot
        const encodedShort = encodeURIComponent(short);
        const encodedLong = encodeURIComponent(long);
        const encodedOptions = encodeURIComponent(options);

        // URL Google Formuláře s ID pro každé pole
        const googleFormUrl = "https://docs.google.com/forms/d/e/1FAIpQLSflRICMJQ6pnCOuKEmZj8bUMsy-c3hn4JZwVq4-yaAVt2RmuQ/formResponse";
        const queryString = `?entry.1590673237=${encodedShort}&entry.1874192012=${encodedLong}&entry.229495312=${encodedOptions}`;
        const finalUrl = googleFormUrl + queryString;

        // Odeslání GET požadavku
        fetch(finalUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            mode: 'no-cors', // Google Forms neodpovídá, ale odeslání funguje
        })
            .then(() => {
                alert('Děkujeme za vyplnění formuláře.');
                setShort(''); 
                setLong(''); 
                setOptions('');
            })
            .catch((error) => {
                console.error('Chyba při odesílání formuláře:', error);
            });
    };

    return (
        <form onSubmit={handleSubmit} className="formularObject">
            
            <label htmlFor="short" className="label">Stručná odpověď:</label>
            <input
                type="text"
                id="short"
                name="short"
                value={short}
                onChange={(e) => setShort(e.target.value)}
                required
                className="inputStyle"
            />

            <label htmlFor="long" className="label">Odstavec:</label>
            <textarea
                type="text"
                id="long"
                name="long"
                value={long}
                onChange={(e) => setLong(e.target.value)}
                required
                className="textArea"
            />

            <label htmlFor="options" className="label">Výběr možností:</label>
            <select
                id="options"
                name="options"
                value={options}
                onChange={(e) => setOptions(e.target.value)}
                required
                className="inputStyle"
            >
                <option value="" disabled>Vyberte možnost</option>
                <option value="Ano">Ano</option>
                <option value="Ne">Ne</option>
                <option value="Možná">Možná</option>
            </select>

            <button type="submit" className="formularButton">Odeslat</button>
        </form>
    );
};

export default FormularComponent;
