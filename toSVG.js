const fs = require("fs");

const settings = {
    width: 32,
    height: 16,
    blockSize: 10,
    blockPadding: 1
}

const header = `<svg xmlns="http://www.w3.org/2000/svg" 
width="${settings.width*settings.blockSize + (settings.width*settings.blockPadding + settings.blockPadding)}" 
height="${settings.height*settings.blockSize + (settings.height*settings.blockPadding + settings.blockPadding)}"
>`,
    footer = `</svg>`

const block = `<path d="M0 0h512v288H0z"/><path d="M18 18h12v12H18z" style="animation:show 7s infinite;animation-delay:162ms;fill:#4392ff"/>`



function getBlock(x, y, style) {
    const PosX = x*settings.blockSize + ( x ? x * settings.blockPadding : 0 ),
        PosY = y*settings.blockSize + ( y ? y * settings.blockPadding : 0 )
    return `<path d="M ${PosX} ${PosY} H ${settings.blockSize+PosX} V ${settings.blockSize+PosY} H ${PosX} Z" style="${style}"/>`
}

function formatMatrix(matrix) {
    let blocks = ``
    for(let x = 0; x<matrix.length; x++) {
        for(let y = 0; y<matrix[x].length; y++) {
            let {color} = matrix[x][y];
            if(!color) color="#111111"
            blocks+=getBlock(x,y,`fill:${color}`)
        }
    }
    return blocks;
}

function initMatrix(matrix = []) {
    for(let x = 0; x<settings.width; x++) {
        matrix.push([])
        for(let y = 0; y<settings.height; y++) {
            matrix[x].push({})
        }
    }
    return matrix
}

function generate() {

    return header +formatMatrix(initMatrix())+ footer;
}

fs.writeFileSync("test.svg", generate())