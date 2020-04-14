import React from 'react';
import './App.css';
import Container from '../src/Components/SongsList/SongsContainer';
import AppHeader from './Components/Common/AppHeader';
import { BrowserRouter as Router } from 'react-router-dom'
import AppContainer from './Components/Common/AppContainer'
function App() {
  return (
    <div>
      <AppHeader></AppHeader>
      <AppContainer /></div>
  );
}
export default App;
