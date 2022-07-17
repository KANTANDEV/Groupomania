import React from 'react';
import { NavLink } from 'react-router-dom';
import Logout from './Log/Logout';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const verifco = document.cookie;
    const userData = useSelector((state) => state.userReducer);

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink to="/">
                        <div className='logo'>
                            <img src="./img/icon.png" alt="icon" />

                        </div>
                    </NavLink>
                </div>
                {verifco ? (
                    <ul>
                        <li></li>
                        <li className='welcome'>
                            <NavLink to="/profil">
                                <h5>Bienvenue {userData.pseudo}</h5>
                            </NavLink>
                        </li>
                        <Logout />
                    </ul>
                ) : (
                    <ul>
                        <li></li>
                        <NavLink to="/profil">
                            <img src="./img/icons/login.svg" alt="login" />
                        </NavLink>
                    </ul>
                )}
            </div>
        </nav>
    );
};

export default Navbar;