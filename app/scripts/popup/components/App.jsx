import React, {Component} from 'react';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';

import Controls from './Controls';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar title="RTU.FM" />
          <Controls />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
