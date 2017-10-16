'use strict'

// Part 1
// ======

const crypto = require('crypto')

const md5 = (str) => crypto
  .createHash('md5')
  .update(str)
  .digest('hex')

const isOpen = (char) => (/[bcdef]/).test(char)
const sortBy = (field) => (a, b) => a[field] - b[field]

const posEqual = (a, b) => a.x === b.x && a.y === b.y

const createMap = (width, height, defaultVal) => {
  return new Array(width)
    .fill(null)
    .map(() => new Array(height).fill(defaultVal))
}

const exists = (map, { x, y }) => {
  return map[x] && map[x][y]
}

const DIRECTIONS = {
  up: ({ x, y }) => ({ x, y: y - 1, char: 'U' }),
  down: ({ x, y }) => ({ x, y: y + 1, char: 'D' }),
  left: ({ x, y }) => ({ x: x - 1, y, char: 'L' }),
  right: ({ x, y }) => ({ x: x + 1, y, char: 'R' }),
}

const getPossibleMovements = (pos, val, map) => {
  const [ up, down, left, right ] = md5(val)
    .substr(0, 4)
    .split('')
    .map(isOpen)
  const directions = [
    up && DIRECTIONS.up(pos),
    down && DIRECTIONS.down(pos),
    left && DIRECTIONS.left(pos),
    right && DIRECTIONS.right(pos),
  ]
  return directions.filter((dir) => {
    if (!dir) return false
    return exists(map, dir)
  })
}

const getPaths = (val, start, end, map, path = []) => { // eslint-disable-line max-params
  path = [ ...path, start ]
  if (posEqual(start, end)) return [ path ]
  return getPossibleMovements(start, val, map).reduce((paths, dir) => {
    return paths.concat(getPaths(`${val}${dir.char}`, dir, end, map, path))
  }, [])
}

const getPossiblePaths = (input) => {
  const map = createMap(4, 4, 1)
  const start = { x: 0, y: 0 }
  const end = { x: 3, y: 3 }
  const paths = getPaths(input, start, end, map)
  return paths.sort(sortBy('length'))
}

function part1(input) {
  const paths = getPossiblePaths(input)
  return paths[0]
    .slice(1)
    .map((path) => path.char)
    .join('')
}

// Part 2
// ======

function part2(input) {
  const paths = getPossiblePaths(input)
  return paths[paths.length - 1].length - 1
}

module.exports = { part1, part2 }
