'use strict'

/**
 * --- Day 10: Balance Bots ---
 *
 * You come upon a factory in which many robots are [zooming
 * around](https://www.youtube.com/watch?v=JnkMyfQ5YfY&t=40) handing small
 * microchips to each other.
 *
 * Upon closer examination, you notice that each bot only proceeds when it has
 * two microchips, and once it does, it gives each one to a different bot or
 * puts it in a marked "output" bin. Sometimes, bots take microchips from
 * "input" bins, too.
 *
 * Inspecting one of the microchips, it seems like they each contain a single
 * number; the bots must use some logic to decide what to do with each chip.
 * You access the local control computer and download the bots' instructions
 * (your puzzle input).
 *
 * Some of the instructions specify that a specific-valued microchip should be
 * given to a specific bot; the rest of the instructions indicate what a given
 * bot should do with its lower-value or higher-value chip.
 *
 * For example, consider the following instructions:
 *
 *     value 5 goes to bot 2
 *     bot 2 gives low to bot 1 and high to bot 0
 *     value 3 goes to bot 1
 *     bot 1 gives low to output 1 and high to bot 0
 *     bot 0 gives low to output 2 and high to output 0
 *     value 2 goes to bot 2
 *
 * - Initially, bot `1` starts with a value-`3` chip, and bot `2` starts with a
 *   value-`2` chip and a value-`5` chip.
 * - Because bot `2` has two microchips, it gives its lower one (`2`) to bot
 *   `1` and its higher one (`5`) to bot `0`.
 * - Then, bot `1` has two microchips; it puts the value-`2` chip in output `1`
 *   and gives the value-`3` chip to bot `0`.
 * - Finally, bot `0` has two microchips; it puts the `3` in output `2` and the
 *   `5` in output `0`.
 *
 * In the end, output bin `0` contains a value-`5` microchip, output bin `1`
 * contains a value-`2` microchip, and output bin `2` contains a value-`3`
 * microchip. In this configuration, bot number `2` is responsible for
 * comparing value-`5` microchips with value-`2` microchips.
 *
 * Based on your instructions, what is the number of the bot that is
 * responsible for comparing value-`61` microchips with value-`17` microchips?
 */

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

/**
 * --- Part Two ---
 *
 * <span title="What do you get if you multiply six by nine?">What do you
 *  get</span> if you multiply together the values of one chip in each of
 *  outputs `0`, `1`, and `2`?
 */

const product = (arr) => arr.reduce((total, num) => total * num)

function part2(input) {
  const { outputs } = mapInstructions(input)
  return product([ outputs[0], outputs[1], outputs[2] ])
}

module.exports = { part1, part2 }
