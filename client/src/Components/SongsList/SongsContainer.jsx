import React, { useState } from 'react';
import SongsListInput from './SongsListInput';
import SongsListView from './SongsListView';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Songs.css'

function Container() {
    const [progressBarFlag, setprogressBarFlag] = useState(false);

    function clickHandler() {
        setprogressBarFlag(true);
    };
    function listRefreshed() {
        setprogressBarFlag(false);
    };
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
                <SongsListView onListRefresh={listRefreshed} /></div>
        </div>
    );
}
export default Container