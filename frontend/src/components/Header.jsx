import React from "react";
import logo from "../images/logo.svg";
import { Link, useLocation } from "react-router-dom";
import burgerMenu from "../images/burger-menu.svg";
import closeMenu from "../images/close-menu.svg";

function Header({ isLoggedIn, email, onSignOut }) {
  const location = useLocation();
  // меню хедера
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  // хендлер меню 
  function handleClickOpenMobileMenu() {
    if (isLoggedIn) {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }
  }

  return (
    <>
      <div className={`mobile-menu ${isMobileMenuOpen && "mobile-menu_type_opened"}`} >
        <h2 className="mobile-menu__email">{email}</h2>
        <Link className="mobile-menu__exit" to={'/signin'} onClick={onSignOut}>Выйти</Link>
      </div>
      <div className="header">
        <img src={logo} alt="Место" className="header__logo" />
        {location.pathname === '/signin' && (
          <Link className='header__link' to={'/signup'}>Регистрация</Link>
        )}
        {location.pathname === '/signup' && (
          <Link className='header__link' to={'/signin'}>Вход</Link>
        )}
        {isLoggedIn && (
          <div className='header__text'>
            <div className='header__mail'>{email}</div>
            <Link className='header__link' to={'/signin'} onClick={onSignOut}>Выйти</Link>
          </div>
        )}
        {isLoggedIn && (
        <button className="header__menu-btn"
          type="button" 
          onClick={handleClickOpenMobileMenu}
          style={{ backgroundImage: `url(${isMobileMenuOpen ? closeMenu : burgerMenu})`
          }}
        />
        )}
      </div>
    </>
  );
}

export default Header;
