import React, {Component} from 'react';
import {connect} from 'react-redux';

const playingURL = 'http://rtufm.com/script/playing.php'

class Player extends Component {
  constructor(props) {
    super(props);
    this.fetchTrackInfo.bind(this);
  }

  componentDidMount()   {
    document.getElementById('audio-player').addEventListener('error', () => {
      console.log(audio.error);
      this.props.dispatch({
        type: 'RESET'
      });
    });

    this.fetchTrackInfo();
    setInterval(() => {
      this.fetchTrackInfo()
    }, 2000);
  }

  fetchTrackInfo() {
    let req = new XMLHttpRequest();
    req.onload = () => {
      if (this.props) {
        this.props.dispatch({
          type: 'TRACK_INFO',
          data: {
            title: req.responseXML.getElementsByTagName('b')[0].innerText,
            artist: req.responseXML.getElementsByTagName('p')[0].innerText
          }
        });
      }
    };
    req.open('GET', playingURL);
    req.responseType = 'document';
    req.send();
  }

  render() {
    return (
      <div>
        <audio id='audio-player'></audio>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(Player);
