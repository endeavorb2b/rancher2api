const fetch = require('node-fetch');

const { log } = console;

const checkStatus = async (res) => {
  if (res.ok) return res; // res.status >= 200 && res.status < 300
  log('error response json', await res.json());
  throw new Error(res.statusText);
};

const authenticated = token => ({ Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' });

module.exports = {
  /**
   * Ensures that all keys passed are present.
   */
  validate: (props = {}) => {
    const keys = Object.keys(props);
    const hop = Object.prototype.hasOwnProperty;
    const valid = keys.every(p => hop.call(props, p) && (props[p] || props[p] === false));
    if (!valid) throw new Error(`Missing a required key: ${JSON.stringify(keys)}`);
  },
  get: (url, token) => {
    const headers = authenticated(token);
    log('GET', url);
    return fetch(url, { headers }).then(checkStatus).then(r => r.json());
  },
  post: (url, token, payload) => {
    log('POST', url, payload);
    const headers = authenticated(token);
    return fetch(url, { method: 'post', body: JSON.stringify(payload), headers })
      .then(checkStatus).then(r => r.json());
  },
};
