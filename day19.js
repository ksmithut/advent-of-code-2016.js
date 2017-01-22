'use strict'

// Part 1
// ======

class ElfCircle {
  constructor(numElves) {
    this.elves = new Array(parseInt(numElves, 10))
      .fill(1)
      .map((val, i) => ({ index: i, val }))
    this.currentElf = 0
  }
  _runStep() {
    const stealFromIndex = this._stealFromElf(this.currentElf)
    if (stealFromIndex === this.currentElf) return false
    this.elves[this.currentElf].val += this.elves[stealFromIndex].val
    this.elves.splice(stealFromIndex, 1)
    this.currentElf = stealFromIndex < this.currentElf
      ? this._nextElf(this.currentElf - 1)
      : this._nextElf(this.currentElf)
    return true
  }
  _nextElf(index) {
    return ++index >= this.elves.length ? 0 : index
  }
  _stealFromElf(index) {
    return this._nextElf(index)
  }
  run() {
    let count = 0
    while (true) {
      if (count % 1000 === 0) console.log(this.elves.length)
      const keepRunning = this._runStep()
      if (!keepRunning) return this.elves[this.currentElf]
      count++
    }
  }
}

function part1(input) {
  const circle = new ElfCircle(input)
  return circle.run().index + 1
}

// Part 2
// ======

class BetterElfCircle extends ElfCircle {
  _stealFromElf(index) {
    const length = this.elves.length
    let across = Math.floor(length / 2) + index
    if (across >= length) across -= length
    return across
  }
}

function part2(input) {
  const circle = new BetterElfCircle(input)
  return circle.run().index + 1
}

module.exports = { part1, part2 }
