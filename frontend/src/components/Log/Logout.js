import React from 'react';
import cookie from 'js-cookie';

const Logout = () => {

    const removeCookie = (key) => {
        if(window !== undefined) {
            cookie.remove(key, {expires: 1});
        }
    }

    const logout =  () => {
        fetch(`${process.env.REACT_APP_API_URL}api/user/logout`,
        {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include',
        })
        .then(res => res.json())
        .then(() => removeCookie('token'))
        .then(() => window.location = '/')
        .catch(err => console.log(err));
    }
    return (
        <li onClick={logout}>
            <img src="./img/icons/logout.svg" alt="logout" />
        </li>
        
    );
};

export default Logout;