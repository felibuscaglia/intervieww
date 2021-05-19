import React, { useState } from 'react';
import style from './signup.module.css';
import { Link } from 'react-router-dom';
import SignupForm from '../../components/signupForm/signupForm';
import PaypalCheckout from '../../components/paypalCheckout/paypalCheckout';
import Logo from '../../media/Logo.png';

function Signup() {

    const [checkout, setCheckout] = useState(false);
    const [input, setInput] = useState({});

    return (
        <div>
            <div id={style.signupHeader} className='justifyBetween'>
                <img alt='logo' id={style.logo} src={Logo} />
                <Link to='login'><button id={style.loginBtn}>Login</button></Link>
            </div>
            <div id={style.mainDiv}>
                {!checkout ?
                    <SignupForm input={input} setInput={setInput} setCheckout={setCheckout} /> :
                    <PaypalCheckout input={input} />
                }
                <div id={style.prosDiv}></div>
            </div>
        </div>
    )
}

export default Signup;