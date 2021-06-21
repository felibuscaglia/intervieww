import React, { useEffect } from 'react';
import style from './homepage.module.css';
import Preview from '../../components/preview/preview';
import Header from '../../components/header/header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTwitter, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { TwitterShareButton, FacebookShareButton } from 'react-share';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getTopics } from '../../redux/actions/index';

function Homepage({ topics, setTopics, user }) {

    useEffect(() => {
        if (topics.length === 0) {
            setTopics();
        }
    }, [setTopics, topics.length]);

    return (
        <div>
            <Header fontColor={'#003e4f'} />
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
            <div id={style.mainContainer}>
                <div id={style.interviewContainer}>
                    {topics.slice(0, user.name ? topics.length : 20).map((topic, index) => <Preview key={index} topic={topic} />)}
                </div>
                {!user.name &&
                    <div id={style.mainNonUserContainer}>
                        <span id={style.unlock}>⚡ Unlock {topics.length - 20}+ topics and more benefits. <Link to='/signup' id={style.link}>Join now</Link>.</span>
                        <div id={style.blurredContainer}>
                            {topics.slice(20).map((topic, index) => <Preview topic={topic} key={index} isHomepage={true} />)}
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        topics: state.topics,
        user: state.user
    }
}

function mapDispatchToProps(dispatch) {
    return {
        setTopics: () => dispatch(getTopics())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Homepage);