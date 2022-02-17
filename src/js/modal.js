{
  let view = {
    el: 'body',
    template: `
      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">新建歌曲</h5>
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
                <div class="submit-btn">
                  <button type="submit" class="btn btn-primary">保存</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    `,
    render() {
      $(this.el).append(this.template)
    }
  }
  let model = {
    create(options) {
      // 声明 class
      AV.init({
        appId: window.appId,
        appKey: window.appKey,
        serverURL: window.serverURL
      });
      const SongList = AV.Object.extend('SongList');

      const sl = new SongList();

      for(let key in options) {
        if(key) {
          sl.set(key, options[key]);
        }
      }

      sl.save().then((data) => {
        console.log(`保存成功。数据 =>：${data}`);
      }, (error) => {
        console.log(error)
      });
    }
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.render()
      this.bindEvents()
    },
    bindEvents() {
      $(this.view.el).find('#newSong-form').on('submit', (e) => {
        e.preventDefault()
        let options = {}
        console.log(e.target)
        Array.from(e.target).map((item) => options[item.name] = item.value)
        console.log(options)
        this.model.create(options)
      })
    }
  }
  controller.init(view, model)
}