import React from 'react';
import { NavLink } from 'react-router-dom';


const LeftNav = () => {
    return (
        <div className='left-nav-container'>
            <div className='icons'>
                <div className='icons-bis'>
                    <NavLink to='/'  activeclassname='active-left-nav'>
                        <img src='./img/icons/home.svg'  alt='home' />
                    </NavLink>
                    <br />
                    <NavLink to='/trending'  activeclassname='active-left-nav'>
                        <img src='./img/icons/rocket.svg' alt='rocket' />
                    </NavLink>
                    <br />
                    <NavLink to='/profil'  activeclassname='active-left-nav'>
                        <img src='./img/icons/user.svg' alt='user' />
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;