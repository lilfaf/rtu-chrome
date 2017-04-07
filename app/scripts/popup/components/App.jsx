import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import Controls from './Controls';
import Track from './Track';

class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            iconElementLeft={
              <img className='logo' src='images/nav-logo.png'/>
            } />
          <Controls />
          <div className='row'>
            <div className='col s12'>
              <Track />
            </div>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
