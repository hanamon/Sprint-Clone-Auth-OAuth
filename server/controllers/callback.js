require('dotenv').config();
const axios = require('axios');
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

module.exports = (req, res) => {
  // req의 body로 authorizationCode가 들어온다.
  // authorizationCode로 access token을 발급한다.
  axios({
    method: 'POST',
    url: 'https://github.com/login/oauth/access_token',
    headers: {
      accept: 'application/json'
    },
    data: {
      client_id: clientID,
      client_secret: clientSecret,
      code: req.body.authorizationCode
    }
  })
  .then((res) => {
    accessToken = res.data.access_token;
    res.status(200).json({ accessToken: accessToken });
  })
  .catch((err) => {
    res.sendStatus(404);
  })
};
