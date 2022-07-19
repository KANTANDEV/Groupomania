import React from 'react';
import Log from '../components/Log';
import UpdateProfil from '../components/Profil/UpdateProfil';


const Profil = () => {
    
    const verifco = document.cookie;
    return (
        <div className='profil-page'>
            {verifco ? (
                <UpdateProfil/>
            ) : (
            <div className='log-container'>
                <Log login={false} signup={true} />
                <div className='img-container'>
                    <img src='../img/log.svg' alt='log' />
                </div>
            </div>
            )}
        </div>
    );
};

export default Profil;