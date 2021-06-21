import * as React from 'react';
import style from './preview.module.css';
import PreviewActionsMenu from '../previewActions/previewActions';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

function Preview({ topic, mainColor, isProfile, setUserTopics, isPathPage, isCompleted, isHomepage }) {
    const questionsLengthRounder = !isProfile && !isPathPage ? Math.ceil(topic.questions.length / 10) * 10 : null;

    return (
        <div id={style.preview}>
            <Link style={{ textDecoration: 'none' }} to={isProfile || isHomepage ? '#' : `/topic/${topic.id}/questions`}>
                <div id={style.imgPreview} style={{ backgroundImage: `url(${topic.mainImage})` }}>
                    {isProfile && !isPathPage && <PreviewActionsMenu topic={topic} setUserTopics={setUserTopics} />}
                </div>
            </Link>
            <div style={{ color: mainColor || '#57585a' }}>
                <div className='alignCenter'>
                    <h2 id={style.title}>{topic.title}</h2>
                    {isCompleted && <FontAwesomeIcon id={style.icon} icon={faCheckCircle} />}
                </div>
                {(!isProfile && !isPathPage) && <h4 id={style.questionsCounter}>{questionsLengthRounder}+ questions</h4>}
            </div>
        </div>
    )
}

export default Preview;