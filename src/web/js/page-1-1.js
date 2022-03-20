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
            data.map((item, index) => {
                htmlStr += this.template.replace('__name', item.name).replace('__link', item.link ? item.link : imgUrl)
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