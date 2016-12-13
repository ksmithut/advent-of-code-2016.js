'use strict'

/**
 * --- Day 13: A Maze of Twisty Little Cubicles ---
 *
 * You arrive at the first floor of this new building to discover a much less
 * welcoming environment than the shiny atrium of the last one. Instead, you
 * are in a maze of <span title="You are in a twisty alike of little cubicles,
 * all maze.">twisty little cubicles</span>, all alike.
 *
 * Every location in this area is addressed by a pair of non-negative integers
 * (`x,y`). Each such coordinate is either a wall or an open space. You can't
 * move diagonally. The cube maze starts at `0,0` and seems to extend
 * infinitely toward positive `x` and `y`; negative values are invalid, as they
 * represent a location outside the building. You are in a small waiting area
 * at `1,1`.
 *
 * While it seems chaotic, a nearby morale-boosting poster explains, the layout
 * is actually quite logical. You can determine whether a given `x,y`
 * coordinate will be a wall or an open space using a simple system:
 *
 * - Find `x*x + 3*x + 2*x*y + y + y*y`.
 * - Add the office designer's favorite number (your puzzle input).
 * - Find the [binary
 *   representation](https://en.wikipedia.org/wiki/Binary_number) of that sum;
 *   count the number of [bits](https://en.wikipedia.org/wiki/Bit) that are `1`.
 *   - If the number of bits that are `1` is even, it's an open space.
 *   - If the number of bits that are `1` is odd, it's a wall.
 *
 * For example, if the office designer's favorite number were `10`, drawing
 * walls as `#` and open spaces as `.`, the corner of the building containing
 * `0,0` would look like this:
 *
 *       0123456789
 *     0 .#.####.##
 *     1 ..#..#...#
 *     2 #....##...
 *     3 ###.#.###.
 *     4 .##..#..#.
 *     5 ..##....#.
 *     6 #...##.###
 *
 * Now, suppose you wanted to reach `7,4`. The shortest route you could take is
 * marked as `O`:
 *
 *       0123456789
 *     0 .#.####.##
 *     1 .O#..#...#
 *     2 #OOO.##...
 *     3 ###O#.###.
 *     4 .##OO#OO#.
 *     5 ..##OOO.#.
 *     6 #...##.###
 *
 * Thus, reaching `7,4` would take a minimum of `11` steps (starting from your
 * current location, `1,1`).
 *
 * What is the fewest number of steps required for you to reach `31,39`?
 */

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

/**
 * --- Part Two ---
 *
 * How many locations (distinct `x,y` coordinates, including your starting
 * location) can you reach in at most `50` steps?
 */

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
