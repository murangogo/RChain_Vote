const express = require('express');
const pgPromise = require('pg-promise');
const app = express();
const pgp = pgPromise();
const connection = {
    host: 'ep-wispy-sun-12751723-pooler.us-east-1.postgres.vercel-storage.com',
    port: 5432,
    database: 'verceldb',
    user: 'default',
    password: 'Uu2KczRb3qMZ',
    ssl: { rejectUnauthorized: false }
};
const db = pgp(connection);

// 添加 CORS 头部中间件
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  // 允许的其他头部信息，根据你的需求添加
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.get('/api/check_login_user', async function (request, response) {
  try {
    console.log("有人在登录......");
    const inputUsername = request.query.username;

    // 检查是否提供了用户名
    if (!inputUsername || inputUsername.trim() === '') {
      throw new Error('登录需要用户名哦。');
  }

    // 查询用户名对应的密码
    const result = await db.oneOrNone('SELECT password FROM rchainusers WHERE username = $1', [inputUsername]);
    // 检查查询结果
    if (result==null) {
      return response.status(404).json({ error: '您还没有注册哦。' });
    }
    const password = result.password;
    return response.status(200).json({ password });
  } catch (error) {
    return response.status(500).json({ error: error.message });
  }
});

app.get('/api/add_rchain_user', async function (request, response) {
  try {
    console.log("有人在注册......");
    const username = request.query.username;
    const password = request.query.password;
    if (!username || !password) throw new Error('注册需要把信息填写完整哦。');

    console.log("正在插入...");
    await db.none('INSERT INTO rchainusers(username, password) VALUES($1, $2)', [username, password]);
    console.log("插入成功...");
  } catch (error) {
    return response.status(500).json({ error:error.message });
  }
  return response.status(200).json({ message:"注册成功，即将跳转到登录界面。" });
});

app.listen(15000, function () {
  console.log('服务器，启动！');
});
