'use strict'

// Part 1
// ======

const NEXT_FACE = {
  N: { L: 'W', R: 'E' },
  E: { L: 'N', R: 'S' },
  S: { L: 'E', R: 'W' },
  W: { L: 'S', R: 'N' },
}
const NEXT_DISTANCE = {
  N: (pos, distance) => ({ y: pos.y - distance }),
  E: (pos, distance) => ({ x: pos.x + distance }),
  S: (pos, distance) => ({ y: pos.y + distance }),
  W: (pos, distance) => ({ x: pos.x - distance }),
}

const nextPosition = (pos, command) => {
  const face = NEXT_FACE[pos.face][command.direction]
  const posChange = NEXT_DISTANCE[face](pos, command.distance)
  return Object.assign({}, pos, posChange, { face })
}

const parseInput = (instruction) => {
  const [ , direction, distance ] = instruction.match(/(R|L)(\d+)/)
  return {
    direction,
    distance: parseInt(distance, 10),
  }
}
const getCommands = (input) => input.split(', ').map(parseInput)

function part1(input) {
  const start = { x: 0, y: 0, face: 'N' }
  const end = getCommands(input).reduce((pos, command) => {
    return nextPosition(pos, command)
  }, start)
  const xDistance = Math.abs(start.x - end.x)
  const yDistance = Math.abs(start.y - end.y)
  return xDistance + yDistance
}

// Part 2
// ======

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
