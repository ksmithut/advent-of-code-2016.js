'use strict'

// Part 1
// ======

const SAFE = '.'
const TRAP = '^'

const some = (conditions) => {
  return (...args) => conditions.some((condition) => condition(...args))
}

const trapWrap = (fn) => {
  return (...args) => {
    args = args.map((arg) => arg === TRAP)
    return fn(...args)
  }
}

const isTrap = some([
  trapWrap((left, center, right) => left && center && !right),
  trapWrap((left, center, right) => !left && center && right),
  trapWrap((left, center, right) => left && !center && !right),
  trapWrap((left, center, right) => !left && !center && right),
])

const rowSafeCount = (row) => {
  return row.filter((tile) => tile === SAFE).length
}

const getNextRow = (prevRow) => {
  return prevRow.map((_, i, row) => {
    return isTrap(row[i - 1], row[i], row[i + 1]) ? TRAP : SAFE
  })
}

const countSafe = (input, totalRows) => {
  let total = 0
  const firstRow = input.split('')
  const rows = new Array(totalRows - 1).fill(null)
  total += rowSafeCount(firstRow)
  rows.reduce((prevRow) => {
    const newRow = getNextRow(prevRow)
    total += rowSafeCount(newRow)
    return newRow
  }, firstRow)
  return total
}

function part1(input) {
  return countSafe(input, 40)
}

// Part 2
// ======

function part2(input) {
  return countSafe(input, 400000)
}

module.exports = { part1, part2 }
