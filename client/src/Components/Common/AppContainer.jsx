import React from 'react'; import {
    BrowserRouter as Router, Switch,
    Route,
} from 'react-router-dom';
import SongPage from '../SongPage/SongPage';
import SongsContainer from '../SongsList/SongsContainer';

function AppContainer() {
    return (
        <Router> <div>
            <Switch>
                <Route exact path="/"> <SongsContainer />
                    ￼</Route>
                <Route path="/song" component={SongPage}>
                </Route></Switch>
        </div> </Router>
    );
}
export default AppContainer;