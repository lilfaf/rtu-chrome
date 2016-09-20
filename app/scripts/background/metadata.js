const soundcloudClientID = 'e782bdefd7e7cc623284d9135a1a72c8'

const soundcloudURL = 'https://api.soundcloud.com'
const deezerURL = 'http://api.deezer.com'
const youtubeURL = 'https://www.googleapis.com/youtube/v3'

const metaProviders = ['Deezer', 'SoundCloud'];

export default class Metadata {
  fetch(query, cb) {
    let providers = metaProviders;

    let responseHandler = (meta) => {
      if (meta.link && meta.cover) {
        console.log(`found metadata on ${meta.provider} !`)
        return cb(meta)
      } else if (providers) {
        return search(providers.shift());
      }
    };
    let search = (provider) => {
      if (provider == 'Deezer') {
        this._searchDeezer(query, (meta) => {
          responseHandler(meta);
        });
      } else if (provider == 'SoundCloud') {
        this._searchSoundCloud(query, (meta) => {
          responseHandler(meta);
        });
      }
    };
    search(providers.shift());
  }

  _searchDeezer(query, cb) {
    this._apiRequest(`${deezerURL}/search?q=${query}`, (resp) => {
      if (resp.total) {
        return cb(this._deezerJSONToMeta(resp.data[0]));
      }
    });
  }

  _searchSoundCloud(query, cb) {
    let url = `${soundcloudURL}/tracks?client_id=${soundcloudClientID}&q=${query}`
    this._apiRequest(url, (data) => {
      if (data.length) {
        return cb(this._soundCloudJSONToMeta(data[0]));
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
      provider: 'Deezer',
      link: data.link,
      cover: data.album.cover_medium
    }
  }

  _soundCloudJSONToMeta(data) {
    return {
      provider: 'SoundCloud',
      link: data.permalink_url,
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
