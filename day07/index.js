'use strict'

/**
 * --- Day 7: Internet Protocol Version 7 ---
 *
 * While snooping around the local network of EBHQ, you compile a list of IP
 * addresses (they're IPv7, of course; IPv6 is much too limited). You'd like to
 * figure out which IPs support TLS (transport-layer snooping).
 *
 * An IP supports TLS if it has an Autonomous Bridge Bypass Annotation, or ABBA.
 * An ABBA is any four-character sequence which consists of a pair of two
 * different characters followed by the reverse of that pair, such as xyyx or
 * abba. However, the IP also must not have an ABBA within any hypernet
 * sequences, which are contained by square brackets.
 *
 * For example:
 *
 * - abba[mnop]qrst supports TLS (abba outside square brackets).
 * - abcd[bddb]xyyx does not support TLS (bddb is within square brackets, even
 *   though xyyx is outside square brackets).
 * - aaaa[qwer]tyui does not support TLS (aaaa is invalid; the interior
 *   characters must be different).
 * - ioxxoj[asdfgh]zxcvbn supports TLS (oxxo is outside square brackets, even
 *   though it's within a larger string).
 *
 * How many IPs in your puzzle input support TLS?
 */

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

/**
 * --- Part Two ---
 *
 * You would also like to know which IPs support SSL (super-secret listening).
 *
 * An IP supports SSL if it has an Area-Broadcast Accessor, or ABA, anywhere in
 * the supernet sequences (outside any square bracketed sections), and a
 * corresponding Byte Allocation Block, or BAB, anywhere in the hypernet
 * sequences. An ABA is any three-character sequence which consists of the same
 * character twice with a different character between them, such as xyx or aba.
 * A corresponding BAB is the same characters but in reversed positions: yxy and
 * bab, respectively.
 *
 * For example:
 *
 * - aba[bab]xyz supports SSL (aba outside square brackets with corresponding
 *   bab within square brackets).
 * - xyx[xyx]xyx does not support SSL (xyx, but no corresponding yxy).
 * - aaa[kek]eke supports SSL (eke in supernet with corresponding kek in
 *   hypernet; the aaa sequence is not related, because the interior character
 *   must be different).
 * - zazbz[bzb]cdb supports SSL (zaz has no corresponding aza, but zbz has a
 *   corresponding bzb, even though zaz and zbz overlap).
 *
 * How many IPs in your puzzle input support SSL?
 */

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
