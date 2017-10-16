'use strict'

// Part 1
// ======

const parseLine = (line) => {
  const parts = line.replace(/(\[|])/g, '.').split('.')
  return parts.reduce((acc, part, i) => {
    const key = i % 2 ? 'hypertext' : 'parts'
    acc[key].push(part)
    return acc
  }, {
    hypertext: [],
    parts: [],
  })
}

const hasAbba = (piece) => {
  return (piece.match(/(\w)(\w)\2\1/g) || []).filter((match) => {
    return !(/(\w)\1\1\1/).test(match)
  }).length > 0
}

const isTls = (line) => {
  const { hypertext, parts } = parseLine(line)
  return parts.some(hasAbba) && !hypertext.some(hasAbba)
}

function part1(input) {
  return input.split('\n')
    .filter(isTls)
    .length
}

// Part 2
// ======

const matchOverlap = (input, regex) => {
  const matches = []
  let match
  while ((match = regex.exec(input))) {
    regex.lastIndex -= match[0].length - 1
    matches.push(match[0])
  }
  return matches
}

const getAbas = (piece) => {
  return matchOverlap(piece, /(\w)\w\1/g).filter((match) => {
    return !(/\w\1\1/).test(match)
  })
}

const hasBabs = (piece, abas) => {
  return abas.some((aba) => {
    const reverse = aba.replace(/^(\w)(\w)\w/, '$2$1$2')
    return piece.includes(reverse)
  })
}

const isSsl = (line) => {
  const { hypertext, parts } = parseLine(line)
  const abas = parts.reduce((acc, part) => acc.concat(getAbas(part)), [])
  return hypertext.some((part) => hasBabs(part, abas))
}

function part2(input) {
  return input.split('\n')
    .filter(isSsl)
    .length
}

module.exports = { part1, part2 }
