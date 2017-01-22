'use strict'

// Part 1
// ======

// Inverted grid so we can access GRID[x][y]
const SQUARE_GRID = [
  [ '1', '4', '7' ],
  [ '2', '5', '8' ],
  [ '3', '6', '9' ],
]
const DIRECTIONS = {
  U: (pos) => ({ x: pos.x, y: pos.y - 1 }),
  R: (pos) => ({ x: pos.x + 1, y: pos.y }),
  D: (pos) => ({ x: pos.x, y: pos.y + 1 }),
  L: (pos) => ({ x: pos.x - 1, y: pos.y }),
}

const getNextPos = (grid, pos, dir) => {
  const next = DIRECTIONS[dir](pos)
  return grid[next.x] && grid[next.x][next.y] ? next : pos
}

function part1(input) {
  let pos = { x: 1, y: 1 }
  const getNextSquareGrid = getNextPos.bind(null, SQUARE_GRID)
  return input
    .split('\n')
    .map((line) => {
      const endPos = line.split('').reduce(getNextSquareGrid, pos)
      pos = endPos
      return SQUARE_GRID[pos.x][pos.y]
    })
    .join('')
}

// Part 2
// ======

const nil = null
const ODD_GRID = [
  [ nil, nil, '5', nil, nil ],
  [ nil, '2', '6', 'A', nil ],
  [ '1', '3', '7', 'B', 'D' ],
  [ nil, '4', '8', 'C', nil ],
  [ nil, nil, '9', nil, nil ],
]

function part2(input) {
  let pos = { x: 0, y: 2 }
  const getNextSquareGrid = getNextPos.bind(null, ODD_GRID)
  return input
    .split('\n')
    .map((line) => {
      const endPos = line.split('').reduce(getNextSquareGrid, pos)
      pos = endPos
      return ODD_GRID[pos.x][pos.y]
    })
    .join('')
}

module.exports = { part1, part2 }
