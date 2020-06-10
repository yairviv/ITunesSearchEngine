import React from 'react';
import { connect } from 'react-redux';
import SongListItem from './SongListItem';
import './Songs.css';
import AppHeaderContext from '../../contexts/AppHeaderContext';

const mapStateToProps = (state) => {
    return { items: state.songsList || [] }
}

class SongsListView extends React.Component {
    static contextType = AppHeaderContext;
    componentDidUpdate(prevProps) {
        // Typical usage (don't forget to compare props):
        if (this.props.items !== prevProps.items) {
            this.props.onListRefresh()
        }
    }

    componentWillMount() {
        this.context.changeFlags(false);
    }
    render() {
        return (<ul className="resultsView">
            {this.props.items.map(song =>
                <SongListItem key={this.props.items.indexOf(song)} song={song}></SongListItem>
            )}
        </ul>
        );
    }
}
export default connect(mapStateToProps,
    null
)(SongsListView);