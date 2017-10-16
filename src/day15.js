'use strict'

// Part 1
// ======

const PARSE_REGEX = /^Disc #\d+ has (\d+) positions; at time=0, it is at position (\d+).$/ // eslint-disable-line max-len

const parseLine = (line) => {
  const [ , max, pos ] = line.match(PARSE_REGEX)
  return {
    max: parseInt(max, 10),
    pos: parseInt(pos, 10),
  }
}

const nexter = (max, pos) => {
  let val = pos
  return (repeat = 1) => {
    for (let i = 0; i < repeat; i++) {
      val++
      if (val >= max) val = 0
    }
    return val
  }
}

class Disc {
  constructor(max, pos) {
    this.max = max
    this.pos = pos
    this.nexter = nexter(max, pos)
  }
  tick() {
    this.pos = this.nexter()
  }
  willBeAt(pos) {
    const next = nexter(this.max, this.pos)
    return {
      in: (time) => next(time) === pos,
    }
  }
}

const getDiscs = (input) => {
  return input.split('\n').map((line) => {
    const { max, pos } = parseLine(line)
    return new Disc(max, pos)
  })
}

const getIntersectionTime = (discs, pos = 0) => {
  for (let t = 0; ; t++) {
    const didIntersect = discs.every((disc, i) => {
      return disc.willBeAt(pos).in(i + 1)
    })
    if (didIntersect) return t
    discs.forEach((disc) => disc.tick())
  }
}

function part1(input) {
  const discs = getDiscs(input)
  return getIntersectionTime(discs)
}

// Part 1
// ======

function part2(input) {
  const discs = getDiscs(input)
  discs.push(new Disc(11, 0))
  return getIntersectionTime(discs)
}

module.exports = { part1, part2 }
