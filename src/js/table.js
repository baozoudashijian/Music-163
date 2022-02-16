{
  let view = {
    el: '#main .table-container',
    template: `
    <div class="table-action">
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever="@mdo">新建歌曲</button>
    </div>
    <table class="table">
      <thead>
      <tr>
        <th scope="col">#</th>
        <th scope="col">First</th>
        <th scope="col">Last</th>
        <th scope="col">Handle</th>
      </tr>
      </thead>
      <tbody>
      <tr>
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
      </tr>
      <tr>
        <th scope="row">2</th>
        <td>Jacob</td>
        <td>Thornton</td>
        <td>@fat</td>
      </tr>
      <tr>
        <th scope="row">3</th>
        <td colspan="2">Larry the Bird</td>
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