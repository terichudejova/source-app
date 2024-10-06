import React, { useState, useRef, useEffect } from 'react';
import "./FormularComponent.css";
import CloseIcon from '@mui/icons-material/Close';
import CheckIcon from '@mui/icons-material/Check';
import axios from 'axios';


const FormularComponent = () => {
    const focusRef = useRef();
    const [short, setShort] = useState('');
    const [long, setLong] = useState('');
    const [options, setOptions] = useState('');

    useEffect(() => {
        focusRef.current.focus();
    }, [])

    const handleSubmit = async (e) => {
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
        try {
            await fetch (finalUrl, {method: "GET", mode: "no-cors"});
            alert('Thank you for filling the form.');
            setShort(''); 
            setLong(''); 
            setOptions('');
        } catch (err) {
            console.error('Error occurred:', err);
        }

    };

    /// REGISTRAČNÍ FORMULÁŘ
    const REG_URL = "http://localhost:4000/users";

    const USER_REGEX = /^[A-Z][A-Za-z0-9]{3,23}$/;
    const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[.!@#$%^&*])[A-Za-z\d.!@#$%^&*]{9,24}$/;

    const [user, setUser] = useState("");
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState("");
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState("");
    const [validMatch, setValidMatch] = useState(false);
    const [matchPwdFocus, setMatchPwdFocus] = useState(false);

    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidName(USER_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
    }, [pwd])

    useEffect(() => {
        if (pwd === matchPwd && pwd !== "") {
            setValidMatch(true);
        } else {
            setValidMatch(false);
        }
    }, [pwd, matchPwd])

    const handleRegistration = async (e) => {
        e.preventDefault();
        if (validName && validPwd && matchPwd && validMatch) {
            try {
                const newUser = {username: user, password: pwd};
                const response = await axios.post(REG_URL, newUser);
            } catch (err) {
                console.log(err.message);
            }
            setSuccess(true);
            setUser("");
            setPwd("");
            setMatchPwd("");
        } else {
            setSuccess(false);
        }

    }

    return (
        <main>
            <form onSubmit={handleSubmit} className="formularObject">
                
                <label htmlFor="short" className="label">Text input:</label>
                <input
                    type="text"
                    id="short"
                    name="short"
                    value={short}
                    onChange={(e) => setShort(e.target.value)}
                    required
                    className="inputStyle"
                    ref={focusRef}
                />

                <label htmlFor="long" className="label">Text area:</label>
                <textarea
                    type="text"
                    id="long"
                    name="long"
                    value={long}
                    onChange={(e) => setLong(e.target.value)}
                    required
                    className="textArea"
                />

                <label htmlFor="options" className="label">Options selection:</label>
                <select
                    id="options"
                    name="options"
                    value={options}
                    onChange={(e) => setOptions(e.target.value)}
                    required
                    className="inputStyle"
                >
                    <option value="" disabled>Choose an option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Maybe">Maybe</option>
                </select>

                <button type="submit" className="formularButton">Send</button>
            </form>

            {/* REGISTRAČNÍ FORMULÁŘ */}

            {success ?
            <p>Registration was successful!</p>
            :
            <form className="formularObject" onSubmit={handleRegistration}>
                <label htmlFor='username' className="label">
                    {!validName && <CloseIcon style={{color: "red", fontSize: "30px"}}/>}
                    {validName && <CheckIcon style={{color: "limegreen", fontSize: "30px"}}/>}
                    Username:
                </label>
                <input
                    id='username'
                    name='username'
                    required
                    value={user}
                    onChange={(e) => setUser(e.target.value)}
                    autoComplete='off'
                    aria-labelledby='username'
                    className="inputStyle"
                    type='text'
                    onFocus={() => setUserFocus(true)}
                    onBlur={() => setUserFocus(false)}
                />
                {
                    userFocus && user.length > 0 && !validName &&
                    <div className="instructions">
                        <p> - capital first letter<br/>
                            - only letters and numbers<br/>
                            - min: 4 characters, max: 24 characters</p>
                    </div>
                }
                <label htmlFor='pwd' className="label">
                    {!validPwd && <CloseIcon style={{color: "red", fontSize: "30px"}}/>}
                    {validPwd && <CheckIcon style={{color: "limegreen", fontSize: "30px"}}/>}
                    Password:
                </label>
                <input
                    id='pwd'
                    name='pwd'
                    required
                    value={pwd}
                    onChange={(e) => setPwd(e.target.value)}
                    autoComplete='off'
                    aria-labelledby='pwd'
                    className="inputStyle"
                    type='password'
                    onFocus={() => setPwdFocus(true)}
                    onBlur={() => setPwdFocus(false)}
                />
                {
                    pwdFocus && pwd.length > 0 && !validPwd &&
                    <div className="instructions">
                        <p> - 1 capital letter<br/>
                            - 1 lower letter<br/>
                            - 1 number<br/>
                            - 1 special character<br/>
                            - min: 9 characters, max: 24 characters</p>
                    </div>
                }
                <label htmlFor='matchPwd' className='label'>
                    {validMatch && validPwd ?
                    <CheckIcon style={{color: "limegreen", fontSize: "30px"}}/>
                    :
                    <CloseIcon style={{color: "red", fontSize: "30px"}}/>}
                    Confirm password:
                </label>
                <input
                    id='matchPwd'
                    name='matchPwd'
                    aria-labelledby='matchPwd'
                    required
                    type='password'
                    className='inputStyle'
                    value={matchPwd}
                    onChange={(e) => setMatchPwd(e.target.value)}
                    autoComplete='off'
                    onFocus={() => setMatchPwdFocus(true)}
                    onBlur={() => setMatchPwdFocus(false)}
                />
                {
                    matchPwdFocus && matchPwd.length > 0 && !validMatch &&
                    <p className="instructions">The passwords must match.</p>
                }
                <button disabled={!validName || !validPwd || !validMatch ? true : false} className="formularButton">Sign Up!</button>
            </form>
            }
        </main>
        
    );
};

export default FormularComponent;
