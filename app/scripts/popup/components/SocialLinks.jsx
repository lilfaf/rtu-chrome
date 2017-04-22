import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class SocialLinks extends Component {
  _onClick(event) {
    chrome.tabs.create({url: event.target.dataset.href})
  }

  render() {
    const metadatas = this.props.metadatas.filter((meta) => {
      return meta.provider !== 'deezer'
    })

    return (
      <ul className="inline">
        {metadatas.map((meta, i) => {
          return (
            <li key={i}>
              <FontAwesome
                name={meta.provider}
                size='2x'
                onClick={this._onClick}
                data-href={meta.link}
              />
            </li>
          )
        })}
      </ul>
    )
  }
}

export default SocialLinks;
