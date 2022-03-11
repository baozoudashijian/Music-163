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
            catchState: () => {}
        }
    },
    componentDidMount() {
        let id = window.app.getParams('id')
        app.getSongPlay(id).then((res) => {
            this.setState({songInfo: {...this.state.songInfo, ...res.attributes}})
        })
    },
    toPlay() {
        console.log('播放音乐')
        console.log(this.refs.music)
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
        if(lyric) {
            let res = []
            let a = lyric.replace(/\n/g,'@@').split('@@')
            let e = a.map((item) => {
                let o = item.replace('[', "").replace(']', ",").split(',')
                
                res.push({time: o[0], lyc: o[1]})
            })
            return res
        }
    },
    render() {
        const { playState, songInfo } = this.state
        console.log(songInfo, 'songInfo')
        this.processLyric(songInfo.lyric)
        return (
            <div className="ph-container">
                <div className="disk">
                    <div className='song-return' onClick={this.toPause}>
                        <div className="wrapper">
                            <div className={['img', playState ? 'active':''].join(' ')}>
                                <img className="u-img" alt="song-img" src="https://p1.music.126.net/8IEucUOp6E1AJfDb5RrPNw==/109951167104850464.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0" />
                                <div className="u-audio">
                                    <audio ref="music" controls src={songInfo.link}></audio>
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
                <div className="lrc">
                    <h1>{songInfo.singer}-{songInfo.name}</h1>
                    <div>
                        {
                            songInfo.lyric && songInfo.lyric.map((item) => {

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
        return { playState: false };
    },
    catchState(state) {
        this.setState({playState: state})
    },
    render() {
        const { playState } = this.state
        return (
            <div>
                <div className="pm-container">

                </div>
                <div className="top-shade">
                    <div className={['ply-pointer', playState ? 'active':''].join(' ')}></div>
                </div>
                <div className="bottom-shade"></div>
                <PlayHeader catchState={this.catchState} />
                <PlayBody />
            </div>

        )
    }
})

ReactDOM.render(<PlayMusic />, document.getElementById('playSong'));