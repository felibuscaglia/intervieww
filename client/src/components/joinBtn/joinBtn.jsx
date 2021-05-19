import * as React from 'react';
import style from './joinBtn.module.css';
import { Link } from 'react-router-dom';

function JoinBtn() {
    return (
        <Link to='/signup'>
            <button id={style.joinBtn}>Join now</button>
        </Link>
    )
}

export default JoinBtn;