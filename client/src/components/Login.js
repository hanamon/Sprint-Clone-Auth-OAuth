function Login() {
  const socialLoginHandler = () => {
    const GITHUB_LOGIN_URL = 'https://github.com/login/oauth/authorize?client_id=f5bf4e3c2d84627c4df9';
    window.location.assign(GITHUB_LOGIN_URL);
  }

  return (
    <div className="loginContainer">
      OAuth 2.0으로 소셜로그인 구현하기
      <img id="logo" alt="logo" src="https://image.flaticon.com/icons/png/512/25/25231.png" />
      <button className="socialloginBtn" onClick={socialLoginHandler} >
        GitHub으로 로그인
      </button>
    </div>
  )
}

export default Login;
