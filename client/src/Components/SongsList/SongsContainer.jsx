import React, { useState } from 'react';
import SongsListInput from './SongsListInput';
import SongsListView from './SongsListView';
import CircularProgress from '@material-ui/core/CircularProgress';
import { connect } from 'react-redux';
import './Songs.css'

const mapStateToProps = (state) => {
    return {
        authError: state.loginReducer || {
            type: '',
            message: ''
        }
    }
}
function Container(props) {
    const [progressBarFlag, setprogressBarFlag] = useState(false);
    const [open, setOpen] = React.useState(false);


    function clickHandler() {
        setOpen(true);
        if (props.authError.type == 'ok') {
            setprogressBarFlag(true);
        }
    };
    function listRefreshed() {
        setprogressBarFlag(false);
    };

    const handleClose = () => {
        setOpen(false);
    }
    function showProgress() {
        if (progressBarFlag) {
            return <span className='spinner'><CircularProgress /></span>;
        }
        return <span className='spinner'></span>;
    }

    return (
        <div>
            <div className='searchArea'>
                <div className='searchItmes'>
                    {showProgress()}
                    <span> <SongsListInput onClick={clickHandler} /></span>
                </div>
            </div>
            <div>
                <SongsListView onListRefresh={listRefreshed} open={open} handleClose={handleClose} /></div>
        </div>
    );
}
export default connect(mapStateToProps, null)(Container)