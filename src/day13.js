'use strict'

// Part 1
// ======

const PF = require('pathfinding')

const pointIsWall = ({ x, y }, modifier) => {
  const val = (x * x) + (3 * x) + (2 * x * y) + y + (y * y) + modifier
  const numOfOne = val.toString(2)
    .split('')
    .filter((char) => char === '1')
    .length
  return numOfOne % 2
}

const generateMap = (favoriteNumber, width, height) => {
  return new Array(width)
    .fill(null)
    .map((_, y) => new Array(height)
      .fill(null)
      .map((__, x) => pointIsWall({ x, y }, favoriteNumber))
    )
}

const posStr = ({ x, y }) => `${x},${y}`
const getAdjacent = (x, y, grid) => {
  const neighbors = [
    { x: x - 1, y },
    { x: x + 1, y },
    { x, y: y - 1 },
    { x, y: y + 1 },
  ]
  return neighbors.filter((cell) => {
    return grid[cell.x] && grid[cell.x][cell.y] === 0
  })
}

const pathToPoint = (input, start, end) => {
  const map = generateMap(input, end.x + 50, end.y + 50)
  const grid = new PF.Grid(map)
  const finder = new PF.DijkstraFinder()
  const result = finder.findPath(start.x, start.y, end.x, end.y, grid)
  return result.length - 1
}

function part1(input) {
  input = parseInt(input, 10)
  const start = { x: 1, y: 1 }
  const end = { x: 31, y: 39 }
  return pathToPoint(input, start, end)
}

// Part 2
// ======

const generateMapInverted = (favoriteNumber, width, height) => {
  return new Array(width)
    .fill(null)
    .map((_, x) => new Array(height)
      .fill(null)
      .map((__, y) => pointIsWall({ x, y }, favoriteNumber))
    )
}

const findChildren = (node, map, visited) => {
  return getAdjacent(node.x, node.y, map)
    .filter((cell) => {
      const pos = posStr(cell)
      const hasVisited = visited[posStr(cell)]
      visited[pos] = true
      return !hasVisited
    })
    .map((neighbor) => {
      neighbor.children = findChildren(neighbor, map, visited)
      return neighbor
    })
}

const createTree = (input, start, end) => {
  const map = generateMapInverted(input, end.x + 100, end.y + 100)
  const root = Object.assign({}, start)
  const visited = {}
  root.children = findChildren(root, map, visited)
  return root
}

const countNodes = (node, maxDepth, depth = 0) => {
  if (depth > maxDepth) return 1
  return node.children.reduce((total, child) => {
    return total + countNodes(child, maxDepth, depth + 1)
  }, 1)
}

function part2(input) {
  input = parseInt(input, 10)
  const start = { x: 1, y: 1 }
  const end = { x: 31, y: 39 }
  const tree = createTree(input, start, end)
  return countNodes(tree, 50) - 1
}

module.exports = { part1, part2 }
