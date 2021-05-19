import React, { useState } from 'react';
import style from './signupForm.module.css';
import { Link } from 'react-router-dom';

function SignupForm({ setCheckout, setInput, input }) {

    const [disabled, setDisabled] = useState(false);
    const [inputErrors, setInputErrors] = useState({});

    function handleInputChange(e) {

        let copyOfInputErrors = inputErrors;

        if (e.target.name === 'email') {
            const isEmail = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/g.test(e.target.value);
            copyOfInputErrors.email = !isEmail;
        } 

        if (e.target.name === 'password') {
            const hasEnoughLength = e.target.value.length < 6;
            copyOfInputErrors.password = hasEnoughLength;
        }

        setInput({
            ...input,
            [e.target.name]: e.target.value
        });

        setDisabled(copyOfInputErrors.password || copyOfInputErrors.email);
        setInputErrors(copyOfInputErrors);
    }

    return (
        <div id={style.signUpForm}>
            <span id={style.mainTitle}>Join Intervieww</span>
            <div className={style.inputDiv}>
                <span className={style.label}>Full name</span>
                <input onChange={(e) => handleInputChange(e)} name='name' className={style.signUpInput} placeholder='John Doe' />
            </div>
            <div className={style.inputDiv}>
                <span className={style.label}>E-Mail Adress</span>
                <input onChange={(e) => handleInputChange(e)} name='email' className={style.signUpInput} placeholder='johndoe@example.com' />
            </div>
            <div className={style.inputDiv}>
                <span className={style.label}>Password</span>
                <input type='password' onChange={(e) => handleInputChange(e)} name='password' className={style.signUpInput} placeholder='min. 6 characters' />
            </div>
            <span id={style.privacy} className={style.span}>By continuing, you agree to our <Link id={style.link}>Privacy Policy</Link></span>
            <button disabled={input.name && input.email && input.password && !disabled ? false : true} onClick={() => setCheckout(true)} id={style.checkoutBtn}>Proceed to checkout</button>
            <span className={style.span} id={style.login}>Already have an account? <Link to='login' id={style.loginLink}>Login</Link></span>
        </div>
    )
}

export default SignupForm;