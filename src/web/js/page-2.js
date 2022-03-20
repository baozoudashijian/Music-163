{
    let view = {
        el: '#songsRank',
        template: `
            <li>
                <a href="../play.html?id=__id">
                    <div class="rank">__rank</div>
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
            </li>
        `,
        render(data) {
            let temp = this.template
            let htmlStr = data.map((item, index) => {
                return temp.replace('__rank', index > 8 ? index + 1 : '0' + (index + 1) ).replace('__name', item.name).replace('__singer', item.singer).replace('__id', item.id).replace('__name', item.name)
            })
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
            this.bindEventHub()
        },
        bindEvent() {
            console.log('加载page2')
        },
        bindEventHub() {
            let _this = this
            window.eventHub.on('select:tab', function(data) {
                if(data == 'page-2') {
                    $('.page-2').show()
                }else{
                    $('.page-2').hide()
                }
            })
        },
        getAllSongs() {
            // this.view.loadingShow()
            this.model.queryAll().then(() => {
                this.view.render(this.model.data.songList)
                // this.view.loadingHide()
            })

        }
    }
    controller.init(view, model)
}