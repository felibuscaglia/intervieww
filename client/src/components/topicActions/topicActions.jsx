import React, { useEffect } from 'react';
import style from './topicActions.module.css';
import Toast from '../toast/toast';
import { Dropdown } from 'react-bootstrap';
import * as axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { setUser, displayToast } from '../../redux/actions/index';

function TopicActions({ topic, fontColor, userId, setUser, setDisplayToast }) {
    const history = useHistory();

    useEffect(() => {
        return function cleanup() {
            setDisplayToast(false);
        }
    }, [])

    function endTopic() {
        axios.post(`/user/${userId}/${topic.id}/removeTopic`)
            .then(res => {
                setUser(res.data);
                history.push(`/finish?topic=${topic.title}`);
            })
            .catch(err => setDisplayToast(true));
    }

    return (
        <Dropdown>
            <Dropdown.Toggle style={{ background: topic.color, color: fontColor }} id={style.dropdownToggle}>
                <FontAwesomeIcon icon={faEllipsisH} />
            </Dropdown.Toggle>
            <Dropdown.Menu id={style.dropdownMenu}>
                <Dropdown.Item onClick={endTopic} className={style.dropdownItem}>Finish your {topic.title} journey</Dropdown.Item>
            </Dropdown.Menu>
            <Toast
                position={'left'}
                header={`You haven't finished your ${topic.title} journey`}
                body={'You need to complete all the questions.'}
            />
        </Dropdown>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        setUser: user => dispatch(setUser(user)),
        setDisplayToast: boolean => dispatch(displayToast(boolean))
    }
}

export default connect(null, mapDispatchToProps)(TopicActions);