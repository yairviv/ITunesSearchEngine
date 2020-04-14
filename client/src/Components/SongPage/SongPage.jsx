import React from 'react';

function SongPage(props) {
    const song = props.location.state.Itune
    var temp = 'ex';
    return (
        <div>{song.trackName}</div>
    );
}
export default SongPage