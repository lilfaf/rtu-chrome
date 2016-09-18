import React, {Component} from 'react';

import Controls from './Controls';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <nav className="blue lighten-1">
          <div className="nav-wrapper">
            <a className="brand-logo">RTU.FM</a>
          </div>
        </nav>
        <div className="container">
          <div className="row">
            <div className="col s12">
              <Controls/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
