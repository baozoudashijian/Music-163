{
    let view = {
        el: '.page-1',
        show() {
            this.el.show()
        },
        hide() {
            this.el.hide()
        }
    }

    let model = {

    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.bindEvent()
            this.bindEventHub()
        },
        bindEvent() {
            console.log('加载page1')
        },
        bindEventHub() {
            let _this = this
            window.eventHub.on('select:tab', function(data) {
                if(data == 'page-1') {
                    console.log(data)
                    $(_this.view.el).show()
                }else{
                    $(_this.view.el).hide()
                }
            })
        }
    }
    controller.init(view, model)
}