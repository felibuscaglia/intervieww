import * as React from 'react';
import style from '../../screens/userProfile/userProfile.module.css';
import PreviewDisplayer from '../../components/previewDisplayer/previewDisplayer';
import { connect } from 'react-redux';

function QueryResults({ query, suggestions }) {
    return (
        <div id={style.userProfile} style={{ minHeight: window.innerHeight, minWidth: window.innerWidth }}>
            <div id={style.data}>
                <h1 id={style.mainTitle}>Results for {query}...</h1>
                <PreviewDisplayer previewsToDisplay={suggestions} />
            </div>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        suggestions: state.suggestions
    }
}

export default connect(mapStateToProps, null)(QueryResults);