import React, { useState } from 'react';
import style from '../signupForm/signupForm.module.css';
import * as axios from 'axios';
import { Link } from 'react-router-dom';
import * as jwt from 'jsonwebtoken';
import { setUser } from '../../redux/actions/index';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function LoginForm({ setUser }) {

    const[input, setInput] = useState({});
    const history = useHistory();

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    }

    function login() {
        axios.post('/auth/login', input)
            .then (userToken => {
                const userDecoded = jwt.decode(userToken.data);
                setUser(userDecoded);
                history.push('/');
            })
            .catch(err => console.log(err));
    }

    return (
        <div id={style.signUpForm}>
            <span id={style.mainTitle}>Welcome back!</span>
            <div className={style.inputDiv}>
                <span className={style.label}>E-Mail Adress</span>
                <input onChange={(e) => handleInputChange(e)} name='email' className={style.signUpInput} placeholder='johndoe@example.com' />
            </div>
            <div className={style.inputDiv}>
                <span className={style.label}>Password</span>
                <input type='password' onChange={(e) => handleInputChange(e)} name='password' className={style.signUpInput} placeholder="Your supersecret password" />
            </div>
            <span id={style.privacy} className={style.span}><Link id={style.link}>Forgot your password? Don't worry, click here</Link></span>
            <button id={style.checkoutBtn} onClick={ login }>Login</button>
            <span className={style.span} id={style.login}>Don't have an account? <Link to='/signup' id={style.loginLink}>Sign up!</Link></span>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: user => dispatch(setUser(user))
    }
}

export default connect(null, mapDispatchToProps)(LoginForm);