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
    render() {
        return (
            <div className="ph-container">

            </div>
        )
    }
})
const PlayBody = React.createClass({
    render() {
        return (
            <div>body</div>
        )
    }
})

const PlayMusic = React.createClass({
    render() {
        return (
            <div>
                <div className="pm-container">
                
                </div>
                <div className="top-shade"></div>
                <div className="bottom-shade"></div>
                <PlayHeader />
                <PlayBody />
            </div>
            
        )
    }
})

ReactDOM.render(<PlayMusic />, document.getElementById('playSong'));