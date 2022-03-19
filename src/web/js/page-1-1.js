{
    let view = {
        el: '#songSheet',
        template: `
        <li>
            <div class="cover">
                <img width="105" src="__link" alt="封面">
            </div>
            <p>__name</p>
        </li>
        `,
        render(data) {
            let htmlStr = '' // 不赋初始值还会出错
            let imgUrl = 'https://i.loli.net/2017/08/22/599ba7a0aea8b.jpg'
            let tempUrl = ['http://p1.music.126.net/AW1K4rgnEQy9YQ0i7HMIMg==/109951167165747391.jpg?imageView=1&type=webp&thumbnail=246x0','http://p1.music.126.net/YpLF3zV3pDwIOoYJEDRe8w==/109951166463602925.jpg?imageView=1&type=webp&thumbnail=246x0', 'http://p1.music.126.net/NvToxQ1H8Dwj9xzpcS0IdQ==/109951164961605263.jpg?imageView=1&type=webp&thumbnail=246x0', 'http://p1.music.126.net/KV70g9Y7vGPF35DinTH9tw==/109951167135420611.jpg?imageView=1&type=webp&thumbnail=246x0']
            data.map((item, index) => {
                htmlStr += this.template.replace('__name', item.name).replace('__link', tempUrl[index])
            })
            // console.log(htmlStr)
            $(this.el).html(htmlStr)
        }
    }

    let model = {
        data: {
            songSheet: []
        },
        queryAll() {
            const query = new AV.Query('SongSheet');
            return query.find().then((songSheet) => {
                const newData = songSheet.map(item => Object.assign(item.attributes, { id: item.id }))
                this.data.songSheet = newData
                return songSheet
            });
        }
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data.songSheet)
            this.getAllSongSheet()
            this.bindEvent()
        },
        bindEvent() {
            console.log('load model page-1-1')
        },
        getAllSongSheet() {
            this.model.queryAll().then((res) => {
                this.view.render(this.model.data.songSheet)
            })
        }
    }
    controller.init(view, model)
}