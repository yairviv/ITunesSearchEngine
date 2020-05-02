import React from 'react'; import {
    BrowserRouter as Router, Switch,
    Route,
} from 'react-router-dom';
import SongPage from '../SongPage/SongPage';
import SongsContainer from '../SongsList/SongsContainer';
import AppHeader from '../Common/AppHeader'
import cartContainer from '../Cart/CartContainer'

function AppContainer() {
    return (
        <Router> <div>
            <AppHeader></AppHeader>
            <Switch>
                <Route exact path="/"> <SongsContainer />
                    ￼</Route>
                <Route path="/song" component={SongPage}>
                </Route>
                <Route path="/cart" component={cartContainer}></Route>
            </Switch>
        </div> </Router>
    );
}
export default AppContainer;