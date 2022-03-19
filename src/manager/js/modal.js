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
                  <label for="link" class="form-label">歌曲外链:</label>
                  <input type="text" class="form-control" name="link">
                </div>
                <div class="mb-3">
                  <label for="post" class="form-label">封面外链:</label>
                  <input type="text" class="form-control" name="post">
                </div>
                <div class="mb-3">
                  <label for="sheet" class="form-label">关联歌单:</label>
                  <select name="sheet" id="songSheetSelect" class="form-select" aria-label="Default select example">
                    
                  </select>
                </div>
                <div class="mb-3">
                  <label for="formFile" class="form-label">上传音乐</label>
                  <input class="form-control" type="file" id="formFile" name="file">
                </div>
                <div class="mb-3">
                  <label for="postFile" class="form-label">上传封面</label>
                  <input class="form-control" type="file" id="postFile" name="file">
                </div>
                <div class="mb-3">
                  <label for="lyric" class="form-label">歌词</label>
                  <textarea class="form-control" rows="3" name="lyric"></textarea>
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
      $('#newSong-form textarea[name="lyric"]').val(data.lyric)
      $('#newSong-form input[name="post"]').val(data.post)
      $('#newSong-form input[name="file"]').val('')
    },
    linkRender(link, id) {
      if(id == 'formFile') {
        $('#newSong-form input[name="link"]').val(link)
      }else if (id == 'postFile') {
        $('#newSong-form input[name="post"]').val(link)
      }
      
    },
    selectRender(data, dependent) {
      let html = '<option value=“”>请选择</option>'
      data.map((item) => {
        html += `<option ${item.id == dependent ? "selected" : ''} value='${item.id}'>${item.name}</option>`
      })
      $('#songSheetSelect').html(html)
    }
  }
  let model = {
    data: {
      action: '新建',
      songSheet: []
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
    },
    queryAllSongSheet() {
      const query = new AV.Query('SongSheet');
      return query.find().then((songSheet) => {
        const newData = songSheet.map(item => Object.assign(item.attributes, { id: item.id }))
        this.data.songSheet = newData
        return songSheet
      });
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
        // 非必填字段 缓存之前数据
        let d = this.unCacheProps(data, ['dependent', 'post', 'lyric'])
        this.model.data = Object.assign(this.model.data, d)
      })
    },
    unCacheProps(data, arr) {
      arr.map((item) => {
        data[item] = data[item] ? data[item] : ''
      })
      return data
    },
    bindEvents() {
      $(this.view.el).find('#newSong-form').on('submit', (e) => {
        e.preventDefault()
        let options = {}
        Array.from(e.target).map((item) => options[item.name] = item.value)
        if (!options.name || !options.singer || !options.link || !options.lyric) {
          alert('请完善信息！')
          return false
        }

        if (this.model.data.id) {
          let data = {
            name: options.name,
            id: this.model.data.id,
            link: options.link,
            singer: options.singer,
            lyric: options.lyric,
            post: options.post,
            dependent: options.sheet
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
          let id = e.currentTarget.id
          console.log(e)

          this.model.getToken().then(({ data }) => {
            let { uploadToken } = data
            this.uploadFile(selectedFile, selectedFile.name, uploadToken, id)
            // this.getUploadUrl(data)
          })
      })


      var myModal = document.getElementById('exampleModal')
      // model 监听事件是异步，点击按钮触发 > eventHub更新数据 > 展示model > 根据eventHub更新的数据去展示弹框的内容
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
        this.model.queryAllSongSheet().then((res) => {
          this.view.selectRender(this.model.data.songSheet, this.model.data.dependent)
        })
      })
    },
    uploadFile(file, name, token, id) {
      const _this = this
      const observable = qiniu.upload(file, name, token)
      const subscription = observable.subscribe(function next(res) {

      }, function error(err) {

      }, function complete(res) {
        let { key } = res
        _this.view.linkRender(window.baseURL + '/' + key, id)
      })
    }
    // getUploadUrl({uploadToken, config}) {
    //   console.log(123)
    //   qiniu.getUploadUrl(config, uploadToken).then(res => {
    //     console.log(res, 'url')
    //   })
    // }
  }
  controller.init(view, model)
}