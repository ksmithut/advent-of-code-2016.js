'use strict'

// Part 1
// ======

const VALUE_REGEX = /^value (\d+) goes to bot (\d+)/
const COMPARE_REGEX = /^bot (\d+) gives low to (output|bot) (\d+) and high to (output|bot) (\d+)/ // eslint-disable-line max-len

const parseLine = (line) => {
  if (VALUE_REGEX.test(line)) {
    const [ , value, bot ] = line.match(VALUE_REGEX)
    return {
      command: 'assign',
      bot,
      value: parseInt(value, 10),
    }
  }
  const [ , bot, lowType, lowId, highType, highId ] = line.match(COMPARE_REGEX)
  return {
    command: 'compare',
    bot,
    low: { type: lowType, id: lowId },
    high: { type: highType, id: highId },
  }
}

const sortNums = (arr) => arr.slice().sort((a, b) => a - b)

const split = (arr, fn) => arr.reduce((acc, val) => {
  const key = fn(val)
  acc[key] = (acc[key] || []).concat([ val ])
  return acc
}, {})

const keyBy = (arr, key) => arr.reduce((acc, val) => {
  acc[val[key]] = val
  return acc
}, {})

const mapInstructions = (input) => {
  const instructions = input.split('\n').map(parseLine)
  const { assign, compare } = split(instructions, ({ command }) => command)
  const comparisons = keyBy(compare, 'bot')
  const outputs = {}
  const setValue = (type, id, value) => {
    if (type === 'output') outputs[id] = value
    else comparisons[id].setValue(value)
  }
  compare.forEach(({ bot, low, high }) => {
    const comparison = comparisons[bot]
    comparison.values = []
    comparison.setValue = (val) => {
      if (comparison.values.push(val) >= 2) {
        const [ lowNum, highNum ] = sortNums(comparison.values)
        setValue(low.type, low.id, lowNum)
        setValue(high.type, high.id, highNum)
      }
    }
  })
  assign.forEach(({ bot, value }) => {
    comparisons[bot].setValue(value)
  })
  const bots = compare.map(({ bot, values }) => ({ bot, values }))
  return { outputs, bots }
}

function part1(input) {
  const { bots } = mapInstructions(input)
  return bots.find(({ values }) => {
    return values.includes(61) && values.includes(17)
  }).bot
}

// Part 2
// ======

const product = (arr) => arr.reduce((total, num) => total * num)

function part2(input) {
  const { outputs } = mapInstructions(input)
  return product([ outputs[0], outputs[1], outputs[2] ])
}

module.exports = { part1, part2 }
