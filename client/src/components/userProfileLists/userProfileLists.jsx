import React, { useState, useEffect } from 'react';
import style from '../../screens/userProfile/userProfile.module.css';
import UserPreviewDisplayer from '../userPreviewDisplayer/userPreviewDisplayer';
import PreviewDisplayer from '../previewDisplayer/previewDisplayer';
import * as axios from 'axios';
import { connect } from 'react-redux';
import { getTopics } from '../../redux/actions/index';

function UserProfileLists({ user, topics, getTopics }) {
    const [userTopics, setUserTopics] = useState(user.topics ? user.topics : []);
    const [paths, setPaths] = useState([]);

    useEffect(() => {
        if (topics.length === 0) getTopics();

        axios.get('/path')
            .then(paths => setPaths(paths.data))
            .catch(err => console.error(err));

    }, [getTopics, topics.length]);

    return (
        <div>
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
        user: state.user,
        topics: state.topics
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getTopics: () => dispatch(getTopics())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileLists);