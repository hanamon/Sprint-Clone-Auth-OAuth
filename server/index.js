const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const controllers = require('./controllers');

const app = express();
const PORT = process.env.PORT || 8080;

// 미들웨어
app.use(express.json());
app.use(morgan('dev'));
app.use(cors({
  origin: ['http://localhost:3000']
}));

// 라우팅
app.post('/callback', controllers.handleCallback);
app.get('/images', controllers.handleImages);

// 서버 실행
app.listen(PORT, () => {
  console.log(`🚀 server runnning! listening on port ${PORT}`)
});

module.exports = app;
