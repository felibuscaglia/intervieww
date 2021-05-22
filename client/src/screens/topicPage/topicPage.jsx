import React, { useState, useEffect } from 'react';
import style from './topicPage.module.css';
import Header from '../../components/header/header';
import Question from '../../components/question/question';
import TopicActions from '../../components/topicActions/topicActions';
import * as axios from 'axios';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import { Accordion } from 'react-bootstrap';
import { getBrightness } from '../../utils';
import { addTopicToUser } from '../../redux/actions/index';

function TopicPage({ topicId, addTopicToUser, user }) {
    const [topic, setTopic] = useState({});
    const [completedQuestions, setCompletedQuestions] = useState([]);
    const [colorBrightness, setColorBrightness] = useState(null);
    const [state, setState] = useState(false);

    useEffect(() => {
        axios.get(`/topic/${topicId}`)
            .then(topic => {
                setTopic(topic.data);
                setColorBrightness(getBrightness(topic.data.color));
                const topicFound = user.topics.find(userTopics => userTopics.id === Number(topicId));
                setState(topicFound.userXtopics.state);
            })
            .catch(err => console.log(err));

        if (user.name) {
            axios.get(`/user/${user.id}/${topicId}/completedQuestions`)
                .then(completedQuestions => setCompletedQuestions(completedQuestions.data))
                .catch(err => console.log(err));
        }
    }, [topicId, user.topics, user.id, user.name]);

    function startTopic() {
        addTopicToUser({ topic: topicId, user: user.id });
        setState('isStarted');
    }

    return (
        <div>
            <Header fontColor={colorBrightness} />
            <div style={{ backgroundColor: topic.color, color: colorBrightness, height: (!user.name || state === 'isStarted') ? '570px' : '100%' }} id={style.cover}>
                <div id={style.topicImg} style={{ backgroundImage: `url(${topic.mainImage})` }}></div>
                <h1>{topic.title}</h1>
                <div id={style.statsDiv}>
                    <div className={style.innerStats}>
                        <h2 className={style.statTitle}>{topic.famousApps}</h2>
                        <span className={style.infoSpan}>Who uses it?</span>
                    </div>
                    <div className={style.innerStats}>
                        <h2 className={style.statTitle}>
                            <NumberFormat displayType={'text'} value={topic.averageSalary} thousandSeparator={true} suffix={'+'} />
                        </h2>
                        <span className={style.infoSpan}>Job openings</span>
                    </div>
                    <div className={style.innerStats}>
                        <h2 className={style.statTitle}>
                            <NumberFormat displayType={'text'} value={topic.averageSalary} thousandSeparator={true} prefix={'$'} />
                        </h2>
                        <span className={style.infoSpan}>Average salary for a {topic.name} developer</span>
                    </div>
                </div>
                {(user.name && state !== 'isStarted') && <button onClick={startTopic} id={style.startPractice} style={{ color: colorBrightness, border: `1px solid ${colorBrightness}` }}>
                 {state === 'isFinished' ? `Practice again` : `Start your ${topic.title} journey`}
                </button>}
            </div>
            {   (!user.name || state === 'isStarted') &&
                <Accordion id={style.questionsDiv}>
                    {topic.questions && topic.questions.map((question, index) => {
                        let isCompleted = user.name ? false : undefined;
                        if (completedQuestions.length) isCompleted = Boolean(completedQuestions.find(completedQuestion => completedQuestion.id === question.id));
                        return <Question topic={topic} isCompleted={isCompleted} question={question} index={index} key={index} />;
                    })}
                </Accordion>
            }
            {(user.name && state === 'isStarted') && <TopicActions topic={topic} fontColor={colorBrightness} userId={user.id} />}
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
        addTopicToUser: ids => dispatch(addTopicToUser(ids))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TopicPage);