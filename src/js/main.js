{

  let view = {
    el: '#main .main-header',
    template: `
      <div class="main-title">__name</div>
    `,
    render(data) {
      let html = this.template
      html = html.replace('__name', data.name)
      $(this.el).html(html)
    }
  }
  let model = {
    name: ''
  }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.render(this.model)
      this.bindEvents()
    },
    bindEvents() {
      window.eventHub.on('update:menuList', (data) => {
        console.log(data, '123');
        this.model = data
        this.view.render(data)
      })
    }
  }
  controller.init(view, model)
}