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
console.log(React)
const PlayMusic = React.createClass({
    render() {
        return (<div>1123</div>)
    }
})
console.dir(PlayMusic)
ReactDOM.render(<PlayMusic />, document.getElementById('playSong'));