{
    let view = {
        el: '.page-1 .songs'
    }

    let model = {

    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.bindEvent()
        },
        bindEvent() {
            console.log('加载page1')
        }
    }
    controller.init(view, model)
}