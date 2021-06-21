import React, { useState } from 'react';
import style from '../topicForm/topicForm.module.css';
import SelectedTopic from '../../components/selectedTopic/selectedTopic';
import * as axios from 'axios';
import { BlockPicker } from 'react-color';
import { Hint } from 'react-autocomplete-hint';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';

function PathForm({ setSelectedOption, topics }) {
    const [input, setInput] = useState({ mainImage: 'https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80' });
    const [options] = useState(topics.map(topic => {
        return { id: topic.id, label: topic.title };
    }));
    const [selectedTopics, setSelectedTopics] = useState([]);
    const history = useHistory();

    function addTopic(e) {
        if (e.key === 'Enter') {
            const findSkill = options.find(skill => skill.label.toLowerCase() === e.target.value.toLowerCase());
            const dontRepeat = findSkill && selectedTopics.find(selectedTopic => selectedTopic.id === findSkill.id);
            if (findSkill && !dontRepeat) {
                setSelectedTopics(selectedTopics.concat(findSkill));
                e.target.value = '';
            }
        }
    }

    function handleInputChange(e) {
        if (e.hex) {
            setInput({ ...input, mainColor: e.hex });
        } else {
            setInput({
                ...input,
                [e.target.name]: e.target.value
            });
        }
    }

    function handleSubmit() {
        const dto = { data: input, topics: selectedTopics };
        axios.post('/path', dto)
            .then(newPath => {
                console.log(newPath, 'NEW PATH');
                history.push(`/path/${newPath.data.id}`);
            })
            .catch(err => console.log(err))
    }

    return (
        <div className='justifyEvenly' id='width100'>
            <FontAwesomeIcon onClick={() => setSelectedOption(null)} id={style.icon} icon={faArrowAltCircleLeft} />
            <div className='displayFlexColumn'>
                <div style={{ backgroundImage: `url(${input.mainImage})` }} id={style.imagePreview}></div>
                <input
                    onChange={(e) => handleInputChange(e)}
                    id={style.previewInput}
                    placeholder='Image url...'
                    name='mainImage' />
            </div>
            <div id={style.mainDiv}>
                <h2 id={style.mainTitle}>Create a new path</h2>
                <div className='alignCenter'>
                    <div id={style.inputDiv}>
                        <input
                            value={input.title}
                            name='title'
                            className={style.input}
                            placeholder='Title...'
                            onChange={(e) => handleInputChange(e)} />
                        <Hint options={options}>
                            <input
                                className={style.input}
                                placeholder='Topics...'
                                onKeyDown={(e) => addTopic(e)} />
                        </Hint>
                        <div id={style.selectedSkillsContainer}>
                            {selectedTopics.map(selectedTopic =>
                                <SelectedTopic
                                    topic={selectedTopic}
                                    key={selectedTopic.id}
                                    setSelectedTopics={setSelectedTopics}
                                    selectedTopics={selectedTopics} />
                            )}
                        </div>
                    </div>
                    <BlockPicker
                        color={input.mainColor}
                        triangle={'hide'}
                        onChange={(e) => handleInputChange(e)} />
                </div>
                <button onClick={ handleSubmit } id={style.postItBtn}>Post it</button>
            </div>
        </div>
    )
}

export default PathForm;