import React from 'react';
import { connect } from 'react-redux';
import SongListItem from './SongListItem'
import './Songs.css'
const mapStateToProps = (state) => {
    return { items: state.songsList || [] }
}
class SongsListView extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.items !== prevProps.items) {
            this.props.onListRefresh()
        }
    }
    render() {
        return (<ul className="resultsView">
            {this.props.items.map(song =>
                <SongListItem key={song.trackId} song={song}></SongListItem>
            )}
        </ul>
        );
    }
}
export default connect(mapStateToProps,
    null
)(SongsListView);