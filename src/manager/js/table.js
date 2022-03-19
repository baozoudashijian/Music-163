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
            <li data-id=${data[i].id}>
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
      tmpl: 'songSheet'
    },
    queryAll(id) {
      if(id) {
        return this.querySongSheetAllSong(id)
      } else {
        const query = new AV.Query('SongList');
        return query.find().then((songs) => {
          const newData = songs.map(item => Object.assign(item.attributes, { id: item.id }))
          this.data.songList = newData
          return songs
        });
      }
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
    },
    querySongSheetAllSong(id) {
      const query = new AV.Query('SongList');
      query.equalTo('dependent', id);
      return query.find().then((songs) => {
        console.log(songs, '123')
        const newData = songs.map(item => Object.assign(item.attributes, { id: item.id }))
        this.data.songList = newData
        return songs
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
    },
    bindEventHub() {
      let _this = this
      window.eventHub.on('update:songList', (id) => {
        _this.model.queryAll(id).then((res) => {
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

      window.eventHub.on('update:menuList', (tmpl, id) => {
        let { name } = tmpl
        console.log(id, '123')
        if(name == '全部歌曲') {
          _this.model.data.tmpl = 'allSong'
          window.eventHub.emit('update:songList', id)
        }else if(name == '歌单管理') {
          _this.model.data.tmpl = 'songSheet'
          window.eventHub.emit('update:songSheet', id)
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
      
      $(this.view.el).on('click', '#songSheet ul li', (e) => {
        let id = $(e.currentTarget).attr('data-id')
        console.log(id, '1')
        window.eventHub.emit('update:menuList', {name: "全部歌曲"}, id)
      })
    },
    close() {
      $('#table-loading').hide()
    }
  }
  controller.init(view, model)
}