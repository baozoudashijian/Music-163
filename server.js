const express = require('express')
const path = require('path')
const fs = require('fs')
const qiniu = require('qiniu')

const app = express()

// 签到
// 签到
// 签到
// 指定静态目录
app.use('/', express.static(__dirname))
// 指定多个静态目录
app.use('/', express.static(__dirname + '/src'))
app.use('/', express.static(__dirname + '/src/web'))

app.get('/', function (req, res) {
  res.sendFile('/src/web/index.html', {
    root: __dirname
  })
})

app.get('/manager', function (req, res) {
  res.sendFile('/src/manager/index.html', {
    root: __dirname
  })
})

app.get('/uploadToken', function (req, res) {
  let { uploadToken, config} = getToken()
  res.json({uploadToken, config})
})

let port = process.env.PORT || 3000

app.listen(port, function () {
  console.log('Server is running...')
})

//-------------------Function-------------------//

function getToken() {
  let config = fs.readFileSync('./qiniu-key.json')
  config = JSON.parse(config) // buffer格式 需要转换
  let {accessKey, secretKey} = config
  let mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  let options = {
    scope: 'music-163s',
  };
  let putPolicy = new qiniu.rs.PutPolicy(options);
// 每次启动的uploadToken都是一样的.
  let uploadToken = putPolicy.uploadToken(mac);

  console.log(uploadToken)
  return {config, uploadToken}
}