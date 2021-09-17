require('dotenv').config();
const axios = require('axios');
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;

module.exports = async (req, res) => {
  // req의 body로 authorizationCode가 들어온다.
  // authorizationCode로 access token을 발급한다.
  try {
    const result = await axios.post(
      'https://github.com/login/oauth/access_token', 
      {
        client_id: clientID,
        client_secret: clientSecret,
        code: req.body.authorizationCode
      }, 
      { headers: { accept: 'application/json' } }
    );
    const accessToken = result.data.access_token;
    res.json({ accessToken });
  } catch (err) {
    console.log(err);
    res.sendStatus(404);
  }
};
