'use strict'

/**
 * --- Day 1: No Time for a Taxicab ---
 *
 * Santa's sleigh uses a very high-precision clock to guide its movements, and
 * the clock's oscillator is regulated by stars. Unfortunately, the stars have
 * been stolen... by the Easter Bunny. To save Christmas, Santa needs you to
 * retrieve all fifty stars by December 25th.
 *
 * Collect stars by solving puzzles. Two puzzles will be made available on each
 * day in the advent calendar; the second puzzle is unlocked when you complete
 * the first. Each puzzle grants one star. Good luck!
 *
 * You're airdropped near Easter Bunny Headquarters in a city somewhere. "Near",
 * unfortunately, is as close as you can get - the instructions on the Easter
 * Bunny Recruiting Document the Elves intercepted start here, and nobody had
 * time to work them out further.
 *
 * The Document indicates that you should start at the given coordinates (where
 * you just landed) and face North. Then, follow the provided sequence: either
 * turn left (L) or right (R) 90 degrees, then walk forward the given number of
 * blocks, ending at a new intersection.
 *
 * There's no time to follow such ridiculous instructions on foot, though, so
 * you take a moment and work out the destination. Given that you can only walk
 * on the street grid of the city, how far is the shortest path to the
 * destination?
 *
 * For example:
 *
 * Following R2, L3 leaves you 2 blocks East and 3 blocks North, or 5 blocks
 * away.
 * R2, R2, R2 leaves you 2 blocks due South of your starting position, which is
 * 2 blocks away.
 * R5, L5, R5, R3 leaves you 12 blocks away.
 * How many blocks away is Easter Bunny HQ?
 */

const NEXT_FACE = {
  'N': { 'L': 'W', 'R': 'E' },
  'E': { 'L': 'N', 'R': 'S' },
  'S': { 'L': 'E', 'R': 'W' },
  'W': { 'L': 'S', 'R': 'N' },
}
const NEXT_DISTANCE = {
  'N': (pos, distance) => ({ y: pos.y - distance }),
  'E': (pos, distance) => ({ x: pos.x + distance }),
  'S': (pos, distance) => ({ y: pos.y + distance }),
  'W': (pos, distance) => ({ x: pos.x - distance }),
}

const nextPosition = (pos, command) => {
  const face = NEXT_FACE[pos.face][command.direction]
  const posChange = NEXT_DISTANCE[face](pos, command.distance)
  return Object.assign({}, pos, posChange, { face })
}

const parseInput = (instruction) => {
  const [, direction, distance ] = instruction.match(/(R|L)(\d+)/)
  return {
    direction,
    distance: parseInt(distance, 10)
  }
}
const getCommands = (input) => input.split(', ').map(parseInput)
const changePos = ({ direction, distance }) => {}

function part1(input) {
  const start = { x: 0, y: 0, face: 'N' }
  const end = getCommands(input).reduce((pos, command) => {
    return nextPosition(pos, command)
  }, start)
  const xDistance = Math.abs(start.x - end.x)
  const yDistance = Math.abs(start.y - end.y)
  return xDistance + yDistance
}

/**
 * --- Part Two ---
 *
 * Then, you notice the instructions continue on the back of the Recruiting
 * Document. Easter Bunny HQ is actually at the first location you visit twice.
 *
 * For example, if your instructions are R8, R4, R4, R8, the first location you
 * visit twice is 4 blocks away, due East.
 *
 * How many blocks away is the first location you visit twice?
 */

const tracker = () => {
  const visited = {}
  return ({ x, y }) => {
    const key = `${x}:${y}`
    if (visited[key]) return visited[key]
    visited[key] = true
    return false
  }
}



const getSteps = (prev, next, acc = []) => {
  let newPoint
  if (prev.x < next.x) newPoint = { x: prev.x + 1, y: prev.y }
  else if (prev.x > next.x) newPoint = { x: prev.x - 1, y: prev.y }
  else if (prev.y < next.y) newPoint = { x: prev.x, y: prev.y + 1 }
  else if (prev.y > next.y) newPoint = { x: prev.x, y: prev.y - 1 }
  else return acc
  return getSteps(newPoint, next, acc.concat(newPoint))
}

function part2(input) {
  const visit = tracker()
  const start = { x: 0, y: 0, face: 'N' }
  let currentPos = start
  visit(start)
  getCommands(input).some((command) => {
    const nextPos = nextPosition(currentPos, command)
    const steps = getSteps(currentPos, nextPos)
    return steps.some((step) => {
      currentPos = {
        x: step.x,
        y: step.y,
        face: nextPos.face,
      }
      return visit(currentPos)
    })
  })
  const xDistance = Math.abs(start.x - currentPos.x)
  const yDistance = Math.abs(start.y - currentPos.y)
  return xDistance + yDistance
}

module.exports = { part1, part2 }
