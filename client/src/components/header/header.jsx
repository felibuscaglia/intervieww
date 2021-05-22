import * as React from 'react';
import style from './header.module.css';
import JoinBtn from '../joinBtn/joinBtn';
import UserMenu from '../userMenu/userMenu';
import Logo from '../../media/Logo.png';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { getSuggestions } from '../../redux/actions/index';

function Header({ fontColor, user, isUserProfile, setQuery, getSuggestions, query }) {

    if (window.location.pathname === '/signup') return null;

    function handleInputChange(e) {
        getSuggestions(e.target.value);
        setQuery(e.target.value);
    }

    return (
        <div id={style.header} className='justifyBetween'>
            <Link to='/' style={{ textDecoration: 'none', color: fontColor }}>
                <div className='alignCenter'>
                    <img alt='logo' id={style.logo} src={Logo} />
                    <h1>intervieww</h1>
                </div>
            </Link>
            <div className='alignCenter'>
                {isUserProfile && <input placeholder='Search...' value={query} onChange={(e) => handleInputChange(e)} id={style.searchInput} />}
                {user.name ? <UserMenu /> : <JoinBtn />}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getSuggestions: query => dispatch(getSuggestions(query))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);