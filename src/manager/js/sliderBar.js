{
  let view = {
    el: '#sliderBar',
    template: `
      <div class="menu-title">
        <h2>音乐地带</h2>
      </div>
      <ul class="menu-list">
        <li class="item active">
          <a class="link" href="#">全部歌曲</a>
        </li>
        <li class="item ">
          <a class="link" href="#">歌单管理</a>
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
      window.eventHub.emit('update:menuList', {name: $(this.view.el + ' .active').text().trim()})
      this.bindEvents()
    },
    bindEvents() {
      $(this.view.el).on('click', '.menu-list li' , function(e) {
        $(e.target).parent().removeClass('active').siblings().removeClass('active')
        $(e.target).parent().addClass('active')
        window.eventHub.emit('update:menuList', {name: $(e.target).text()})
      })
    }
  }
  controller.init(view, model)
}