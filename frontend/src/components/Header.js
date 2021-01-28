import React from 'react';
import Logo from "../images/logo.svg";
import {Link} from "react-router-dom";

function Header({loggedIn, onSignOut, email}) {

    return (
        <header className="header">
            <img src={Logo} alt="Логотип" className="header__logo"/>
            {loggedIn && (
                <>
                    <div className="header_email">{email}</div>
                    <div onClick={onSignOut} className="login__link logout__link">Выйти</div>
                </>
            )}

        </header>
    )
}

export default Header;