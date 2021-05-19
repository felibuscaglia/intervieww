import * as React from 'react';
import style from './toast.module.css';
import { Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import { displayToast } from '../../redux/actions/index';

function ToastPopUp({ showToast, displayToast }) {
    return (
        <div id={style.toast}>
            <Toast show={showToast} onClose={() => displayToast(false)} >
                <Toast.Header id={style.header}>
                    <strong className="mr-auto">You've already added it to your list</strong>
                </Toast.Header>
                <Toast.Body id={style.body}>Go to the <i>Keep Learning</i> section and continue it.</Toast.Body>
            </Toast>
        </div>
    )
}

function mapStateToProps(state) {
    return {
        showToast: state.showToast
    }
}

function mapDispatchToProps(dispatch) {
    return {
        displayToast: boolean => dispatch(displayToast(boolean))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToastPopUp);