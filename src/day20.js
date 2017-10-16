'use strict'

// Part 1
// ======

const HIGHEST_INT32 = 4294967295

const parseLine = (line) => {
  return line.split('-').map(Number)
}

const sortInputs = (input) => {
  const inputs = input
    .split('\n')
    .map(parseLine)
    .sort((a, b) => a[0] - b[0] || a[1] - b[1])
  // Combine overlapping ranges
  for (let i = 0; i < inputs.length - 1; i++) {
    if (inputs[i][1] > inputs[i + 1][0]) {
      inputs[i][1] = Math.max(inputs[i][1], inputs[i + 1][1])
      inputs.splice(i + 1, 1)
      i--
    }
  }
  return inputs
}

const findAllIps = (input) => {
  const whitelist = []
  const blacklist = sortInputs(input)
  blacklist.push(new Array(2).fill(HIGHEST_INT32 + 1))
  let currentInput = 0
  for (let i = 0; i <= HIGHEST_INT32; i++) {
    const line = blacklist[currentInput]
    if (i < line[0]) whitelist.push(i)
    else if (i >= line[0] && i < line[1]) {
      i = line[1]
      currentInput++
    }
  }
  return whitelist
}

function part1(input) {
  return findAllIps(input)[0]
}

// Part 2
// ======

function part2(input) {
  return findAllIps(input).length
}

module.exports = { part1, part2 }
