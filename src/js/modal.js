{
  let view = {
    el: '#modalContainer',
    template: `
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">__action歌曲</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <form id="newSong-form">
                <div class="mb-3">
                  <label for="name" class="form-label">名称:</label>
                  <input type="text" class="form-control" name="name" >
                </div>
                <div class="mb-3">
                  <label for="singer" class="form-label">歌手:</label>
                  <input type="text" class="form-control" name="singer">
                </div>
                <div class="mb-3">
                  <label for="link" class="form-label">外链:</label>
                  <input type="text" class="form-control" name="link">
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">上传音乐</label>
                  <input class="form-control" type="file" id="formFile" name="file">
                </div>
                <div class="submit-btn">
                  <button data-bs-dismiss="modal" type="submit" class="btn btn-primary">保存</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `,
    render(data) {
      let html = this.template
      for (let key in data) {
        html = html.replace(`__${key}`, data[key])
      }
      $(this.el).html(html)
    },
    moodRender(data) {
      $('#exampleModalLabel').text(data.action)
      $('#newSong-form input[name="name"]').val(data.name)
      $('#newSong-form input[name="singer"]').val(data.singer)
      $('#newSong-form input[name="link"]').val(data.link)
      $('#newSong-form input[name="file"]').val('')
    },
    linkRender(link) {
      console.log(123)
      $('#newSong-form input[name="link"]').val(link)
    }
  }
  let model = {
    data: {
      action: '新建'
    },
    create(options) {
      // 声明 class
      const SongList = AV.Object.extend('SongList');

      const sl = new SongList();

      for (let key in options) {
        if (key) {
          sl.set(key, options[key]);
        }
      }

      return sl.save();
    },
    update(options) {
      const sl = AV.Object.createWithoutData('SongList', options.id);

      for (let key in options) {
        if (key) {
          sl.set(key, options[key]);
        }
      }
      return sl.save();
    },
    getToken() {
      return axios.get('/uploadToken')
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.render(this.model.data)
      this.bindEvents()
      this.bindEventHub()
    },
    bindEventHub() {
      window.eventHub.on('update:song', (data) => {
        this.model.data = Object.assign(this.model.data, data)
      })
    },
    bindEvents() {
      $(this.view.el).find('#newSong-form').on('submit', (e) => {
        e.preventDefault()
        let options = {}
        Array.from(e.target).map((item) => options[item.name] = item.value)
        if (!options.name || !options.singer || !options.link) {
          alert('请完善信息！')
          return false
        }

        if (this.model.data.id) {
          let data = {
            name: options.name,
            id: this.model.data.id,
            link: options.link,
            singer: options.singer,
          }
          this.model.update(data).then((res) => {
            window.eventHub.emit('update:songList')
          })
        } else {
          this.model.create(options).then(() => {
            window.eventHub.emit('update:songList')
          })
        }
      })

      $(this.view.el).find('input[type="file"]').on('change', (e) => {
          let selectedFile = e.target.files[0]

          this.model.getToken().then(({ data }) => {
            let { uploadToken } = data

            this.uploadFile(selectedFile, selectedFile.name, uploadToken)
            // this.getUploadUrl(data)
          })
      })


      var myModal = document.getElementById('exampleModal')
      myModal.addEventListener('shown.bs.modal', (e) => {
        let action = e.relatedTarget.innerText
        switch (action) {
          case '新建歌曲':
            this.model.data.action = '新建歌曲'
            break;
          case '修改':
            this.model.data.action = '修改歌曲'
            break;
          default:
            this.model.data.action = ''
        }
        this.view.moodRender(this.model.data)
      })
    },
    uploadFile(file, name, token) {
      const _this = this
      const observable = qiniu.upload(file, name, token)
      const subscription = observable.subscribe(function next(res) {

      }, function error(err) {

      }, function complete(res) {
        let { key } = res
        _this.view.linkRender(window.baseURL + '/' + key)
      })
    },
    // getUploadUrl({uploadToken, config}) {
    //   console.log(123)
    //   qiniu.getUploadUrl(config, uploadToken).then(res => {
    //     console.log(res, 'url')
    //   })
    // }
  }
  controller.init(view, model)
}