var baseURL;
if (process.env.NODE_ENV !== 'development') {
  baseURL = '/api/posts';
} else {
  baseURL = `http://b10ptpl.myraidbox.de/wp-json/wp/v2/posts`;
}

module.exports = {
  baseURL
};
