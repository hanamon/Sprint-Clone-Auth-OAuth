const express = require('express');
const cors = require('cors');
const controllers = require('./controllers');

const app = express();
const PORT = process.env.PORT || 8080;

// 미들웨어
app.use(express.json());
app.use(cors({
  origin: true
}));

// 라우팅
app.post('/callback', controllers.handleCallback);
app.post('/images', controllers.handleImages);

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 server runnning! listening on port ${PORT}`)
});

module.exports = app;
