{
  let view = {
    el: '#main .table-container',
    template: `
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
    render(data) {
      $(this.el).html(this.template)
      for(let i=0; i<data.length; i++) {
        $('#songList').append(
        `<tr>
          <td valign="middle">${data[i].name}</td>
          <td valign="middle">${data[i].singer}</td>
          <td valign="middle">${data[i].link}</td>
          <td>
            <button type="button" class="btn btn-link">删除</button>
            <button type="button" class="btn btn-link">修改</button>
          </td>
        </tr>`
        )
      }
      
    }
  }

  let model = {
    data: {
      songList: []
    },
    create() {
      const query = new AV.Query('SongList');
      query.find().then((songs) => {
        const newData = songs.map(item => item.attributes)
        this.data.songList = newData
        window.eventHub.emit('update:songList', newData)
      });
    }
  }

  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.model.create()
      this.view.render(this.model.data.songList)
      this.bindEventHub()
    },
    bindEventHub() {
      window.eventHub.on('update:songList', (songs) => {
        this.view.render(songs)
      })
      window.eventHub.on('save:song', () => {
        this.model.create()
      })
    }
  }
  controller.init(view, model)
}