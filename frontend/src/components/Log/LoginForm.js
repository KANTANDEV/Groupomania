import React, { useState } from 'react';


const LoginForm = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();

    const handelLogin = (e) => {
        const emailError = document.getElementsByClassName('email error');
        const passwordError = document.getElementsByClassName('password error');
        e.preventDefault();
    
        fetch(`${process.env.REACT_APP_API_URL}api/user/login`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                credentials: 'include',
                body : JSON.stringify({
                    email: email,
                    password: password
                }),
            })
            .then(res => res.json())
            .then(data => {
                emailError[0].innerHTML = '';
                passwordError[0].innerHTML = '';
                if (data.error === 'Email invalide') {
                    console.log(data.error);
                    emailError[0].innerHTML = data.error
                } else if (data.error === 'Mot de passe invalide') {
                    console.log(data.error)
                    passwordError[0].innerHTML = data.error
                }
                 else {
                    window.location = '/';
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }



    return (
        <form action="" onSubmit={handelLogin} id="sign-up-form">
            <label htmlFor="email">Email</label>
            <br />
            <input type="text" name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email || ''} />
            <div className='email error'></div>
            <br />
            <label htmlFor="password">Mot de passe</label>
            <br />
            <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value) || ''} value={password || ''} />
            <div className='password error'></div>
            <br />
            <input type='submit' value='Se Connecter' />
        </form>
    );
};

export default LoginForm;