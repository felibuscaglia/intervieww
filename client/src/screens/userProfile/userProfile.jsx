import React, { useState } from 'react';
import style from './userProfile.module.css';
import Header from '../../components/header/header';
import QueryResults from '../../components/queryResults/queryResults';
import UserProfileLists from '../../components/userProfileLists/userProfileLists';
import Toast from '../../components/toast/toast';

function UserProfile() {

    const [query, setQuery] = useState(null);

    return (
        <div id={style.userProfile} style={{ minHeight: window.innerHeight, minWidth: window.innerWidth }}>
            <Toast message={"You've already started your journey!"} showBody={true} />
            <Header query={query} setQuery={setQuery} isUserProfile={true} fontColor={'#ffffff'} />
            {query ? <QueryResults query={query} /> : <UserProfileLists />}
        </div>
    )
}

export default UserProfile;