import React, { useState, useEffect } from 'react'; import {
    BrowserRouter as Router, Switch,
    Route
} from 'react-router-dom';
import SongPage from '../SongPage/SongPage';
import SongsContainer from '../SongsList/SongsContainer';
import AppHeader from '../Common/AppHeader'
import cartContainer from '../Cart/CartContainer'
import { AppHeaderContextProvider } from '../../contexts/AppHeaderContext'


function AppContainer() {
    const [headerFlags, setheaderFlags] = useState({
        disableUserSearchesButton: false
    });

    useEffect(checkForUser);

    const headerOptions = {
        data: headerFlags,
        changeFlags: (value) => setheaderFlags({ disableUserSearchesButton: value }),
    }

    const checkForUser = () => {

    };

    return (
        <Router> <div>
            <AppHeaderContextProvider value={headerOptions}>
                <AppHeader></AppHeader>
            </AppHeaderContextProvider>
            <Switch>
                <Route exact path="/"> <AppHeaderContextProvider value={headerOptions}>
                    <SongsContainer />
                </AppHeaderContextProvider>
                    ￼</Route>
                <Route path="/song" component={SongPage}>
                </Route>
                <Route path="/cart" component={cartContainer}></Route>
            </Switch>
        </div> </Router>
    );
}
export default AppContainer;