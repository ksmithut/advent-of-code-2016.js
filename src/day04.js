'use strict'

// Part 1
// ======

const parseLine = (line) => {
  const [ , name, id, checksum ] = line.match(/^([a-z-]+)-(\d+)\[([a-z]{5})]/)
  return {
    name,
    id: parseInt(id, 10),
    checksum,
  }
}

const getChecksum = (name) => {
  const letters = name
    .replace(/-/g, '')
    .split('')
    .reduce((acc, char) => {
      acc[char] = (acc[char] || 0) + 1
      return acc
    }, {})
  return Object.keys(letters)
    .sort((charA, charB) => {
      if (letters[charA] === letters[charB]) {
        return charA.charCodeAt(0) - charB.charCodeAt(0)
      }
      return letters[charB] - letters[charA]
    })
    .join('')
    .substr(0, 5)
}

const isDecoy = (name, checksum) => checksum === getChecksum(name)

function part1(input) {
  return input.split('\n')
    .map(parseLine)
    .filter((room) => isDecoy(room.name, room.checksum))
    .reduce((total, line) => total + line.id, 0)
}

// Part 2
// ======

const A_CHAR_CODE = 97
const Z_CHAR_CODE = 122
const incrementChar = (char) => {
  let newCode = char.charCodeAt(0) + 1
  if (newCode > Z_CHAR_CODE) newCode = A_CHAR_CODE
  return String.fromCharCode(newCode)
}
const incrementCharTimes = (char, times) => {
  return new Array(times)
    .fill(null)
    .reduce(incrementChar, char)
}
const decryptRoom = (room) => {
  room.decryptedName = room.name
    .split('')
    .map((char) => {
      if (char === '-') return ' '
      return incrementCharTimes(char, room.id)
    })
    .join('')
  return room
}

function part2(input) {
  return input.split('\n')
    .map(parseLine)
    .filter((room) => isDecoy(room.name, room.checksum))
    .map(decryptRoom)
    .find((room) => room.decryptedName === 'northpole object storage')
    .id
}

module.exports = { part1, part2 }
