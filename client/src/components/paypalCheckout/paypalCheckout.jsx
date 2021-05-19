import * as React from 'react';
import style from './paypalCheckout.module.css';
import { PayPalButton } from 'react-paypal-button-v2';
import axios from 'axios';
import * as jwt from 'jsonwebtoken';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/index';
import { useHistory } from 'react-router-dom';
const { REACT_APP_PAYPAL_CLIENTID } = process.env;

function PaypalCheckout({ input, setUser }) {

    const history = useHistory();

    const paymentHandler = (details, data) => {
        const inputWithPayPalData = {
            ...input,
            payerID: data.payerID,
            orderID: data.orderID
        }
        axios.post ('/auth/register', inputWithPayPalData)
            .then (res => {
                const decodedUser = jwt.decode(res.data);
                setUser(decodedUser);
                history.push('/welcome');
            })
            .catch (err => console.log(err))
    }

    return (
        <div id={style.signUpForm}>
            <span id={style.mainTitle}>Join Intervieww</span>
            <div id={style.paypalContainer}>
                <PayPalButton
                    amount={19.99}
                    currency={'USD'}
                    onSuccess={paymentHandler}
                    shippingPreference={"NO_SHIPPING"}
                    options={{
                        clientId: REACT_APP_PAYPAL_CLIENTID
                    }}
                    style={{
                        color: 'black',
                        height: 35
                    }}
                />
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: user => dispatch(setUser(user))
    }
}

export default connect(null, mapDispatchToProps)(PaypalCheckout);