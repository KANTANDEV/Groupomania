import React, { useState } from 'react';
import LoginForm from './LoginForm';

const SignupForm = () => {
    const [formSubmit, setFormSubmit] = useState(false);
    const [pseudo, setPseudo] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [passwordConfirm, setPasswordConfirm] = useState();

    const handelSignup = (e) => {
        e.preventDefault();
        // Erreurs
        const pseudoError = document.getElementsByClassName('pseudo error');
        const emailError = document.getElementsByClassName('email error');
        const passwordError = document.getElementsByClassName('password error');
        const passwordConfirmError = document.getElementsByClassName('passwordConfirm error');
        // const terms = document.getElementsByClassName('terms');
        const termsError = document.getElementsByClassName('terms error');

        passwordConfirmError[0].innerHTML = '';
        termsError[0].innerHTML = '';
        passwordError[0].innerHTML = '';
        emailError[0].innerHTML = '';
        pseudoError[0].innerHTML = '';

        if (password !== passwordConfirm) {
            if (password !== passwordConfirm) {
                passwordConfirmError[0].innerHTML = 'Les mots de passe ne correspondent pas';
            }
        } else {
            fetch(`${process.env.REACT_APP_API_URL}api/user/signup`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        pseudo: pseudo,
                        email: email,
                        password: password
                    }),
                })
                .then(res => res.json())
                .then(data => {
                    if (data.errors) {
                        if (Object.values(data.errors).find(err => err.length)) {
                            if (data.errors.pseudo === "Pseudo incorrect ou déjà pris") {
                                pseudoError[0].innerHTML = data.errors.pseudo
                            }
                            if (data.errors.email === "Email incorrect") {
                                emailError[0].innerHTML = data.errors.email
                            }
                            if (data.errors === "Le mot de passe doit faire 6 caractères minimum") {
                                passwordError[0].innerHTML = data.errors
                            }
                        }
                    } else {
                        setFormSubmit(true);
                    }
                })
                .catch((err) => {

                })
        }

    }

    return (
        <>

            {formSubmit ? (
                <>
                    <LoginForm />
                    <span></span>
                    <h4 className='success'>Votre compte a bien été créé ! Veuillez-vous connecter</h4>
                </>
            ) : (
                <form action="" onSubmit={handelSignup} id="sign-up-form">
                    <label htmlFor="pseudo">Pseudo</label>
                    <br />
                    <input type="text" name='pseudo' id='pseudo' onChange={(e) => setPseudo(e.target.value)} value={pseudo || ''} />
                    <div className='pseudo error'></div>
                    <br />
                    <label htmlFor="email">Email</label>
                    <br />
                    <input type="text" name='email' id='email' onChange={(e) => setEmail(e.target.value)} value={email || ''} />
                    <div className='email error'></div>
                    <br />
                    <label htmlFor="password">Mot de passe</label>
                    <br />
                    <input type="password" name='password' id='password' onChange={(e) => setPassword(e.target.value)} value={password || ''} />
                    <div className='password error'></div>
                    <br />
                    <label htmlFor="passwordConfirm">Confirmation du mot de passe</label>
                    <br />
                    <input type="password" name='passwordConfirm' id='passwordConfirm' onChange={(e) => setPasswordConfirm(e.target.value) || ''} value={passwordConfirm || ''} />
                    <div className='passwordConfirm error'></div>
                    <br />
                    <input type="checkbox" name='terms' className="terms" required />
                    <label htmlFor="terms">J'accepte les <a href="/" target='_blank' rel='noopener noreferrer'>conditions d'utilisation</a></label>
                    <div className='terms error'></div>
                    <br />
                    <input type='submit' value='Valider Inscription' />
                </form>
            )}
        </>
    );
};

export default SignupForm;