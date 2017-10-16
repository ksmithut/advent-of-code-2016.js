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
    if (isNum(y)) return i + 1
    registers[y] = value
    return i + 1
  },
  inc: ({ x }, registers, i) => {
    registers[x]++
    return i + 1
  },
  dec: ({ x }, registers, i) => {
    registers[x]--
    return i + 1
  },
  jnz: ({ x, y }, registers, i) => {
    const value = isNum(y) ? parseInt(y, 10) : registers[y]
    const offset = registers[x] === 0 ? 1 : value
    return i + offset
  },
  tgl: ({ x }, registers, i, program) => {
    const command = program[i + registers[x]]
    if (!command) return i + 1
    switch (command.command) {
    case 'inc':
      command.command = 'dec'
      break
    case 'dec':
    case 'tgl':
      command.command = 'inc'
      break
    case 'jnz':
      command.command = 'cpy'
      break
    case 'cpy':
      command.command = 'jnz'
      break
    default:
      throw new Error('command.command not handled:', command.command)
    }
    return i + 1
  },
}

function runProgram(input, registers) {
  const program = input.split('\n').map(parseLine)
  for (let i = 0; i < program.length;) {
    const command = program[i]
    i = RUN[command.command](command, registers, i, program)
  }
  return registers
}

function part1(input) {
  const registers = runProgram(input, {
    a: 7,
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
    a: 12,
    b: 0,
    c: 0,
    d: 0,
  })
  return registers.a
}

module.exports = { part1, part2 }
