'use strict'

// Part 1
// ======

const isOdd = (num) => Boolean(num % 2)
const isEven = (num) => !isOdd(num)

const processData = (a) => {
  let b = ''
  for (let i = a.length - 1; i >= 0; i--) {
    b += a[i] === '1' ? '0' : '1'
  }
  return `${a}0${b}`
}

const checksum = (data) => {
  let sum = ''
  for (let i = 0; i < data.length; i += 2) {
    sum += data[i] === data[i + 1] ? '1' : '0'
  }
  if (isEven(sum.length)) return checksum(sum)
  return sum
}

const processUntilLength = (data, length) => {
  while (data.length < length) {
    data = processData(data)
  }
  return data.substr(0, length)
}

function part1(input) {
  const LENGTH = 272
  const data = processUntilLength(input, LENGTH)
  return checksum(data)
}

// Part 2
// ======

function part2(input) {
  const LENGTH = 35651584
  const data = processUntilLength(input, LENGTH)
  return checksum(data)
}

module.exports = { part1, part2 }
