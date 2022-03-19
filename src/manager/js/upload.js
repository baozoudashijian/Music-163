
function getToken() {
    return axios.get('/uploadToken')
}

function uploadFile(file, name, token, cb) {
    const _this = this
    const observable = qiniu.upload(file, name, token)
    const subscription = observable.subscribe(function next(res) {

    }, function error(err) {

    }, function complete(res) {
      let { key } = res
      cb(window.baseURL + '/' + key)
    })
  }

window.upload = function (selectedFile, cb) {
    console.log(1)
    getToken().then(({ data }) => {
        console.log(data, '2')
        let { uploadToken } = data
        uploadFile(selectedFile, selectedFile.name, uploadToken, cb)
        // this.getUploadUrl(data)
    })
}