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
                            <div class="mb-3">
                                <label for="link" class="form-label">封面链接</label>
                                <input class="form-control" type="text" id="link" name="link">
                            </div>
                            <div class="mb-3">
                                <label for="postFile" class="form-label">上传封面</label>
                                <input class="form-control" type="file" id="postFile" name="file">
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
            let html = this.template
            html = html.replace('__action', data.action)
            $(this.el).html(html)
        },
        linkRender(link) {
            $('#modalContainer2 input[name="link"]').val(link)
        }
    }
    let model = {
            data: {
                action: '新建'
            },
            create(options) {
                // 声明 class
                const SongSheet = AV.Object.extend('SongSheet');

                const ss = new SongSheet();

                for (let key in options) {
                    if (key) {
                        ss.set(key, options[key]);
                    }
                }

                return ss.save();
            }
        }

    let controller = {
            init(view, model) {
                this.view = view
                this.model = model
                this.view.render(this.model.data)
                this.bindEvent()
            },
            bindEvent() {
                $(this.view.el).find('#songSheetModel').on('submit', (e) => {
                    e.preventDefault()
                    let options = {}
                    Array.from(e.target).map((item) => item.name && (options[item.name] = item.value))
                    if (!options.name || !options.description) {
                        alert('请完善信息!')
                        return false
                    }
                    this.model.create(options).then((res) => {
                        window.eventHub.emit('update:songSheet')
                    })

                })

                $(this.view.el).find('input[type="file"]').on('change', (e) => {
                    let selectedFile = e.target.files[0]
                    let id = e.currentTarget.id
          
                    window.upload(selectedFile, (res) => {
                      this.view.linkRender(res)
                    })
                })
            }
        }
    controller.init(view, model)
    }