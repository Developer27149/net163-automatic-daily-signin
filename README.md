## 网易云音乐自动签到

仅以此仓库，献给学习`github action`的夜晚。

### 原理

使用`github action`的功能，定时执行`workflows`，核心脚本利用了 [Binaryify/NeteaseCloudMusicApi: 网易云音乐 Node.js API service](https://github.com/Binaryify/NeteaseCloudMusicApi) 这个`node`库来实现登录和签到。

### 使用

如果想要使用此仓库，欢迎`fork`。
并且，添加以下几个`secret`:

- PHONE: 手机号（网易云音乐账号）
- PASSWORD: 网易云音乐密码

支持`gmail`通知打卡异常报告，如果需要则增加以下三个`secret`:

- CLIENT_ID: 客户端 ID
- CLIENT_SECRET：客户端秘钥
- EMAIL: 邮件
- PRIVATE_KEY：私钥
- REFRESH_TOKEN: 重置 TOKEN

> 由于`google`在 2022.3.30 开始不在支持直接使用账号密码发送邮件，因此需要配置`oauth2`项目认证。

### 最后

欢迎与我联系 👏🏻
