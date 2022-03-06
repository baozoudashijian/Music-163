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
        return { playState: false };
    },
    toPlay() {
        console.log('播放音乐')
        console.log(this.refs.music)
        this.refs.music.play()
        this.setState({ playState: true })
    },
    toPause() {
        console.log('暂停音乐')
        this.refs.music.pause()
        this.setState({ playState: false })
    },
    render() {
        const { playState } = this.state
        return (
            <div className="ph-container">
                <div className="disk">
                    <div className="song-return" onClick={this.toPause}>
                        <div className="wrapper">
                            <div className="img">
                                <img className="u-img" alt="song-img" src="https://p1.music.126.net/8IEucUOp6E1AJfDb5RrPNw==/109951167104850464.jpg?imageView&thumbnail=360y360&quality=75&tostatic=0" />
                                <div className="u-audio">
                                    <audio ref="music" controls src="https://www.learningcontainer.com/wp-content/uploads/2020/02/Kalimba.mp3"></audio>
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
                <div className="lrc"></div>
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
    render() {
        return (
            <div>
                <div className="pm-container">

                </div>
                <div className="top-shade">
                    <div className="ply-pointer"></div>
                </div>
                <div className="bottom-shade"></div>
                <PlayHeader />
                <PlayBody />
            </div>

        )
    }
})

ReactDOM.render(<PlayMusic />, document.getElementById('playSong'));