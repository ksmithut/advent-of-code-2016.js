'use strict'

// Part 1
// ======

const parseLine = (line) => line
  .trim()
  .split(/\s+/)
  .map((num) => parseInt(num, 10))
const parseInput = (input) => input.split('\n').map(parseLine)
const sum = (arr) => arr.reduce((total, num) => num + total)

const isTriangle = (sides) => {
  return sides.every((val, i, arr) => {
    const otherSides = arr.slice()
    otherSides.splice(i, 1)
    return sum(otherSides) > val
  })
}

function part1(input) {
  return parseInput(input).filter(isTriangle).length
}

// Part 2
// ======

const parseVerticalTriads = (input) => {
  let buffer = []
  return input.split('\n').reduce((triangles, line, lineIndex) => {
    buffer.push(parseLine(line))
    if (lineIndex % 3 === 2) {
      const destructuredBuffer = buffer.map((bufferedLine, i, buf) => {
        return buf.map((l) => l[i])
      })
      triangles.push(...destructuredBuffer)
      buffer = []
    }
    return triangles
  }, [])
}

function part2(input) {
  return parseVerticalTriads(input).filter(isTriangle).length
}

module.exports = { part1, part2 }
