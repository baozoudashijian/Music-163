{
  let view = {
    el: '#sliderBar',
    template: `
      <div class="menu-title">
        <h2>音乐地带</h2>
      </div>
      <ul class="menu-list">
        <li class="item active">
          <a class="link" href="#">概览</a>
        </li>
        <li class="item">
          <a class="link" href="#">音乐管理</a>
        </li>
      </ul>
    `,
    render() {
      $(this.el).html(this.template)
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