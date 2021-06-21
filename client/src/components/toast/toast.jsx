import * as React from 'react';
import style from './toast.module.css';
import { Toast } from 'react-bootstrap';
import { connect } from 'react-redux';
import { displayToast } from '../../redux/actions/index';

function ToastPopUp({ showToast, displayToast, position, header, body }) {
    return (
        <div style={{ [position]: '25px' }} id={style.toast}>
            <Toast show={showToast} onClose={() => displayToast(false)} >
                <Toast.Header id={style.header}>
                    <strong className="mr-auto">{header}</strong>
                </Toast.Header>
                <Toast.Body dangerouslySetInnerHTML={{ __html: body }} id={style.body}></Toast.Body>
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