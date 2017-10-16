'use strict'

// Part 1
// ======

const parseNum = (num) => parseInt(num, 10)
const parseMarker = (marker) => marker.split('x').map(parseNum)

const decompressionLength = (input, recurse) => {
  let length = 0
  for (let i = 0; i < input.length; i++) {
    if (input[i] === '(') {
      const endOfMarker = input.indexOf(')', i)
      const marker = input.substring(i + 1, endOfMarker)
      const [ span, repeat ] = parseMarker(marker)
      const subStr = input.substr(endOfMarker + 1, span).repeat(repeat)
      length += recurse
        ? decompressionLength(subStr, recurse)
        : subStr.length
      i = endOfMarker + span
    }
    else {
      length++
    }
  }
  return length
}

function part1(input) {
  return decompressionLength(input)
}

// Part 2
// ======

function part2(input) {
  return decompressionLength(input, true)
}

module.exports = { part1, part2 }
