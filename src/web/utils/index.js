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
    }
}