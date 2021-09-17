import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import Login from './components/Login';
import Mypage from './components/Mypage';

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState('');

  const getAccessToken = (authorizationCode) => {
    // 받아온 authorization code로 다시 OAth App에 요청해서 access token을 받을 수 있다.
    axios.post('http://localhost:8080/callback', { authorizationCode })
    .then((res) => {
      setIsLogin(true);
      setAccessToken(res.data.accessToken);
    })
    .catch((err) => {
      console.log(err);
    });
  }

  useEffect(() => {
    const url = new URL(window.location.href);
    const authorizationCode = url.searchParams.get('code');
    if( authorizationCode ) {
      // authorization server로 부터 리티렉션 된 경우, authorization code가 함께 전달된다.
      // ex) http://localhost:3000/?code=5e52fb85d6a1ed46a51f
      getAccessToken(authorizationCode);
    }
  }, []);

  return (
    <BrowserRouter>
      <div className="App">
        {
          ! isLogin
          ? <Login />
          : <Mypage accessToken={accessToken} />
        }
      </div>
    </BrowserRouter>
  );
}

export default App;
