import React, { useState } from 'react';
import style from '../topicForm/topicForm.module.css';
import * as axios from 'axios';
import Editor from '../textEditor/textEditor';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';

function QuestionForm({ setSelectedOption, topics }) {
    const [input, setInput] = useState({});
    const [selectedTopic, setSelectedTopic] = useState('');
    const history = useHistory();

    function handleInputChange(e) {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit() {
        const topicId = topics.find(topic => topic.title === selectedTopic).id;
        axios.post(`/question/${topicId}`, input)
            .then(res => history.push(`/topic/${topicId}/questions`))
            .catch(err => console.error(err))
    }

    return (
        <div id={style.mainDivQuestion}>
            <FontAwesomeIcon onClick={() => setSelectedOption(null)} id={style.questionIcon} icon={faArrowAltCircleLeft} />
            <h2 id={style.mainTitle}>Create a new question</h2>
            <div className='alignCenter'>
                <div id={style.selectDiv}>
                    <input
                        value={input.title}
                        name='question'
                        className={style.input}
                        id={style.questionInput}
                        placeholder='Question...'
                        onChange={(e) => handleInputChange(e)}
                    />
                    <label id={style.label} htmlFor='topics'>Select a topic:</label>
                    <select value={selectedTopic} onChange={(e) => setSelectedTopic(e.target.value)} id={style.select} name='topics'>
                        {topics.map(topic => <option key={topic.id} value={topic.title}>{topic.title}</option>)}
                    </select>
                </div>
                <Editor setInput={setInput} input={input} />
            </div>
            <button onClick={ handleSubmit} id={style.postItBtn}>Post it</button>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        topics: state.topics
    }
}

export default connect(mapStateToProps, null)(QuestionForm);