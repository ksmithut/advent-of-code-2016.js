'use strict'

// Part 1
// ======

const crypto = require('crypto')

const hashStr = (str) => crypto
  .createHash('md5')
  .update(str)
  .digest('hex')

const hashRepeat = (str, repeat = 1) => {
  let hash = str
  for (let i = 0; i < repeat; i++) hash = hashStr(hash)
  return hash
}

const firstTriplet = (str) => {
  const [ triplet ] = str.match(/(\w)\1{2}/) || []
  return triplet || null
}

const matchQuintuplet = (str, char) => {
  return str.includes(char.charAt(0).repeat(5))
}

const findValidKeys = (key, amount, hashAmount) => {
  const hashes = []
  const candidates = []
  const validKeys = []

  for (let i = 0; validKeys.length < amount; i++) {
    const hash = hashRepeat(`${key}${i}`, hashAmount)
    hashes.push(hash)

    const triplet = firstTriplet(hash)
    if (triplet) candidates[i] = { index: i, hash, char: triplet.charAt(0) }

    const candidate = candidates[i - 1000]
    if (candidate) {
      const matches = hashes.slice(i - 999)
        .filter((h) => matchQuintuplet(h, candidate.char))
      if (matches.length) {
        validKeys.push(candidate)
      }
    }
  }
  return validKeys
}

function part1(input) {
  const newKeys = findValidKeys(input, 64)
  return newKeys[newKeys.length - 1].index
}

// Part 2
// ======

function part2(input) {
  const newKeys = findValidKeys(input, 64, 2017)
  return newKeys[newKeys.length - 1].index
}

module.exports = { part1, part2 }
