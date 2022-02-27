{
    let view = {
        el: '#songs'
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
            console.log('加载page2')
        }
    }
    controller.init(view, model)
}