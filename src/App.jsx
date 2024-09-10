import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css"
import { Outlet, NavLink } from 'react-router-dom'
import ScrollToTop from './ScrollToTop';

function App() {


  //Hamburger Menu
  const [isOpen, setIsOpen] = useState(false);

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


  return (
    <div>
      <ScrollToTop />
      <nav className={`nav ${isOpen ? 'open' : ''} ${isScrolled ? 'scrolled' : ''}`}>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
        <div className={`nav-links ${isOpen ? 'show' : ''}`}>
          <NavLink to="/source-app/" end className="navLink" onClick={toggleMenu}>Home</NavLink>
          <NavLink to="/source-app/about" className="navLink" onClick={toggleMenu}>About</NavLink>
          <NavLink to="/source-app/contact" className="navLink" onClick={toggleMenu}>Contact</NavLink>
        </div>
      </nav>
      <Outlet />
    </div>
  )
}

export default App
