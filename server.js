const express = require('express')
const path = require('path')
const fs = require('fs')

const app = express()

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, 'src', 'index.html'))
})

let config = fs.readFileSync('./qiniu-key.json')
config = JSON.parse(config) // buffer格式 需要转换
console.log(config)

app.listen('3000', function () {
  console.log('Server is running...')
})