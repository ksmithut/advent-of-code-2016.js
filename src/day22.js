'use strict'

// Part 1
// ======

const PARSE_LINE = /\/dev\/grid\/node-x(\d+)-y(\d+)\s*(\d+)T\s*(\d+)T\s*(\d+)T/ // eslint-disable-line max-len
const getNodes = (input) => {
  return input
    .split('\n')
    .slice(2)
    .map((line) => {
      const [ , x, y, size, used, avail ] = line.match(PARSE_LINE)
      return {
        x: parseInt(x, 10),
        y: parseInt(y, 10),
        size: parseInt(size, 10),
        used: parseInt(used, 10),
        avail: parseInt(avail, 10),
      }
    })
}

const getPairs = (nodes) => {
  return nodes.reduce((pairs, node, i) => {
    const otherNodes = nodes.slice()
    otherNodes.splice(i, 1)
    const nodePairs = otherNodes.map((val) => [ node, val ])
    return pairs.concat(nodePairs)
  }, [])
}

const isViablePair = ([ a, b ]) => {
  if (a.used === 0) return false
  return b.avail >= a.used
}

function part1(input) {
  const nodes = getNodes(input)
  const pairs = getPairs(nodes)
  const viablePairs = pairs.filter(isViablePair)
  return viablePairs.length
}

// Part 2
// ======

const getGrid = (nodes, minSize) => {
  return nodes.reduce((grid, node) => {
    const { x, y } = node
    node.large = node.used > minSize
    grid[x] = grid[x] || []
    grid[x][y] = node
    return grid
  }, [])
}

const gridToString = (grid) => {
  return grid[0].map((row, y) => {
    return grid.map((col, x) => {
      const node = grid[x][y]
      let str = '.'
      if (node.needed) str = 'G'
      if (node.large) str = '#'
      if (node.used === 0) str = '_'
      return (x === 0 && y === 0) ? `(${str})` : ` ${str} `
    }).join('')
  }).join('\n')
}

function part2(input) {
  const nodes = getNodes(input)
  const minSize = nodes.map(({ size }) => size).sort((a, b) => a - b)[0]
  const grid = getGrid(nodes, minSize)
  grid[grid.length - 1][0].needed = true
  return gridToString(grid)
}

module.exports = { part1, part2 }
