import * as React from 'react';
import style from '../toast/toast.module.css';
import { Toast } from 'react-bootstrap';

function LeftToast({ topic, fontColor, displayToast }) {
    return (
        <div id={style.leftToast}>
            <Toast show={displayToast}>
                <Toast.Header style={{ color: topic.color }} id={style.header}>
                    <strong className="mr-auto">You haven't finished your {topic.title} journey</strong>
                </Toast.Header>
                <Toast.Body style={{ background: topic.color, color: fontColor }} id={style.body}>You need to complete all the questions.</Toast.Body>
            </Toast>
        </div>
    )
}

export default LeftToast;