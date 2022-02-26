window.eventHub = {
    events: {

    },
    on: function(event, callback) {
        if(!this.events[event]) {
            this.events[event] = []
        }
        this.events[event].push(callback)
    },
    emit: function(event, data) {
        this.events[event].array.forEach(func => {
            func.call(this, data)
        });
    }
}