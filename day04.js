'use strict'

/**
 * --- Day 4: Security Through Obscurity ---
 *
 * Finally, you come across an information kiosk with a list of rooms. Of
 * course, the list is encrypted and full of decoy data, but the instructions
 * to decode the list are barely hidden nearby. Better remove the decoy data
 * first.
 *
 * Each room consists of an encrypted name (lowercase letters separated by
 * dashes) followed by a dash, a sector ID, and a checksum in square brackets.
 *
 * A room is real (not a decoy) if the checksum is the five most common letters
 * in the encrypted name, in order, with ties broken by alphabetization. For
 * example:
 *
 * - `aaaaa-bbb-z-y-x-123[abxyz]` is a real room because the most common
 *   letters are `a` (5), `b` (3), and then a tie between `x`, `y`, and `z`,
 *   which are listed alphabetically.
 * - `a-b-c-d-e-f-g-h-987[abcde]` is a real room because although the letters
 *   are all tied (1 of each), the first five are listed alphabetically.
 * - `not-a-real-room-404[oarel]` is a real room.
 * - `totally-real-room-200[decoy]` is not.
 *
 * Of the real rooms from the list above, the sum of their sector IDs is `1514`.
 *
 * What is the sum of the sector IDs of the real rooms?
 */

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

/**
 * --- Part Two ---
 *
 * With all the decoy data out of the way, it's time to decrypt this list and
 * get moving.
 *
 * The room names are encrypted by a state-of-the-art [shift
 * cipher](https://en.wikipedia.org/wiki/Caesar_cipher), which is nearly
 * unbreakable without <span title="...or, like, half of a napkin.">the right
 * software</span>. However, the information kiosk designers at Easter Bunny HQ
 * were not expecting to deal with a master cryptographer like yourself.
 *
 * To decrypt a room name, rotate each letter forward through the alphabet a
 * number of times equal to the room's sector ID. `A` becomes `B`, `B` becomes
 * `C`, `Z` becomes `A`, and so on. Dashes become spaces.
 *
 * For example, the real name for `qzmt-zixmtkozy-ivhz-343` is `very encrypted
 * name`.
 *
 * What is the sector ID of the room where North Pole objects are stored?
 */

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
