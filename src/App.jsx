import { useState, useEffect, useRef } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css"
import { Outlet, NavLink } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';

function App() {


  //Hamburger Menu
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  //Pozadí pro wide navbar při scrollování
  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 20) {
      setIsScrolled(true);
    }
    else {
      setIsScrolled(false)
    };
  }

      // Přidání event listeneru při načtení komponenty
      useEffect(() => {
        window.addEventListener('scroll', handleScroll);

        // Čištění event listeneru při odchodu z komponenty
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);


  //Zavření hamburger menu při kliknutí na obrazovku
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
  }, []);



  return (
    <div>
      <ScrollToTop />
      <nav className={`nav ${isOpen ? 'open' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div ref={navRef} className={`nav-links ${isOpen ? 'show' : ''}`}>
          <NavLink to="/source-app/" end className={`navLink ${isScrolled ? "scrolled" : ""}`} onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/source-app/externalapi" className={`navLink ${isScrolled ? "scrolled" : ""}`} onClick={toggleMenu}>External API</NavLink>
          <NavLink to="/source-app/localstorage" className={`navLink ${isScrolled ? "scrolled" : ""}`} onClick={toggleMenu}>Local Storage</NavLink>
          <NavLink to="/source-app/registration" className={`navLink ${isScrolled ? "scrolled" : ""}`} onClick={toggleMenu}>Registration</NavLink>
          <NavLink to="/source-app/localapi" className={`navLink ${isScrolled ? "scrolled" : ""}`} onClick={toggleMenu}>Local Api</NavLink>
          <NavLink to="/source-app/management" className={`navLink ${isScrolled ? "scrolled" : ""}`} onClick={toggleMenu}>Status Management</NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
