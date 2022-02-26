
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
    },
    bindEvent: function() {
        $(this.view.el).on('click', '.tabs-nav li', function(e) {
            let dataTabName = $(this).attr('data-tab-name')
            // content展示
            $('.tab-content li[class=' + dataTabName + ']').show().siblings().hide()
            // 下划线展示逻辑
            $(this).addClass('show').siblings().removeClass('show')
            window.eventHub.emit('test', dataTabName)
        })
    },
    bindEventHub: function() {
        window.eventHub.on('test', function(data) {
            console.log(data)
        })
    }
}

controller.init(view, model)