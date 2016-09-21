import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import {white} from 'material-ui/styles/colors';

import Controls from './Controls';
import Track from './Track';

class App extends Component {
  constructor(props) {
    super(props);
  }

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
