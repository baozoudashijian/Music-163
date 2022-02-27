{
    let view = {
        
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
            console.log('load model page-1-2')
        }
    }
    controller.init(view, model)
}