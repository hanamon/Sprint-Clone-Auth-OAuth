const images = require('../resources/resources');

module.exports = (req, res) => {
  // 인증받은 회원(accessToken이 req.headers에 있는 경우)은
  // 리소스에 접근할 권한을 부여받는다.
  if( !req.headers.authorization ) {
    return res.status(403).send({ message: 'no permission to access resources '});
  }
  res.status(200).send({ images });
}
