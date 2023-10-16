import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Login.module.css';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "RChain-Vote登录";
  }, []); 

  const handleSubmit = async (e) => {
    e.preventDefault();

    // 查询密码
   try {
      setErrorMessage('正在登录，请稍候...');
      const response = await fetch(`http://localhost:15000/api/check_login_user?username=${username}`);
      const data = await response.json();
      console.log(data);
      if (data.error) {
        throw new Error(data.error);
      }
      if (data.password === password) {
        setErrorMessage('登录成功，即将跳转到首页。');
        setTimeout(() => {
          navigate(`/home?username=${username}`);  // 跳转到主页面
      }, 2000); // 2000毫秒，即2秒
      } else {
        setErrorMessage('密码不正确。');
      }
   } catch (error) {
     setErrorMessage(error.message || '登录失败');
   }
  };
  return (
    <div id={styles.loginform}>
      <h2 id={styles.headerTitle}>RChain-Vote登录</h2>
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
            
            <div class={styles.rightAlign}>
                <a href='/signup' id={styles.signupLink}>没有账号？去注册！</a>
              </div>
          
            
          <div class={styles.row}>
          <button type="submit">登录</button>
          </div>

          </form>

          <div id={styles.alternativeLogin}>
            <label>{errorMessage}</label>
          </div>
      </div>
    </div>
  );
}

export default LoginPage;
