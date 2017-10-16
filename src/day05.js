'use strict'

// Part 1
// ======

const crypto = require('crypto')

const hashStr = (data) => crypto
  .createHash('md5')
  .update(data)
  .digest('hex')

function part1(input) {
  let password = ''
  const isInteresting = (str) => str.startsWith('00000')
  const incrementPassword = (pwd, str) => pwd + str.charAt(5)
  const passwordCondition = () => password.length < 8
  for (let i = 0; passwordCondition(); i++) {
    const hash = hashStr(`${input}${i}`)
    if (isInteresting(hash)) password = incrementPassword(password, hash)
  }
  return password
}

// Part 2
// ======

const randomChar = () => crypto.randomBytes(Math.ceil(3 / 4))
  .toString('base64')
  .slice(0, 1)
  .replace(/\+/g, '0')
  .replace(/\//g, '0')
const randomFill = (arr) => {
  const newArray = []
  for (let i = 0; i < arr.length; i++) {
    newArray.push(arr[i] || randomChar())
  }
  return newArray
}
const printPassword = (arr) => {
  process.stdout.clearLine()
  process.stdout.cursorTo(0)
  process.stdout.write(randomFill(arr).join(''))
}

function part2(input) {
  let password = new Array(8)
  const isInteresting = (str) => {
    return str.startsWith('00000') && (/[0-7]/).test(str.charAt(5))
  }
  const incrementPassword = (pwd, str) => {
    const pos = str.charAt(5)
    if (pwd[pos]) return pwd
    pwd[pos] = str.charAt(6)
    return pwd
  }
  const passwordCondition = () => password.filter(Boolean).length < 8
  for (let i = 0; passwordCondition(); i++) {
    const hash = hashStr(`${input}${i}`)
    if (isInteresting(hash)) password = incrementPassword(password, hash)
    if (i % 10000 === 0) printPassword(password, i)
  }
  printPassword(password)
  console.log()
  return password.join('')
}

module.exports = { part1, part2 }
