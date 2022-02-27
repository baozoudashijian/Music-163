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
            this.loadModelOne()
            this.loadModelTwo()
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
        },
        loadModelOne() {
            let script = document.createElement('script')
            script.src = './js/page-1-1.js'
            document.body.append(script)
        },
        loadModelTwo() {
            let script = document.createElement('script')
            script.src = './js/page-1-2.js'
            document.body.append(script)
        }
    }
    controller.init(view, model)
}