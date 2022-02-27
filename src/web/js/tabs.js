
let view = {
    el: '#tabs'
}

let model = {

}

let controller = {
    init: function(view, model) {
        this.view = view
        this.model = model
        this.bindEvent()
        this.bindEventHub()
        this.loadPageOneModel()
        this.loadPageTwoModel()
        this.loadPageThreeModel()
    },
    bindEvent: function() {
        $(this.view.el).on('click', '.tabs-nav li', function(e) {
            let dataTabName = $(this).attr('data-tab-name')
            // content展示
            // $('.tab-content li[class=' + dataTabName + ']').show().siblings().hide()
            // 下划线展示逻辑
            $(this).addClass('show').siblings().removeClass('show')
            window.eventHub.emit('select:tab', dataTabName)
        })
    },
    bindEventHub: function() {
        window.eventHub.on('test', function(data) {
            console.log(data)
        })
    },
    loadPageOneModel: function() {
        let script = document.createElement('script')
        script.src = './js/page-1.js'
        document.body.append(script)
    },
    loadPageTwoModel: function() {
        let script = document.createElement('script')
        script.src = './js/page-2.js'
        document.body.append(script)
    },
    loadPageThreeModel: function() {
        let script = document.createElement('script')
        script.src = './js/page-3.js'
        document.body.append(script)
    }
}

controller.init(view, model)