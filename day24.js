'use strict'

// Part 1
// ======

const PF = require('pathfinding')

const WALL = '#'
const POI = /\d/

const parseGrid = (input) => {
  const points = []
  const grid = []
  input.split('\n').forEach((line, y) => {
    line.split('').forEach((char, x) => {
      const val = char === WALL ? 1 : 0
      if (POI.test(char)) {
        points[char] = { x, y }
      }
      grid[y] = grid[y] || []
      grid[y][x] = val
    })
  })
  return { grid, points }
}

function* permute(items) {
  if (items.length <= 1) {
    yield items
    return
  }
  for (let i = 0; i < items.length; i++) {
    const subItems = items.slice()
    const item = subItems.splice(i, 1)
    for (const combo of permute(subItems)) {
      yield item.concat(combo)
    }
  }
}

const iteratorToArray = (iterator) => {
  const arr = []
  for (const item of iterator) arr.push(item)
  return arr
}

const pathThroughPoints = (points, map) => {
  const fullPath = points.reduce((path, point, i, arr) => {
    if (i === 0) return path
    const grid = new PF.Grid(map)
    const finder = new PF.DijkstraFinder()
    path.pop()
    const prevPoint = arr[i - 1]
    const subPath = finder.findPath(
      prevPoint.x,
      prevPoint.y,
      point.x,
      point.y,
      grid
    )
    return path.concat(subPath)
  }, [])
  return fullPath
}

function part1(input) {
  const { grid, points } = parseGrid(input)
  const start = points[0]
  const otherPoints = points.slice(1)
  const paths = iteratorToArray(permute(otherPoints))
    .map((combo) => [ start ].concat(combo))
    .map((combo) => pathThroughPoints(combo, grid))
    .sort((a, b) => a.length - b.length)
  return paths[0].length - 1
}

// Part 2
// ======

function part2(input) {
  const { grid, points } = parseGrid(input)
  const start = points[0]
  const otherPoints = points.slice(1)
  const paths = iteratorToArray(permute(otherPoints))
    .map((combo) => [ start ].concat(combo, start))
    .map((combo) => pathThroughPoints(combo, grid))
    .sort((a, b) => a.length - b.length)
  return paths[0].length - 1
}

module.exports = { part1, part2 }
