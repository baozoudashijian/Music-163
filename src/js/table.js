{
  let view = {
    el: '#main .table-container',
    template: `
    <div class="table-action">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">新建歌曲</button>
    </div>
    <table class="table>
      <thead>
      <tr>
        <th scope="col">歌曲名</th>
        <th scope="col">歌手</th>
        <th scope="col">外链</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <td>Larry the Bird</td>
        <td>Larry the Bird</td>
        <td>@twitter</td>
      </tr>
      </tbody>
    </table>
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