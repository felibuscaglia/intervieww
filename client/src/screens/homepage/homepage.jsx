import React, { useEffect } from 'react';
import style from './homepage.module.css';
import Preview from '../../components/preview/preview';
import Header from '../../components/header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import { connect } from 'react-redux';
import { getTopics } from '../../redux/actions/index';

function Homepage({ topics, setTopics }) {

    useEffect(() => {
        if (topics.length === 0) {
            setTopics();
        }
    }, [setTopics, topics.length]);

    return (
        <div>
            <Header fontColor={ '#003e4f' } />
            <div id={style.welcome} className='displayFlexColumn'>
                <h1 id={style.mainTitle}>Master the technical interview</h1>
                <span id={style.mainSpan}>All the questions you need to know to get your ideal job.</span>
                <div className='alignCenter'>
                    <TwitterShareButton
                        url={'https://typestudio.co/resources/product-videos?ref=producthunt'}
                        title={'Master the technical interview! +1000 questions from the most in-demand programming languages and frameworks'}
                    >
                        <button className={style.shareBtn}><FontAwesomeIcon id={style.twitter} icon={faTwitter} />Tweet</button>
                    </TwitterShareButton>
                    <FacebookShareButton
                        url={'https://typestudio.co/resources/product-videos?ref=producthunt'}
                        quote={'Master the technical interview! +1000 questions from the most in-demand programming languages and frameworks'}
                    >
                        <button className={style.shareBtn}><FontAwesomeIcon id={style.facebook} icon={faFacebook} />Share</button>
                    </FacebookShareButton>
                </div>
            </div>
            <div id={style.interviewContainer}>
                {topics.map((topic, index) => <Preview key={index} topic={topic} />)}
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        topics: state.topics
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTopics: () => dispatch(getTopics())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);