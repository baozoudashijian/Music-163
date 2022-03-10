window.app = {
    getParams(q) {
        let res = {}
        let a =window.location.search.split('?')[1].split('&')
        a.map((item) => {
            let b = item.split('=')
            console.log(b[0])
            let key = b[0]
            res[key] = b[1]
        })
        return  res[q]
    },
    getSongPlay(id) {
        const query = new AV.Query('SongList');
        return query.get(id).then((sl) => {
            return sl
            // todo 就是 objectId 为 582570f38ac247004f39c24b 的 Todo 实例
            // const title     = todo.get('title');
            // const priority  = todo.get('priority');
        });
    }
}