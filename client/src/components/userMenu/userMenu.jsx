import * as React from 'react';
import style from './userMenu.module.css';
import { Dropdown } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import UserAvatar from '../../media/userAvatar.png';
import { logOut } from '../../redux/actions/index';
import { useHistory } from 'react-router-dom';

function UserMenu({ logOut }) {

    const history = useHistory();

    function logUserOut() {
        logOut();
        history.push('/');
    }

    return (
        <Dropdown>
            <Dropdown.Toggle variant='success' id={style.dropdownToggle}>
                <div id={style.userAvatar} style={{ backgroundImage: `url(${UserAvatar})` }}></div>
            </Dropdown.Toggle>
            <Dropdown.Menu>
                <Dropdown.Item onClick={logUserOut} className={style.dropdownItem}>Log out</Dropdown.Item>
                <Dropdown.Item className={style.dropdownItem}><Link className={style.link} to='/profile'>Your learning paths</Link></Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        logOut: () => dispatch(logOut())
    }
}

export default connect(null, mapDispatchToProps)(UserMenu);