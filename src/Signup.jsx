import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function SignupPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "RChain-Vote注册";
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    if(password!=password2){
      setErrorMessage('两次密码不一致哦，再看看吧。');
    }else{
      try {
        setErrorMessage('正在注册，请稍候...');
        const response = await fetch(`http://localhost:15000/api/add_rchain_user?username=${username}&password=${password}`);
        const data = await response.json();
        if (data.error) {
          throw new Error(data.error);
        }else{
          setErrorMessage(data.message);
          setTimeout(() => {
            navigate(`/`);  // 跳转到登录
        }, 2000); // 2000毫秒，即2秒
        }
     } catch (error) {
       setErrorMessage(error.message || '注册失败');
     }
    }
  };
  return (
    <div id={styles.loginform}>
      <h2 id={styles.headerTitle}>RChain-Vote注册</h2>
      <div>
          <form onSubmit={handleSubmit}>

          <div class={styles.row}>
          <label>用户名</label>
          <input
              placeholder="输入用户名..." 
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
            
          <div class={styles.row}>
          <label>密码</label>
          <input
              placeholder="输入密码..."
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div class={styles.row}>
          <label>确认密码</label>
          <input
              placeholder="确认密码..."
              type="password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
            />
          </div>

          <div class={styles.rightAlign}>
                <a href='/' id={styles.signupLink}>已有账号？去登录！</a>
              </div>
            
          <div class={styles.row}>
          <button className="loginButton" type="submit">注册</button>
          </div>

          </form>

          <div id={styles.alternativeLogin}>
            <label>{errorMessage}</label>
          </div>
      </div>
    </div>
  );
}

export default SignupPage;
