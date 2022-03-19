{
  let view = {
    el: '#main .table-container',
    allSongTemplate: `
    <div class="table-action">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">新建歌曲</button>
    </div>
    <table class="table table-lg">
      <thead>
        <tr>
          <th scope="col">歌曲名</th>
          <th scope="col">歌手</th>
          <th scope="col">外链</th>
          <th scope="col">操作</th>
        </tr>
      </thead>
      <tbody id="songList">
      
      </tbody>
      
    </table>
  `,
    songSheetTemplate: `
    <div class="table-action2">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#songSheetModel" data-bs-whatever="@mdo">新建歌单</button>
        <div id="songSheet" class="songSheet-wrapper">
          <div class="songSheet">
            <ul>
              
            </ul>
          </div>
        </div>
    </div>
    `,
    render(data, tmpl) {
      let rTmpl = tmpl + 'Template'
      $(this.el).html(this[rTmpl])
      if(tmpl == 'allSong') {
        for (let i = 0; i < data.length; i++) {
          $('#songList').append(
            `<tr>
              <td valign="middle">${data[i].name}</td>
              <td valign="middle">${data[i].singer}</td>
              <td valign="middle">${data[i].link}</td>
              <td data-id=${data[i].id}>
                <button type="button" class="btn btn-link" data-bs-toggle="modal" data-bs-target="#exampleModal">修改</button>
                <button type="button" class="btn btn-link">删除</button>
              </td>
            </tr>`
          )
        }
      }else if(tmpl == 'songSheet') {
        for (let i = 0; i < data.length; i++) {
          $('#songSheet ul').append(
            `
            <li>
              <div class="img">
                <img src="http://p1.music.126.net/IuAJjunTO_-d_Ts0pryc7g==/109951166267802608.jpg?param=140y140" />
              </div>
              <p>${data[i].name}</p>
            </li>
            `
          )
        }
       }
    }
  }

  let model = {
    data: {
      songList: [],
      songSheet: [],
      tmpl: 'allSong'
    },
    queryAll() {
      const query = new AV.Query('SongList');
      return query.find().then((songs) => {
        const newData = songs.map(item => Object.assign(item.attributes, { id: item.id }))
        this.data.songList = newData
        return songs
      });
    },
    remove(id) {
      const sl = AV.Object.createWithoutData('SongList', id);
      return sl.destroy();
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
      this.bindEvents()
      this.bindEventHub()
      if(this.model.data.tmpl == 'allSong') {
        window.eventHub.emit('update:songList')
      }else if(this.model.data.tmpl == 'songSheet') {
        window.eventHub.emit('update:songSheet') 
      }
      this.test()
    },
    bindEventHub() {
      let _this = this
      window.eventHub.on('update:songList', () => {
        _this.model.queryAll().then((res) => {
          _this.view.render(this.model.data.songList, 'allSong')
          _this.close()
        })

      })

      window.eventHub.on('update:songSheet', () => {
        _this.model.queryAllSongSheet().then((res) => {
          _this.view.render(this.model.data.songSheet, 'songSheet')
          _this.close()
        })

      })

      window.eventHub.on('update:menuList', (tmpl) => {
        let { name } = tmpl
        if(name == '全部歌曲') {
          _this.model.data.tmpl = 'allSong'
          window.eventHub.emit('update:songList')
        }else if(name == '歌单管理') {
          _this.model.data.tmpl = 'songSheet'
          window.eventHub.emit('update:songSheet')
        }
        
      })
    },
    bindEvents() {
      $(this.view.el).on('click', '#songList button', (e) => {
        let t = e.target.innerText
        let id = $(e.target).parent().attr('data-id')
        if (t == '修改') {
          window.eventHub.emit('update:song', this.model.data.songList.filter(item => item.id === id)[0])
        }
        if(t == '删除') {
          let d = window.confirm('确定要删除当前歌曲吗？')
          if(d) {
            this.model.remove(id).then(() => {
              window.eventHub.emit('update:songList')
            })
          } else {
            console.log('取消')
          }
        }
      })

      // 新增清空数据
      $(this.view.el).on('click', '.table-action button', (e) => {
        e.preventDefault()
        window.eventHub.emit('update:song', { name: '', singer: '', link: '', id: '' })
      })

      // 新建歌单
      $(this.view.el).on('click', '.table-action2 button', (e) => {
        e.preventDefault()
        // window.eventHub.emit('update:song', { name: '', singer: '', link: '', id: '' })
      })
    },
    close() {
      $('#table-loading').hide()
    },
    test() {
      //https://leancloud.cn/docs/relation-guide.html#hash770451367
      // const SongSheet = AV.Object.createWithoutData('SongSheet', '56545c5b00b09f857a603632');
      // const query = new AV.Query('SongList');
      // query.equalTo('dependent', SongSheet);
      // query.find().then((songs) => {
      //     // cities 为广东省下辖的所有城市
      // });
    

      // 按照上诉文档的方式并不行，下面是我自己根据理解猜出的方式
      const query = new AV.Query('SongList');
      query.equalTo('dependent', '6231e946c62513794f8d2b31');
      query.find().then((songs) => {
          // cities 为广东省下辖的所有城市
          console.log(songs, 'songs')
      });
    }
  }
  controller.init(view, model)
}