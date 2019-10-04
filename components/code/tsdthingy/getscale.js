const { scales, scale } = require("scribbletune")
const { scaleQuantize } = require("d3-scale")

console.log(scales());

const octaves = [3, 4, 5];
const wholetone = octaves.reduce((array, octave) => {
    return [...array, ...scale(`c${octave} whole tone`)];
}, []);

const wholetoneScale = scaleQuantize()
    .domain([0, 10000])
    .range(wholetone);

console.log(wholetone);
require('fs').writeFileSync('./wholetone.js', JSON.stringify(wholetone))
console.log(wholetoneScale(200));