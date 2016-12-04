'use strict'

/**
 * --- Day 3: Squares With Three Sides ---
 *
 * Now that you can think clearly, you move deeper into the labyrinth of
 * hallways and office furniture that makes up this part of Easter Bunny HQ.
 * This must be a graphic design department; the walls are covered in
 * specifications for triangles.
 *
 * Or are they?
 *
 * The design document gives the side lengths of each triangle it describes,
 * but... 5 10 25? Some of these aren't triangles. You can't help but mark the
 * impossible ones.
 *
 * In a valid triangle, the sum of any two sides must be larger than the
 * remaining side. For example, the "triangle" given above is impossible,
 * because 5 + 10 is not larger than 25.
 *
 * In your puzzle input, how many of the listed triangles are possible?
 */

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

/**
 * Now that you've helpfully marked up their design documents, it occurs to you
 * that triangles are specified in groups of three vertically. Each set of three
 * numbers in a column specifies a triangle. Rows are unrelated.
 *
 * For example, given the following specification, numbers with the same
 * hundreds digit would be part of the same triangle:
 *
 * 101 301 501
 * 102 302 502
 * 103 303 503
 * 201 401 601
 * 202 402 602
 * 203 403 603
 * In your puzzle input, and instead reading by columns, how many of the listed
 * triangles are possible?
 */

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
