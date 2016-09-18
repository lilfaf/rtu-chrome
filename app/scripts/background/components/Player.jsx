import React, {Component} from 'react';
import {connect} from 'react-redux';

const streamURL = 'http://srv2.streaming-ingenierie.fr:8184/;stream/1'
const playingURL = 'http://rtufm.com/script/playing.php'

class Player extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount()   {
    let audio = document.getElementById('audio-player');
    audio.addEventListener('error', () => {
      console.log(audio.error);
    });
    this.getTrackInfo.bind(this)
    this.getTrackInfo();
  }

  getTrackInfo() {
    let req = new XMLHttpRequest();
    req.onload = () => {
      if (this.props) {
        this.props.dispatch({
          type: 'TRACK_INFO',
          data: {
            name: req.responseXML.getElementsByTagName('b')[0].innerText,
            artist: req.responseXML.getElementsByTagName('p')[0].innerText
          }
        });
      }
    };
    req.open('GET', playingURL);
    req.responseType = 'document';
    req.send();
    setTimeout(this.getTrackInfo, 2000);
  }

  render() {
    return (
      <div>
        <audio id="audio-player"
               src={streamURL}>
        </audio>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {}
}

export default connect(mapStateToProps)(Player);
