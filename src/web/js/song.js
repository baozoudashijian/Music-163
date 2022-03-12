// console.log(React, '引入react');

// function PlayMusic() {

// }

// PlayMusic.prototype = React.Component;
// PlayMusic.prototype.render = function () {
//     return (<div>123</div>)
// }

// var PM = new PlayMusic();
// // console.log(pm, '12');
// console.dir(PM, 'id')

const PlayHeader = React.createClass({
    getInitialState() {
        return { playState: false, songInfo: {} };
    },
    getDefaultProps() {
        return {
            catchState: () => {},
            catchAllState: () => {}
        }
    },
    componentDidMount() {
        let id = window.app.getParams('id')
        app.getSongPlay(id).then((res) => {
            this.setState({songInfo: {...this.state.songInfo, ...res.attributes}}, () => {
                this.props.catchAllState(this.state)
            })
        })
        this.refs.music.ontimeupdate = this.onTimeUpdate
        this.refs.music.onended = this.onEnded
    },
    toPlay() {
        console.log('播放音乐')
        this.refs.music.play()
        this.setState({ playState: true })
        this.props.catchState(true)
    },
    toPause() {
        console.log('暂停音乐')
        this.refs.music.pause()
        this.setState({ playState: false })
        this.props.catchState(false)
    },
    processLyric(lyric) {
        let res = []
        if(lyric) {
            let a = lyric.replace(/\n/g,'@@').split('@@')
            let e = a.map((item) => {
                let o = item.replace('[', "").replace(']', ",").split(',')
                
                res.push({time: app.exChangeTime(o[0]), lyc: o[1]})
            })
        }
        return res
    },
    onTimeUpdate(e) {
        let prevT = 0
        let t = e.target.currentTime
        $('.lrc > div p').each((index, item) => {
            let pt = $(item).attr('data-time')
            if(t >= prevT && t < pt) {
                $(item).prev().addClass('active').siblings().removeClass('active')
                prevT = pt
            }
        })
        this.lyricTransform()
    },
    onEnded(e) {
        this.setState({ playState: false })
        this.props.catchState(false)
        $('.lrc > div').css('transform', 'translate(0, 0})')
    },
    lyricTransform() {
        let paddingB = 8
        let prevLen = $('.lrc > div p[class="active"]').prevAll().length - 1 // -1 你想高亮的那个行数
        let pw = $('.lrc > div p').eq(0).height() + paddingB
        if(prevLen > 0) {
            $('.lrc > div').css('transform', `translate(0, ${-prevLen * pw + 'px'})`)
        }
        // console.log(pw, wrapper, pw - wrapper)
        // console.log(pw - wrapper - translateY , '123')
        // if(pw - wrapper - translateY > 0) {
        //     $('.lrc > div').css('transform', `translate(0, ${-(pw - wrapper) + 'px'})`)
        //     translateY = pw - wrapper
        // }
    },
    render() {
        const { playState, songInfo } = this.state
        let lrc = this.processLyric(songInfo.lyric)
        return (
            <div className="ph-container">
                <div className="disk">
                    <div className='song-return' onClick={this.toPause}>
                        <div className="wrapper">
                            <div className={['img', playState ? 'active':''].join(' ')}>
                                <img className="u-img" alt="song-img" src={songInfo.post ? songInfo.post : ''} />
                                <div className="u-audio">
                                    <audio ref="music" src={songInfo.link}></audio>
                                </div>
                            </div>
                        </div>
                    </div>
                    {
                        !playState ?
                            <div className="song-plybtn" onClick={this.toPlay}></div>
                            :
                            ''
                    }

                </div>
                <h1>{songInfo.singer}-{songInfo.name}</h1>
                <div className="lrc">
                    <div>
                        {
                            lrc.map((item) => {
                                return <p data-time={item.time} key={item.time}>{item.lyc}</p>
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
})
const PlayBody = React.createClass({
    render() {
        return (
            <div className="pb-container">
                <div className="wrapper">
                    <div className="open-app">
                        <button>打开</button>
                    </div>
                    <span className="dl">下载</span>
                </div>
            </div>
        )
    }
})

const PlayMusic = React.createClass({
    getInitialState() {
        return { playState: false, allState: {} };
    },
    catchState(state) {
        this.setState({playState: state})
    },
    catchAllState(state){
        this.setState({allState: state})
    },
    render() {
        const { playState, allState } = this.state
        let a
        // console.log(allState, 'allstate')
        allState.songInfo && (a = allState.songInfo.post ? {'background-image': `url(${allState.songInfo.post})`} : '')
        console.log(a)
        return (
            <div>
                <div className="pm-container" style={a}>

                </div>
                <div className="top-shade">
                    <div className={['ply-pointer', playState ? 'active':''].join(' ')}></div>
                </div>
                <div className="bottom-shade"></div>
                <PlayHeader catchState={this.catchState} catchAllState={this.catchAllState} />
                <PlayBody />
            </div>

        )
    }
})

ReactDOM.render(<PlayMusic />, document.getElementById('playSong'));