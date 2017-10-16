'use strict'

// Part 1
// ======

const COMMAND_SPLIT = /(rect|rotate) (.*)$/
const RECT_PARSE = /(\d+)x(\d+)/
const ROTATE_PARSE = /(x|y)=(\d+) by (\d+)/

const parseLine = (line) => {
  const [ , command, rawArgs ] = line.match(COMMAND_SPLIT)
  let args
  if (command === 'rect') {
    const [ , width, height ] = rawArgs.match(RECT_PARSE)
    args = {
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    }
  }
  else {
    const [ , axis, index, offset ] = rawArgs.match(ROTATE_PARSE)
    args = {
      axis,
      index: parseInt(index, 10),
      offset: parseInt(offset, 10),
    }
  }
  return { command, args }
}

const createGrid = (width, height, defaultVal) => {
  return new Array(width)
    .fill(null)
    .map(() => new Array(height).fill(defaultVal))
}

const actions = {
  rect(grid, { width, height }) {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        grid[x][y] = 1
      }
    }
  },
  rotate(grid, { axis, index, offset }) {
    if (axis === 'x') {
      const slice = grid[index].slice()
      for (let i = 0; i < offset; i++) {
        slice.unshift(slice.pop())
      }
      grid[index] = slice
    }
    else {
      const slice = grid.map((col) => col[index])
      for (let i = 0; i < offset; i++) {
        slice.unshift(slice.pop())
      }
      grid.forEach((col, i) => { col[index] = slice[i] })
    }
  },
}

function countGrid(grid) {
  return grid.reduce((total, col) => {
    return total + col.reduce((rowTotal, cell) => rowTotal + cell)
  }, 0)
}

function part1(input, width = 50, height = 6) {
  const grid = createGrid(width, height, 0)
  input.split('\n')
    .map(parseLine)
    .forEach((action) => {
      actions[action.command](grid, action.args)
    })
  return countGrid(grid)
}

// Part 2
// ======

function printGrid(grid) {
  grid[0].forEach((row, i) => {
    let output = ''
    grid.forEach((col) => {
      output = `${output}${col[i] || ' '} `
    })
    console.log(output)
  })
}

function part2(input, width = 50, height = 6) {
  const grid = createGrid(width, height, 0)
  input.split('\n')
    .map(parseLine)
    .forEach((action) => {
      actions[action.command](grid, action.args)
    })
  return printGrid(grid)
}

module.exports = { part1, part2 }
