const soundcloudClientID = 'e782bdefd7e7cc623284d9135a1a72c8'

const soundcloudURL = 'https://api.soundcloud.com'
const deezerURL = 'http://api.deezer.com'
const youtubeURL = 'https://www.googleapis.com/youtube/v3'

const metaProviders = ['Deezer', 'SoundCloud'];
const initialMetadata = {};

export default class Metadatas {
  constructor(meta = initialMetadata) {
    this.meta = meta;
  }

  fetch(query, cb) {
    for (const provider of metaProviders) {
      if (this.meta && this.meta.link && this.meta.cover_medium) { break; }
      if (provider == 'Deezer') {
        this.meta = this._searchDeezer(query);
      } else if (provider == 'SoundCloud') {
        this.meta = this._searchSoundCloud(query);
      }
    }
    cb(this.meta);
  }

  _searchDeezer(query) {
    this._apiRequest(`${deezerURL}/search?q=${query}`, (resp) => {
      if (resp.total != 0) {
        return this._deezerJSONToMeta(resp.data[0])
      }
    });
  }

  _searchSoundCloud(query) {
    let url = `${soundcloudURL}/tracks?client_id=${soundcloudClientID}&q=${query}`
    this._apiRequest(url, (data) => {
      if (data.size != 0) {
        return this._soundCloudJSONToMeta(data[0]);
      }
    });
  }

  // TODO
  _searchYoutube(query) {
    this._apiRequest(`${youtubeURL}/search?part=snippet&q=${query}`, (data) => {
      console.log('found track on youtube !');
      console.log(data);
      return data;
    });
  }

  _deezerJSONToMeta(data) {
    return {
      link: data.link,
      cover: data.album.cover_medium
    }
  }

  _soundCloudJSONToMeta(data) {
    return {
      link: data.permlink_url,
      cover: data.artwork_url
    }
  }

  _apiRequest(url, cb) {
    let req = new XMLHttpRequest();
    req.onload = () => {
      if (req.status == 200) {
        return cb(JSON.parse(req.responseText));
      }
    };
    req.onerror = (e) => {
      console.log(e.message);
      return;
    }
    req.open('GET', url);
    req.send();
  }
}
