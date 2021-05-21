import * as React from 'react';
import style from './selectedTopic.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function SelectedTopic({ topic, setSelectedTopics, selectedTopics }) {

    function removeTopic(topicId) {
        const filteredTopics = selectedTopics.filter(topic => topic.id !== topicId);
        setSelectedTopics(filteredTopics);
    }

    return (
        <div id={style.selectedTopic}>
            <FontAwesomeIcon onClick={() => removeTopic(topic.id)} id={style.icon} icon={faTimesCircle} />
            <span>{topic.label}</span>
        </div>
    )
}

export default SelectedTopic;