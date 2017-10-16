'use strict'

// Part 1
// ======

const parseLine = (line) => {
  const [ , command, x, y ] = line.match(/^(\w+) ([^\s]+) ?([^\s]+)?/)
  return { command, x, y }
}

const isNum = (val) => !Number.isNaN(parseInt(val, 10))

const RUN = {
  cpy: ({ x, y }, registers, i) => {
    const value = isNum(x) ? parseInt(x, 10) : registers[x]
    registers[y] = value
    return i + 1
  },
  inc: ({ x, y }, registers, i) => {
    registers[x]++
    return i + 1
  },
  dec: ({ x, y }, registers, i) => {
    registers[x]--
    return i + 1
  },
  jnz: ({ x, y }, registers, i) => {
    const offset = registers[x] === 0 ? 1 : parseInt(y, 10)
    return i + offset
  },
}

function runProgram(input, registers) {
  const program = input.split('\n').map(parseLine)
  for (let i = 0; i < program.length;) {
    const command = program[i]
    i = RUN[command.command](command, registers, i)
  }
  return registers
}

function part1(input) {
  const registers = runProgram(input, {
    a: 0,
    b: 0,
    c: 0,
    d: 0,
  })
  return registers.a
}

// Part 2
// ======

function part2(input) {
  const registers = runProgram(input, {
    a: 0,
    b: 0,
    c: 1,
    d: 0,
  })
  return registers.a
}

module.exports = { part1, part2 }
