const soundcloudClientID = 'e782bdefd7e7cc623284d9135a1a72c8'
const youtubeAPIKey = 'AIzaSyCUUCZuzuVd6niJt0cIg-8ofYncBHx9imo'

const soundcloudURL = 'https://api.soundcloud.com'
const deezerURL = 'http://api.deezer.com'
const youtubeURL = 'https://www.googleapis.com/youtube/v3'

export default class Metadata {
  fetch(params, cb) {
    let providers = ['Deezer', 'SoundCloud', 'Youtube'];

    let responseHandler = (meta) => {
      if (meta.link && meta.cover) {
        console.log(`found metadata on ${meta.provider} !`);
        cb(meta);
      } else if (providers) {
        console.log(`could not found metadata on ${meta.provider}...`);
        search(providers.shift());
      }
    };

    let search = (provider) => {
      if (provider == 'Deezer') {
        this._searchDeezer(params, (meta) => {
          responseHandler(meta);
        });
      } else if (provider == 'SoundCloud') {
        this._searchSoundCloud(params, (meta) => {
          responseHandler(meta);
        });
      } else if (provider == 'Youtube') {
        this._searchYoutube(params, (meta) => {
          responseHandler(meta);
        });
      }
    };
    search(providers.shift());
  }

  _searchDeezer(params, cb) {
    let query = `track:"${params.title}" artist:"${params.artist}"`
    this._apiRequest(`${deezerURL}/search?q=${query}`, (resp) => {
      if (resp.total) {
        cb(this._deezerJSONToMeta(resp.data[0]));
      } else {
        cb({provider: 'Deezer'});
      }
    });
  }

  _searchSoundCloud(params, cb) {
    let query = `${params.title} ${params.artist}`
    let url = `${soundcloudURL}/tracks?client_id=${soundcloudClientID}&q=${query}`
    this._apiRequest(url, (data) => {
      if (data.length) {
        cb(this._soundCloudJSONToMeta(data[0]));
      } else {
        cb({provider: 'SoundCloud'});
      }
    });
  }

  _searchYoutube(params, cb) {
    let query = `${params.title} ${params.artist}`;
    let urlParams = `part=snippet&type=video&key=${youtubeAPIKey}&q=${query}`;
    let url = `${youtubeURL}/search?${urlParams}`;
    this._apiRequest(url, (data) => {
      if (data.items.length) {
        cb(this._youtubeJSONToMeta(data.items[0]));
      } else {
        cb({provider: 'Youtube'});
      }
    });
  }

  _deezerJSONToMeta(data) {
    return {
      provider: 'Deezer',
      link: data.link,
      cover: data.album.cover_big
    }
  }

  _soundCloudJSONToMeta(data) {
    return {
      provider: 'SoundCloud',
      link: data.permalink_url,
      cover: (data.artwork_url ? data.artwork_url.replace('large', 't500x500') : '')
    }
  }

  _youtubeJSONToMeta(data) {
    return {
      provider: 'Youtube',
      link: `https://www.youtube.com/watch?v=${data.id.videoId}`,
      cover: data.snippet.thumbnails.medium.url
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
