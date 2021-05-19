import React, { useEffect, useState } from 'react';
import style from '../topicPage/topicPage.module.css';
import Header from '../../components/header/header';
import Preview from '../../components/preview/preview';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { getBrightness } from '../../utils';

function PathPage({ pathId, user }) {
    const [path, setPath] = useState({});
    const [colorBrightness, setColorBrightness] = useState(null);
    const [completedTopics, setCompletedTopics] = useState(0);

    useEffect(() => {
        axios.get(`/path/${pathId}`)
            .then(learningPath => {
                const response = learningPath.data;
                setPath(response);
                setColorBrightness(getBrightness(response.mainColor));
                const completedTopics = user.topics.filter(topic => response.topics.find(pathTopic => pathTopic.id === topic.id));
                setCompletedTopics(completedTopics.length);
            })
            .catch(err => console.log(err))
    }, [pathId, user.topics]);


    return (
        <div style={{ background: path.mainColor }} id={style.pathMainDiv}>
            <Header fontColor={colorBrightness} />
            <div id={style.pathCover} style={{ color: colorBrightness }}>
                <div id={style.topicImg} style={{ backgroundImage: `url(${path.mainImage})` }}></div>
                <h1>{path.title}</h1>
                <div id={style.topicsDiv} style={{ color: colorBrightness }}>
                    {path.topics && path.topics.map(topicPath => {
                        const isCompleted = user.topics.find(topic => topic.id === topicPath.id && topic.userXtopics.state === 'isFinished');
                        return <Preview isPathPage={true} topic={topicPath} mainColor={colorBrightness} isCompleted={Boolean(isCompleted)} />
                    })}
                </div>
            <h2>{completedTopics} / {path.topics && path.topics.length} completed</h2>
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(PathPage);