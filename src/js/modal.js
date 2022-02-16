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
              <form>
                <div class="mb-3">
                  <label for="name" class="form-label">名称:</label>
                  <input type="text" class="form-control" id="name" >
                </div>
                <div class="mb-3">
                  <label for="singer" class="form-label">歌手:</label>
                  <input type="text" class="form-control" id="singer">
                </div>
                <div class="mb-3">
                  <label for="link" class="form-label">外链:</label>
                  <input type="text" class="form-control" id="link">
                </div>
                <button type="submit" class="btn btn-primary">保存</button>
              </form>
            </div>
            <!--      <div class="modal-footer">-->
            <!--        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>-->
            <!--        <button type="button" class="btn btn-primary" data-bs-dismiss="modal">Save changes</button>-->
            <!--      </div>-->
          </div>
        </div>
      </div>
    `,
    render() {
      $(this.el).append(this.template)
    }
  }
  let model = {}
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.render()
    }
  }
  controller.init(view, model)
}