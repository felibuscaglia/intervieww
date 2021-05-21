import React, { useState, useEffect } from 'react';
import style from './adminPanel.module.css';
import Header from '../../components/header/header';
import TopicForm from '../../components/topicForm/topicForm';
import PathForm from '../../components/pathForm/pathForm';
import QuestionForm from '../../components/questionForm/questionForm';
import { connect } from 'react-redux';
import { getTopics } from '../../redux/actions/index';

function AdminPanel() {
    const [selectedOption, setSelectedOption] = useState(null);

    useEffect(() => {
     getTopics();   
    }, []);
    
    return (
        <div>
            <Header fontColor={'#003e4f'} />
            <div id={style.mainDiv}>
                {selectedOption === null &&
                    <div className='displayFlexColumn'>
                        <h1 id={style.question}>What do you want to post?</h1>
                        <div id={style.btnDiv}>
                            <button onClick={() => setSelectedOption('Topic')} className={style.selectBtn}>Topic</button>
                            <button onClick={() => setSelectedOption('Path')} className={style.selectBtn}>Path</button>
                            <button onClick={() => setSelectedOption('Question')} className={style.selectBtn}>Question</button>
                        </div>
                    </div>
                }
                {selectedOption === 'Topic' && <TopicForm setSelectedOption={setSelectedOption} />}
                {selectedOption === 'Path' && <PathForm setSelectedOption={setSelectedOption} />}
                {selectedOption === 'Question' && <QuestionForm setSelectedOption={setSelectedOption} />}
            </div>
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        getTopics: () => dispatch(getTopics())
    }
}

export default connect(null, mapDispatchToProps)(AdminPanel);