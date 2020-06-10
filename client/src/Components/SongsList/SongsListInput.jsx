import React, { useState } from 'react';
import { TextField } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import IconButton from '@material-ui/core/IconButton';
import Alert from '@material-ui/lab/Alert';
import { getSongsList } from '../../redux/actions/index';
import './Songs.css';
import { connect } from 'react-redux';

const mapDispatchToProps = (dispatch, ownProps) => ({
    getSongs: (item) => dispatch(getSongsList(item)),
});
const mapStateToProps = (state) => {
    return { settings: state.settings || { limit: 25 } }
}

function SongsListInput(props) {
    var userItems = JSON.parse(localStorage.getItem('userItems'));
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
            props.getSongs({ song: item, limit: props.settings.limit, entity: props.settings.entity });
            props.onClick();
            setErrorFlag(false);
            fillSearchHistory(item);
        } else {
            setErrorFlag(true);
        }
    }
    function fillSearchHistory(item) {
        if (!userItems || !userItems.items) {
            userItems = { items: [] };
        }
        let storedItem = userItems.items.find(storedItem => storedItem.name === item);
        let storedItemIndex = userItems.items.indexOf(storedItem);
        if (storedItemIndex === -1) {
            if (userItems.items.length === 10) {
                removeItemFromUserItems();
            }
            userItems.items.push({ name: item, counter: 1 });
            localStorage.setItem('userItems', JSON.stringify(userItems))
        } else {
            let counter = userItems.items[storedItemIndex].counter;
            userItems.items.splice(storedItemIndex, 1, { name: item, counter: counter + 1 });
            localStorage.setItem('userItems', JSON.stringify(userItems))
        }
    }

    function removeItemFromUserItems() {
        let itemToRemoveIndex;
        let minCounter = userItems.items[0].counter;
        for (let item of userItems.items) {
            if (item.counter <= minCounter) {
                itemToRemoveIndex = userItems.items.indexOf(item);
            }
        }
        userItems.items.splice(itemToRemoveIndex, 1);
    }


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
export default connect(mapStateToProps, mapDispatchToProps)(SongsListInput)