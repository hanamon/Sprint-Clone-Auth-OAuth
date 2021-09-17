import axios from 'axios';
import React, { useState, useEffect } from 'react';

function Mypage({ accessToken }) {
  const [userInfo, setUserInfo] = useState({});
  const [images, setImages] = useState([]);

  const getGitHubUserInfo = async () => {
    // GitHub API를 통해 사용자 정보를 받아온다.
    try {
      const result = await axios.get('https://api.github.com/user', { headers: { authorization: `token ${accessToken}` } });
      //console.log(result.data);
      const { name, login, html_url, public_repos } = result.data;
      setUserInfo({ name, login, html_url, public_repos });
    } catch (err) {
      console.log(err);
    }
  }

  const getImages = async () => {
    try {
      const result = await axios.get('http://localhost:8080/images', { headers: { authorization: `token ${accessToken}` } });
      const { images } = result.data;
      setImages(images);
    }
    catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    if( accessToken ) {
      getGitHubUserInfo();
      getImages();
    }
  }, [accessToken]);

  return (
    <div>
      {
        ! accessToken
        ? <div>로그인이 필요합니다.</div>
        : (
          <div className='mypageContainer'>
            <h3>Mypage</h3>
            <div>
              안녕하세요.
              <span className="name" id="name">{userInfo.name}</span>님!
              GitHub 로그인이 완료되었습니다.
            </div>
            <div>
              <div className="item">
                나의 로그인 아이디:
                <span id="login">{userInfo.login}</span>
              </div>
              <div className="item">
                나의 GitHub 주소:
                <span id="html_url">{userInfo.html_url}</span>
              </div>
              <div className="item">
                나의 public 레포지토리 개수:
                <span id="public_repos">{userInfo.public_repos}</span>
              </div>
            </div>
            <div className="images">
              {
                images.map((img, idx) => {
                  return <img key={idx} src={img.blob} />
                })
              }
            </div>
          </div>
        )
      }
    </div>
  )
}

export default Mypage;
