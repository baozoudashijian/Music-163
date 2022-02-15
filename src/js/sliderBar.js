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
      this.bindEvents()
    },
    bindEvents() {
      $(this.view.el).on('click', '.menu-list' , function(e) {
        $(this).children().removeClass('active')
        $(e.target).parent().addClass('active')
      })
    }
  }
  controller.init(view, model)
}