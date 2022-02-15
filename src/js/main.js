{

  let view = {
    el: '#main',
    template: `
      <div class="main-title">__name</div>
    `,
    render() {
      html = this.template
      $(this.el).html(html)
    }
  }
  let model = { }
  let controller = {
    init(view, model) {
      this.view = view
      this.model = model
      this.view.render()
    }
  }
  controller.init(view, model)
}