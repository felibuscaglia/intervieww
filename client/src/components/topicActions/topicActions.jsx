import React, { useState } from 'react';
import style from './topicActions.module.css';
import Toast from '../../components/leftToast/leftToast';
import { Dropdown } from 'react-bootstrap';
import * as axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser } from '../../redux/actions/index';

function TopicActions({ topic, fontColor, userId, setUser }) {
    const [displayToast, setDisplayToast] = useState(false);
    const history = useHistory();

    function endTopic() {
        axios.post(`/user/${userId}/${topic.id}/removeTopic`)
            .then(res => {
                setUser(res.data);
                history.push(`/finish?topic=${topic.title}`);
            })
            .catch(err => {
                setDisplayToast(true);
                setTimeout(() => setDisplayToast(false), 2000);
            })
    }

    return (
        <Dropdown>
            <Dropdown.Toggle style={{ background: topic.color, color: fontColor }} id={style.dropdownToggle}>
                <FontAwesomeIcon icon={faEllipsisH} />
            </Dropdown.Toggle>
            <Dropdown.Menu id={style.dropdownMenu}>
                <Dropdown.Item onClick={endTopic} className={style.dropdownItem}>Finish your {topic.title} journey</Dropdown.Item>
            </Dropdown.Menu>
            <Toast topic={topic} fontColor={fontColor} displayToast={displayToast} />
        </Dropdown>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: user => dispatch(setUser(user))
    }
}

export default connect(null, mapDispatchToProps)(TopicActions);