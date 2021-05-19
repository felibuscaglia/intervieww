import React, { useState } from 'react';
import style from './adminPanel.module.css';
import Header from '../../components/header/header';

function AdminPanel() {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <div>
            <Header fontColor={'#003e4f'} />
            <div id={style.mainDiv}>
                <div style={{ backgroundImage: `url(https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MXx8fGVufDB8fHx8&w=1000&q=80)` }} id={style.imagePreview}></div>
                <div className='displayFlexColumn'>
                    <h1 id={style.question}>What do you want to post?</h1>
                    <div id={style.btnDiv}>
                        <button onClick={() => setSelectedOption('Topic')} className={style.selectBtn}>Topic</button>
                        <button onClick={() => setSelectedOption('Path')} className={style.selectBtn}>Path</button>
                        <button onClick={() => setSelectedOption('Question')} className={style.selectBtn}>Question</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AdminPanel;