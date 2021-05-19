import React, { useState } from 'react';
import style from './previewActions.module.css';
import * as axios from 'axios';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { removeUserTopic, setUser, displayToast } from '../../redux/actions/index';

function PreviewActionsMenu({ topic, setUserTopics, user, removeUserTopic, displayToast }) {

    const [isOnList, setIsOnList] = useState(false);

    async function removeTopic() {
        const filteredTopics = user.topics.filter(userTopics => userTopics.id !== topic.id);
        setUserTopics(filteredTopics);
        removeUserTopic(filteredTopics);
        await axios.delete(`/user/${user.id}/topic/${topic.id}`)
    }

    async function addToList() {
        try {
            const userWithUpdatedList = await axios.post(`/user/${user.id}/list`, { topicId: topic.id });
            setUserTopics(userWithUpdatedList.data.topics);
            setIsOnList(true);
            setUser(userWithUpdatedList);
        } catch (err) {
            displayToast(true);
        }
    }

    return (
        <Dropdown drop={'left'} id={style.dropdown}>
            <Dropdown.Toggle id={style.dropdownToggle}>
                <FontAwesomeIcon id={style.ellipsis} icon={faEllipsisV} />
            </Dropdown.Toggle>
            <Dropdown.Menu >
                <Dropdown.Item className={style.dropdownItem}><Link className={style.link} to={`topic/${topic.id}/questions`}>Continue</Link></Dropdown.Item>
                <Dropdown.Item onClick={removeTopic} className={style.dropdownItem}>Delete</Dropdown.Item>
                <Dropdown.Item onClick={addToList} className={style.dropdownItem}> {isOnList ? 'Remove from my list' : 'Add to my list'}</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        removeUserTopic: topics => dispatch(removeUserTopic(topics)),
        displayToast: boolean => dispatch(displayToast(boolean))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(PreviewActionsMenu);