import * as React from 'react';
import style from '../previewDisplayer/previewDisplayer.module.css';
import Preview from '../preview/preview';

function PreviewDisplayer({ previewsToDisplay, setUserTopics, isUserList }) {
    return (
        <div id={style.previews}>
            {previewsToDisplay.map((topic, index) => {
                if (isUserList && topic.userXtopics.state === 'onList') {
                    return <Preview
                        isProfile={true}
                        key={index}
                        topic={topic}
                        mainColor={'#ffffff'}
                        setUserTopics={setUserTopics}
                    />
                } else if (!isUserList && topic.userXtopics.state === 'isStarted') {
                    return <Preview
                        isProfile={true}
                        key={index}
                        topic={topic}
                        mainColor={'#ffffff'}
                        setUserTopics={setUserTopics}
                    />
                } else return null;
            }
            )}
        </div>
    )
}

export default PreviewDisplayer;