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

var PlayHeader = React.createClass({
    displayName: 'PlayHeader',
    getInitialState: function getInitialState() {
        return { playState: false, songInfo: {} };
    },
    getDefaultProps: function getDefaultProps() {
        return {
            catchState: function catchState() {},
            catchAllState: function catchAllState() {}
        };
    },
    componentDidMount: function componentDidMount() {
        var _this = this;

        var id = window.app.getParams('id');
        app.getSongPlay(id).then(function (res) {
            _this.setState({ songInfo: Object.assign({}, _this.state.songInfo, res.attributes) }, function () {
                _this.props.catchAllState(_this.state);
            });
        });
        this.refs.music.ontimeupdate = this.onTimeUpdate;
        this.refs.music.onended = this.onEnded;
    },
    toPlay: function toPlay() {
        console.log('播放音乐');
        this.refs.music.play();
        this.setState({ playState: true });
        this.props.catchState(true);
    },
    toPause: function toPause() {
        console.log('暂停音乐');
        this.refs.music.pause();
        this.setState({ playState: false });
        this.props.catchState(false);
    },
    processLyric: function processLyric(lyric) {
        var res = [];
        if (lyric) {
            var a = lyric.replace(/\n/g, '@@').split('@@');
            var e = a.map(function (item) {
                var o = item.replace('[', "").replace(']', ",").split(',');

                res.push({ time: app.exChangeTime(o[0]), lyc: o[1] });
            });
        }
        return res;
    },
    onTimeUpdate: function onTimeUpdate(e) {
        var prevT = 0;
        var t = e.target.currentTime;
        $('.lrc > div p').each(function (index, item) {
            var pt = $(item).attr('data-time');
            if (t >= prevT && t < pt) {
                $(item).prev().addClass('active').siblings().removeClass('active');
                prevT = pt;
            }
        });
        this.lyricTransform();
    },
    onEnded: function onEnded(e) {
        this.setState({ playState: false });
        this.props.catchState(false);
        $('.lrc > div').css('transform', 'translate(0, 0})');
    },
    lyricTransform: function lyricTransform() {
        var paddingB = 8;
        var prevLen = $('.lrc > div p[class="active"]').prevAll().length - 1; // -1 你想高亮的那个行数
        var pw = $('.lrc > div p').eq(0).height() + paddingB;
        if (prevLen > 0) {
            $('.lrc > div').css('transform', 'translate(0, ' + (-prevLen * pw + 'px') + ')');
        }
        // console.log(pw, wrapper, pw - wrapper)
        // console.log(pw - wrapper - translateY , '123')
        // if(pw - wrapper - translateY > 0) {
        //     $('.lrc > div').css('transform', `translate(0, ${-(pw - wrapper) + 'px'})`)
        //     translateY = pw - wrapper
        // }
    },
    render: function render() {
        var _state = this.state,
            playState = _state.playState,
            songInfo = _state.songInfo;

        var lrc = this.processLyric(songInfo.lyric);
        return React.createElement(
            'div',
            { className: 'ph-container' },
            React.createElement(
                'div',
                { className: 'disk' },
                React.createElement(
                    'div',
                    { className: 'song-return', onClick: this.toPause },
                    React.createElement(
                        'div',
                        { className: 'wrapper' },
                        React.createElement(
                            'div',
                            { className: ['img', playState ? 'active' : ''].join(' ') },
                            React.createElement('img', { className: 'u-img', alt: 'song-img', src: songInfo.post ? songInfo.post : '' }),
                            React.createElement(
                                'div',
                                { className: 'u-audio' },
                                React.createElement('audio', { ref: 'music', src: songInfo.link })
                            )
                        )
                    )
                ),
                !playState ? React.createElement('div', { className: 'song-plybtn', onClick: this.toPlay }) : ''
            ),
            React.createElement(
                'h1',
                null,
                songInfo.singer,
                '-',
                songInfo.name
            ),
            React.createElement(
                'div',
                { className: 'lrc' },
                React.createElement(
                    'div',
                    null,
                    lrc.map(function (item) {
                        return React.createElement(
                            'p',
                            { 'data-time': item.time, key: item.time },
                            item.lyc
                        );
                    })
                )
            )
        );
    }
});
var PlayBody = React.createClass({
    displayName: 'PlayBody',
    render: function render() {
        return React.createElement(
            'div',
            { className: 'pb-container' },
            React.createElement(
                'div',
                { className: 'wrapper' },
                React.createElement(
                    'div',
                    { className: 'open-app' },
                    React.createElement(
                        'button',
                        null,
                        '\u6253\u5F00'
                    )
                ),
                React.createElement(
                    'span',
                    { className: 'dl' },
                    '\u4E0B\u8F7D'
                )
            )
        );
    }
});

var PlayMusic = React.createClass({
    displayName: 'PlayMusic',
    getInitialState: function getInitialState() {
        return { playState: false, allState: {} };
    },
    catchState: function catchState(state) {
        this.setState({ playState: state });
    },
    catchAllState: function catchAllState(state) {
        this.setState({ allState: state });
    },
    render: function render() {
        var _state2 = this.state,
            playState = _state2.playState,
            allState = _state2.allState;

        var a = void 0;
        // console.log(allState, 'allstate')
        allState.songInfo && (a = allState.songInfo.post ? { 'background-image': 'url(' + allState.songInfo.post + ')' } : '');
        console.log(a);
        return React.createElement(
            'div',
            null,
            React.createElement('div', { className: 'pm-container', style: a }),
            React.createElement(
                'div',
                { className: 'top-shade' },
                React.createElement('div', { className: ['ply-pointer', playState ? 'active' : ''].join(' ') })
            ),
            React.createElement('div', { className: 'bottom-shade' }),
            React.createElement(PlayHeader, { catchState: this.catchState, catchAllState: this.catchAllState }),
            React.createElement(PlayBody, null)
        );
    }
});

ReactDOM.render(React.createElement(PlayMusic, null), document.getElementById('playSong'));