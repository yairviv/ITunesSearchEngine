import React from 'react';
import { connect } from 'react-redux';
import SongListItem from './SongListItem';
import './Songs.css';
import AppHeaderContext from '../../contexts/AppHeaderContext';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';


const mapStateToProps = (state) => {
    return {
        items: state.songsList || [],
        authError: state.loginReducer || {
            type: '',
            message: ''
        }
    }
}

class SongsListView extends React.Component {

    constructor(props) {
        super(props);
    }

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
        return (<div><ul className="resultsView">
            {this.props.items.map(song =>
                <SongListItem key={this.props.items.indexOf(song)} song={song}></SongListItem>
            )}
        </ul>

            <Snackbar open={this.props.open} autoHideDuration={6000} onClose={this.props.handleClose}>
                {this.props.authError.type != 'ok' &&
                    <Alert severity="error">You must log in first!</Alert>
                }
            </Snackbar>


        </div>

        );
    }
}
export default connect(mapStateToProps,
    null
)(SongsListView);