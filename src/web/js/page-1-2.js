{
    let view = {
        el: '#songs',
        template: `<li>
                        <a href="../play.html?id=__id">
                            <div class="songItem">
                                <div class="songLeft">
                                    <div class="name">__name</div>
                                    <div class="detail"><i class="icon"></i>__singer - __name</div>
                                </div>
                                <div class="songRight">
                                    <span></span>
                                </div>
                            </div>
                        </a>
                    </li>`,
        render(data) {
            let temp = this.template
            let htmlStr = data.map((item) => {
                return temp.replace('__name', item.name).replace('__singer', item.singer).replace('__id', item.id).replace('__name', item.name)
            })
            console.log(htmlStr.join(''))
            $(this.el).html(htmlStr.join(''))
        }
    }

    let model = {
        data: {
            songList: []
        },
        queryAll() {
            const query = new AV.Query('SongList');
            return query.find().then((songs) => {
                const newData = songs.map(item => Object.assign(item.attributes, { id: item.id }))
                this.data.songList = newData
                return songs
            });
        }
    }

    let controller = {
        init(view, model) {
            this.view = view
            this.model = model
            this.view.render(this.model.data.songList)
            this.getAllSongs()
            this.bindEvent()
        },
        bindEvent() {
            console.log('load model page-1-2')
        },
        getAllSongs() {
            this.model.queryAll().then(() => {
                this.view.render(this.model.data.songList)
                console.log(this.model.data.songList)
            })

        }
    }
    controller.init(view, model)
}