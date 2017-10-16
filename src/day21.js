'use strict'

// Part 1
// ======

const swap = (str, pos1, pos2) => {
  const arr = str.split('')
  const char1 = arr[pos1]
  arr[pos1] = arr[pos2]
  arr[pos2] = char1
  return arr.join('')
}

const rotate = (str, amount) => {
  const arr = str.split('')
  if (amount > 0) {
    for (let i = 0; i < amount; i++) arr.unshift(arr.pop())
  }
  else if (amount < 0) {
    for (let i = 0; i > amount; i--) arr.push(arr.shift())
  }
  return arr.join('')
}

const COMMANDS = {
  SWAP_POSITION: {
    regex: /^swap position (\d+) with position (\d+)$/,
    run: (val, pos1, pos2) => {
      return swap(val, parseInt(pos1, 10), parseInt(pos2, 10))
    },
  },
  SWAP_LETTER: {
    regex: /^swap letter (\w) with letter (\w)$/,
    run: (val, letter1, letter2) => {
      return swap(val, val.indexOf(letter1), val.indexOf(letter2))
    },
  },
  ROTATE_DIR: {
    regex: /^rotate (left|right) (\d+) steps?$/,
    run: (val, dir, steps) => {
      const modifier = dir === 'left' ? -1 : 1
      return rotate(val, modifier * parseInt(steps, 10))
    },
    nur: (val, dir, steps) => {
      const modifier = dir === 'left' ? 1 : -1
      return rotate(val, modifier * parseInt(steps, 10))
    },
  },
  ROTATE_POS: {
    regex: /^rotate based on position of letter (\w)$/,
    run: (val, letter) => {
      const index = val.indexOf(letter)
      let rotateAmount = 1 + index
      if (index >= 4) rotateAmount++
      return rotate(val, rotateAmount)
    },
    nur: (val, letter) => {
      let index = val.indexOf(letter)
      if (index !== 0 && index % 2 === 0) index += val.length
      index = (Math.floor(index / 2) + 1) % val.length
      index *= -1
      return rotate(val, index)
    },
  },
  REVERSE: {
    regex: /^reverse positions (\d+) through (\d+)$/,
    run: (val, pos1, pos2) => {
      pos1 = parseInt(pos1, 10)
      pos2 = parseInt(pos2, 10)
      const arr = val.split('')
      const subArr = arr.splice(pos1, pos2 - pos1 + 1)
      subArr.reverse()
      arr.splice(pos1, 0, ...subArr)
      return arr.join('')
    },
  },
  MOVE: {
    regex: /^move position (\d+) to position (\d+)$/,
    run: (val, pos1, pos2) => {
      pos1 = parseInt(pos1, 10)
      pos2 = parseInt(pos2, 10)
      const arr = val.split('')
      const subArr = arr.splice(pos1, 1)
      arr.splice(pos2, 0, ...subArr)
      return arr.join('')
    },
    nur: (val, pos1, pos2) => {
      pos1 = parseInt(pos1, 10)
      pos2 = parseInt(pos2, 10)
      const arr = val.split('')
      const subArr = arr.splice(pos2, 1)
      arr.splice(pos1, 0, ...subArr)
      return arr.join('')
    },
  },
}

const parseLine = (line) => {
  const commandKey = Object.keys(COMMANDS).find((key) => {
    return COMMANDS[key].regex.test(line)
  })
  const command = COMMANDS[commandKey]
  const [ , ...args ] = line.match(command.regex)
  return {
    args,
    run: command.run,
    nur: command.nur || command.run }
}

const getCommands = (input) => input.split('\n').map(parseLine)

function part1(input) {
  const password = 'abcdefgh'
  return getCommands(input)
    .reduce((val, { args, run }) => run(val, ...args), password)
}

// Part 2
// ======

function part2(input) {
  const scrambled = 'fbgdceah'
  return getCommands(input)
    .slice()
    .reverse()
    .reduce((val, { args, nur }) => nur(val, ...args), scrambled)
}

module.exports = { part1, part2 }
