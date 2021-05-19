import React, { useState } from 'react';
import style from './topicForm.module.css';
import { BlockPicker } from 'react-color';
import * as axios from 'axios';
import { useHistory } from 'react-router-dom';

function TopicForm({ mainImage }) {
    const [input, setInput] = useState({});
    const history = useHistory();

    function handleNonNumericInputChange(e) {
        if (e.hex) {
            setInput({ ...input, color: e.hex });
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            });
        }
    }

    function handleNumberInputChange(e) {
        if (e.target.value[0] !== '$') e.target.value = `$ ${e.target.value}`;

        setInput({
            ...input,
            [e.target.name]: e.target.value
        });
    }

    function handleSubmit() {
        input.jobOpenings = input.jobOpenings.slice(2);
        input.averageSalary = input.averageSalary.slice(2);
        axios.post('/topic', { ...input, mainImage })
            .then(res => history.push(`/topic/${res.data.id}/questions`))
            .catch(err => console.log(err))
    }

    return (
        <div id={style.mainDiv}>
            <h2 id={style.mainTitle}>Create a new topic</h2>
            <div className='alignCenter'>
                <div id={style.inputDiv}>
                    <input
                        value={input.title}
                        onChange={(e) => handleNonNumericInputChange(e)}
                        name='title'
                        className={style.input}
                        placeholder='Title...'
                    />
                    <input
                        value={input.famousApps}
                        name='famousApps'
                        className={style.input}
                        placeholder='Famous apps...'
                        onChange={(e) => handleNonNumericInputChange(e)}
                    />
                    <div>
                        <input
                            value={input.jobOpenings}
                            name='jobOpenings'
                            onChange={(e) => handleNumberInputChange(e)}
                            className={style.numberInput}
                            placeholder='Job openings...'
                        />
                        <input
                            value={input.averageSalary}
                            name='averageSalary'
                            onChange={(e) => handleNumberInputChange(e)}
                            className={style.numberInput}
                            placeholder='Average salary...'
                        />
                    </div>
                </div>
                <BlockPicker
                    onChange={(e) => handleNonNumericInputChange(e)}
                    color={input.color}
                    triangle={'hide'}
                />
            </div>
            <button onClick={ handleSubmit } id={style.postItBtn}>Post it</button>
        </div>
    )
}

export default TopicForm;