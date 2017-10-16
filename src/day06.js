'use strict'

// Part 1
// ======

const getColumns = (input) => {
  return input
    .split('\n')
    .reduce((cols, line) => {
      line.split('').forEach((char, i) => {
        cols[i] = cols[i] || {}
        cols[i][char] = (cols[i][char] || 0) + 1
      })
      return cols
    }, [])
}

const getMostCommon = (col) => {
  return Object.keys(col).sort((charA, charB) => {
    return col[charB] - col[charA]
  })[0]
}

function part1(input) {
  return getColumns(input)
    .reduce((str, col) => str + getMostCommon(col), '')
}

// Part 2
// ======

const getLeastCommon = (col) => {
  return Object.keys(col).sort((charA, charB) => {
    return col[charA] - col[charB]
  })[0]
}

function part2(input) {
  return getColumns(input)
    .reduce((str, col) => str + getLeastCommon(col), '')
}

module.exports = { part1, part2 }
