import React, { useState } from 'react';
import SignupForm from './SignupForm';
import LoginForm from './LoginForm';

const Log = ( props ) => {
    const [signUpModal, setSignUpModal] = useState(props.signup);
    const [LoginModal, setLoginModal] = useState(props.login);

    const handelModals = (e) => {
        if (e.target.id === "register") {
            setSignUpModal(true);
            setLoginModal(false);
        } else if (e.target.id === "login") {
            setSignUpModal(false);
            setLoginModal(true);
        }
    }

    return (
        <div className='connection-form'>
            <div className='form-container'>
                <ul>
                    <li onClick={handelModals} id='register' className={signUpModal ? "active-btn" : null}>S'inscrire</li>
                    <li onClick={handelModals} id='login' className={LoginModal ? "active-btn" : null}>Se Connecter</li>
                </ul>
                {signUpModal && <SignupForm />}
                {LoginModal && <LoginForm />}
            </div>
        </div>
    );
};

export default Log;