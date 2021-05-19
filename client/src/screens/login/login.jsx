import React from 'react';
import style from '../signup/signup.module.css';
import { Link } from 'react-router-dom';
import LoginForm from '../../components/loginForm/loginForm';
import Logo from '../../media/Logo.png';

function Login() {
    return (
        <div>
            <div id={style.signupHeader} className='justifyBetween'>
                <img alt='logo' id={style.logo} src={Logo} />
                <Link to='login'><button id={style.loginBtn}>Sign up</button></Link>
            </div>
            <div id={style.mainDiv}>
                <LoginForm />
                <div id={style.prosDivLogin}></div>
            </div>
        </div>
    )
}

export default Login;