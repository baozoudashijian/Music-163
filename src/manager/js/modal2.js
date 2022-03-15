{
    let view = {
        el: '#modalContainer2',
        template: `
        <div class="modal fade" id="songSheetModel" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">__action歌单</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="newSong-form">
                            <div class="mb-3">
                                <label for="name" class="form-label">名称:</label>
                                <input type="text" class="form-control" name="name" >
                            </div>
                            <div class="mb-3">
                                <label for="description" class="form-label">简介:</label>
                                <textarea rows="6" class="form-control" name="description"></textarea>
                            </div>
                            <div class="submit-btn">
                                <button data-bs-dismiss="modal" type="submit" class="btn btn-primary">保存</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        `,
        render(data) {
            console.log(data)
            let html = this.template
            html = html.replace('__action', data.action)
            $(this.el).html(html)
        }
    }
    let model = {
        data: {
            action: '新建'
        }
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data)
        }
    }
    controller.init(view, model)
}