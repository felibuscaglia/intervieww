import React, { useState, useEffect } from 'react';
import style from './question.module.css';
import * as axios from 'axios';
import { Card, Accordion } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getBrightness } from '../../utils';

function Question({ question, index, topic, user, isCompleted }) {
    const [isCompletedState, setIsCompletedState] = useState(isCompleted);
    
    useEffect(() => setIsCompletedState(isCompleted), [isCompleted]);

    const fontColor = getBrightness(topic.color);

    async function completeQuestion() {
        setIsCompletedState(true);
        await axios.post(`/question/complete/${question.id}/?userId=${user.id}&topicId=${topic.id}`);
    }

    return (
        <Card id={style.card}>
            <Card.Header style={{ backgroundColor: topic.color }}>
                <Accordion.Toggle style={{ color: fontColor }} id={style.toggle} eventKey={String(index)}>
                    {question.question}
                </Accordion.Toggle>
            </Card.Header>
            <Accordion.Collapse eventKey={String(index)}>
                <Card.Body id={style.cardBody}>
                    {isCompletedState === undefined && <Link to='/signup'><button style={{ background: topic.color, color: fontColor }} id={style.checkBtn}>Unlock the answer</button></Link>}
                    {!isCompletedState && isCompletedState !== undefined && <button onClick={ completeQuestion } style={{ background: topic.color, color: fontColor }} id={style.checkBtn}>Check your answer</button>}
                    <div style={{ filter: `blur(${user.name && isCompletedState ? '0px' : '4px'})`, WebkitFilter: `blur(${user.name && isCompletedState ? '0px' : '4px'})` }}>
                        {question.answer}
                    </div>
                </Card.Body>
            </Accordion.Collapse>
        </Card>
    )
}

function mapStateToProps(state) {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, null)(Question);