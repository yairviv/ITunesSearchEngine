import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { getSongsList } from '../../redux/actions/index';
import { connect } from 'react-redux';
import './Songs.css'
const mapDispatchToProps = (dispatch, ownProps) => ({
    getSongs: (item) => dispatch(getSongsList(item)),
});

function SongsListInput(props) {
    const [item, setItem] = useState('');

    function changeHandler(e) {
        setItem(e.target.value);
    };
    function SearchClickHandler(e) {
        props.getSongs(item);
        ;
    }
    const inputProps = {
        fullWidth: true
    };

    return (

        <div className='searchArea' >
            <TextField id="outlined-basic" label="Artist Name" variant="outlined" className='searchField' onChange={changeHandler} />
            <IconButton onClick={SearchClickHandler}><SearchIcon></SearchIcon></IconButton></div>

    );
}
export default connect(null, mapDispatchToProps)(SongsListInput)