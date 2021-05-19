import React, { useEffect, useState } from 'react';
import style from './userProfile.module.css';
import Header from '../../components/header/header';
import PreviewDisplayer from '../../components/previewDisplayer/previewDisplayer';
import UserPreviewDisplayer from '../../components/userPreviewDisplayer/userPreviewDisplayer';
import Toast from '../../components/toast/toast';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { getTopics } from '../../redux/actions/index';

function UserProfile({ topics, getTopics, user }) {

    const [userTopics, setUserTopics] = useState(user.topics ? user.topics : []);
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        if (topics.length === 0) getTopics();

        axios.get('/path')
            .then(paths => setPaths(paths.data))
            .catch(err => console.log(err));

    }, [getTopics, topics.length]);

    return (
        <div id={style.userProfile} style={{ minHeight: window.innerHeight, minWidth: window.innerWidth }}>
            <Toast message={"You've already started your journey!"} showBody={true} />
            <Header fontColor={'#ffffff'} />
            {userTopics.find(topic => topic.userXtopics.state === 'isStarted') &&
                <div id={style.data}>
                    <h1 id={style.mainTitle}>Keep learning</h1>
                    <UserPreviewDisplayer previewsToDisplay={userTopics} setUserTopics={setUserTopics} />
                </div>
            }
            {
                userTopics.find(topic => topic.userXtopics.state === 'onList') &&
                <div id={style.data}>
                    <h1 id={style.mainTitle}>My list</h1>
                    <UserPreviewDisplayer previewsToDisplay={userTopics} setUserTopics={setUserTopics} isUserList={true} />
                </div>
            }
            <div id={style.data}>
                <h1 id={style.mainTitle}>Learning paths</h1>
                <PreviewDisplayer previewsToDisplay={paths} />
            </div>
            <div id={style.data}>
                <h1 id={style.mainTitle}>Topics</h1>
                <PreviewDisplayer previewsToDisplay={topics} setUserTopics={setUserTopics} />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        topics: state.topics,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTopics: () => dispatch(getTopics())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);