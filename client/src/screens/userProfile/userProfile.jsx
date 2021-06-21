import React, { useState, useEffect } from 'react';
import style from './userProfile.module.css';
import Header from '../../components/header/header';
import QueryResults from '../../components/queryResults/queryResults';
import UserProfileLists from '../../components/userProfileLists/userProfileLists';
import Toast from '../../components/toast/toast';
import { connect } from 'react-redux';
import { displayToast } from '../../redux/actions';

function UserProfile({ displayToast }) {
    const [query, setQuery] = useState(null);

    useEffect(() => {
        return function cleanup() {
            displayToast(false);
        }
    }, [])

    return (
        <div id={style.userProfile} style={{ minHeight: window.innerHeight, minWidth: window.innerWidth }}>
            <Toast
                position={'right'}
                header={"You've already added it to your list"}
                body={"Go to the <i>Keep Learning</i> section and continue it."}
            />
            <Header query={query} setQuery={setQuery} isUserProfile={true} fontColor={'#ffffff'} />
            {query ? <QueryResults query={query} /> : <UserProfileLists />}
        </div>
    )
}

function mapDispatchToProps(dispatch) {
    return {
        displayToast: boolean => dispatch(displayToast(boolean))
    }
}

export default connect(null, mapDispatchToProps)(UserProfile);