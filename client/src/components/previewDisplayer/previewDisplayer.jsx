import * as React from 'react';
import style from './previewDisplayer.module.css';
import Preview from '../preview/preview';

function PreviewDisplayer({ previewsToDisplay, setUserTopics }) {
    return (
        <div id={style.previews}>
            {previewsToDisplay.map((topic, index) =>
                <Preview
                    isProfile={true}
                    key={index}
                    topic={topic}
                    mainColor={'#ffffff'}
                    setUserTopics={setUserTopics}
                />
            )}
        </div>
    )
}

export default PreviewDisplayer;