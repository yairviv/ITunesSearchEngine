import React from 'react';
import { List, ListItemText } from '@material-ui/core';
import { connect } from 'react-redux';
const mapStateToProps = (state) => {
    return { items: state.songsList || [] }
}
function SongsListView(props) {
    const listItems = props.items || [];
    const listItemsJSX = listItems.map(item => <ListItemText
        key={item.trackId}>{item}</ListItemText>);

    return ( <ul>
        {listItems.map(song =>
          <h1 key={song.trackId} >{song.trackName}</h1>
        )}
      </ul>
    );
}
export default connect(mapStateToProps,
    null
)(SongsListView);