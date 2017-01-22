'use strict'

// Part 1
// ======

const parseLine = (line) => line.match(/[a-z-]+ (generator|microchip)/g) || []
const floorSums = (input) => input
  .split('\n')
  .map(parseLine)
  .reduce((acc, floorItems) => acc.concat(floorItems.length), [])

const TURNS_PER_OBJECT = 2
const LAST_FLOOR_TURNS = 3

const sum = (arr) => arr.reduce((total, num) => total + num)
const range = (min, max) => new Array(max + 1 - min)
  .fill(null)
  .map((_, i) => i + min)

const minMoves = (sums) => {
  return sum(range(1, sums.length - 1).map((offset) => {
    const slice = sums.slice(0, offset)
    return TURNS_PER_OBJECT * sum(slice) - LAST_FLOOR_TURNS // eslint-disable-line no-mixed-operators
  }))
}

function part1(input) {
  return minMoves(floorSums(input))
}

// Part 2
// ======

function part2(input) {
  const sums = floorSums(input)
  sums[0] += 4
  return minMoves(sums)
}

module.exports = { part1, part2 }
