import * as React from 'react';
import style from '../purchase-success/purchase-success.module.css';
import Header from '../../components/header/header';
import qs from 'qs';
import * as Confetti from 'react-confetti';
import { Link } from 'react-router-dom';

function FinishTopic({ location }) {
    const finishedTopic = qs.parse(location.search, { ignoreQueryPrefix: true }).topic;

    return (
        <div>
            <Header fontColor={'#003e4f'} />
            <Confetti numberOfPieces={50} />
            <div id={style.welcomeSpan}>
                <span>
                    Congratulations!<br />
                    You finished your {finishedTopic} journey!
                </span>
                <Link to='/profile' id={style.link}>
                    <button id={style.startBtn}>Keep practicing</button>
                </Link>
            </div>
        </div>
    )
}

export default FinishTopic;