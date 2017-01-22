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
    y = isNum(y) ? parseInt(y, 10) : registers[y]
    x = isNum(x) ? parseInt(x, 10) : registers[x]
    const offset = x === 0 ? 1 : y
    return i + offset
  },
  out: ({ x }, registers, i, program, log) => { // eslint-disable-line max-params
    const value = isNum(x) ? parseInt(x, 10) : registers[x]
    log(value)
    return i + 1
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

const isClockSignal = (arr) => {
  return arr.slice(arr[0]).every((val, i) => {
    return val === i % 2
  })
}

function runProgram(input, registers) {
  const program = input.split('\n').map(parseLine)
  const vals = []
  const log = (val) => vals.push(val)
  for (let i = 0; i < program.length && vals.length < 100;) {
    const command = program[i]
    i = RUN[command.command](command, registers, i, program, log)
  }
  return isClockSignal(vals)
}

function part1(input) {
  for (let a = 0; ; a++) {
    const isRightSignal = runProgram(input, {
      a,
      b: 0,
      c: 0,
      d: 0,
    })
    if (isRightSignal) return a
  }
}

// Part 2
// ======

function part2(input) {
  return input
}

module.exports = { part1, part2 }
