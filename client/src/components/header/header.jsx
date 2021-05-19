import * as React from 'react';
import style from './header.module.css';
import JoinBtn from '../joinBtn/joinBtn';
import UserMenu from '../userMenu/userMenu';
import Logo from '../../media/Logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

function Header({ fontColor, user }) {

    if (window.location.pathname === '/signup') return null;

    return (
        <div id={style.header} className='justifyBetween'>
            <Link to='/' style={{ textDecoration: 'none', color: fontColor }}>
                <div className='alignCenter'>
                    <img alt='logo' id={style.logo} src={Logo} />
                    <h1>intervieww</h1>
                </div>
            </Link>
            {user.name ? <UserMenu /> : <JoinBtn />}
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect (mapStateToProps, null)(Header);