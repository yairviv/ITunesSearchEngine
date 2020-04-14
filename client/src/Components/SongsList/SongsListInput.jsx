import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';
import { getSongsList } from '../../redux/actions/index';
import { connect } from 'react-redux';


import './Songs.css'
const mapDispatchToProps = (dispatch, ownProps) => ({
    getSongs: (item) => dispatch(getSongsList(item)),
});

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));
function SongsListInput(props) {

    const [item, setItem] = useState('');
    const [errorFlag, setErrorFlag] = useState(false);

    function onkeyPress(event) {
        if (event.key === "Enter") {
            SearchClickHandler()
        }
    }
    function changeHandler(e) {
        setItem(e.target.value);
    };
    function SearchClickHandler() {
        if (item.trim() !== '') {
            props.getSongs(item);
            props.onClick();
            setErrorFlag(false)
        } else {
            setErrorFlag(true);
        }
    }

    const classes = useStyles();

    return (
        <div>
            <div >
                <TextField id="outlined-basic" label="Artist Name" variant="outlined" className='searchField' onKeyPress={onkeyPress} onChange={changeHandler} />
                <IconButton onClick={SearchClickHandler}><SearchIcon></SearchIcon></IconButton>
                {errorFlag > 0 &&
                    <div className='searchField' >
                        <Alert severity="error">Pleas fill in artist name</Alert>
                    </div>
                }
            </div>
        </div>

    );
}
export default connect(null, mapDispatchToProps)(SongsListInput)