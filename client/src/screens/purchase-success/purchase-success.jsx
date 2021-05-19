import * as React from 'react';
import style from './purchase-success.module.css';
import Header from '../../components/header/header';
import Confetti from 'react-confetti';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

function PurchaseSuccess({ user }) {
    return (
        <div>
            <Header fontColor={ '#003e4f' } />
            <Confetti numberOfPieces={50} />
            <div id={style.welcomeSpan}>
                <span>
                    Welcome on board, {user.name}! <br />
                    You are one step closer to getting the job you deserve
                </span>
                <Link to='/' id={style.link}>
                    <button id={style.startBtn}>Start practicing</button>
                </Link>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(PurchaseSuccess);