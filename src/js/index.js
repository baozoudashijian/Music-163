let selectedFile
$('input[type="file"]').change(function(e){
  selectedFile = e.target.files[0]

  axios.get('/uploadToken').then(({data}) => {
    let { uploadToken } = data
    const observable = qiniu.upload(selectedFile, selectedFile.name, uploadToken)
    const subscription = observable.subscribe(function next(res) {

    }, function error(err) {

    }, function complete(res) {
      console.log(res)
    })
  })
})