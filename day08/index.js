'use strict'

/**
 * --- Day 8: Two-Factor Authentication ---
 *
 * You come across a door implementing what you can only assume is an
 * implementation of two-factor authentication after a long game of
 * requirements telephone.
 *
 * To get past the door, you first swipe a keycard (no problem; there was one
 * on a nearby desk). Then, it displays a code on a little screen, and you type
 * that code on a keypad. Then, presumably, the door unlocks.
 *
 * Unfortunately, the screen has been smashed. After a few minutes, you've
 * taken everything apart and figured out how it works. Now you just have to
 * work out what the screen would have displayed.
 *
 * The magnetic strip on the card you swiped encodes a series of instructions
 * for the screen; these instructions are your puzzle input. The screen is 50
 * pixels wide and 6 pixels tall, all of which start off, and is capable of
 * three somewhat peculiar operations:
 *
 * - rect AxB turns on all of the pixels in a rectangle at the top-left of the
 * screen which is A wide and B tall.
 * - rotate row y=A by B shifts all of the pixels in row A (0 is the top row)
 * right by B pixels. Pixels that would fall off the right end appear at the
 * left end of the row.
 * - rotate column x=A by B shifts all of the pixels in column A (0 is the left
 * column) down by B pixels. Pixels that would fall off the bottom appear at
 * the top of the column.
 *
 * For example, here is a simple sequence on a smaller screen:
 *
 * - rect 3x2 creates a small rectangle in the top-left corner:
 * ###....
 * ###....
 * .......
 * - rotate column x=1 by 1 rotates the second column down by one pixel:
 * #.#....
 * ###....
 * .#.....
 * - rotate row y=0 by 4 rotates the top row right by four pixels:
 * ....#.#
 * ###....
 * .#.....
 * - rotate row x=1 by 1 again rotates the second column down by one pixel,
 * causing the bottom pixel to wrap back to the top:
 * .#..#.#
 * #.#....
 * .#.....
 *
 * As you can see, this display technology is extremely powerful, and will soon
 * dominate the tiny-code-displaying-screen market.  That's what the
 * advertisement on the back of the display tries to convince you, anyway.
 *
 * There seems to be an intermediate check of the voltage used by the display:
 * after you swipe your card, if the screen did work, how many pixels should be
 * lit?
 */

const COMMAND_SPLIT = /(rect|rotate) (.*)$/
const RECT_PARSE = /(\d+)x(\d+)/
const ROTATE_PARSE = /(x|y)=(\d+) by (\d+)/

const parseLine = (line) => {
  const [ , command, rawArgs ] = line.match(COMMAND_SPLIT)
  let args
  if (command === 'rect') {
    const [ , width, height ] = rawArgs.match(RECT_PARSE)
    args = {
      width: parseInt(width, 10),
      height: parseInt(height, 10),
    }
  }
  else {
    const [ , axis, index, offset ] = rawArgs.match(ROTATE_PARSE)
    args = {
      axis,
      index: parseInt(index, 10),
      offset: parseInt(offset, 10),
    }
  }
  return { command, args }
}

const createGrid = (width, height, defaultVal) => {
  return new Array(width)
    .fill(null)
    .map(() => new Array(height).fill(defaultVal))
}

const actions = {
  rect(grid, { width, height }) {
    for (let x = 0; x < width; x++) {
      for (let y = 0; y < height; y++) {
        grid[x][y] = 1
      }
    }
  },
  rotate(grid, { axis, index, offset }) {
    if (axis === 'x') {
      const slice = grid[index].slice()
      for (let i = 0; i < offset; i++) {
        slice.unshift(slice.pop())
      }
      grid[index] = slice
    }
    else {
      const slice = grid.map((col) => col[index])
      for (let i = 0; i < offset; i++) {
        slice.unshift(slice.pop())
      }
      grid.forEach((col, i) => { col[index] = slice[i] })
    }
  },
}

function countGrid(grid) {
  return grid.reduce((total, col) => {
    return total + col.reduce((rowTotal, cell) => rowTotal + cell)
  }, 0)
}

function printGrid(grid) {
  grid[0].forEach((row, i) => {
    let output = ''
    grid.forEach((col) => {
      output = `${output}${col[i] || ' '} `
    })
    console.log(output)
  })
}

function part1(input, width = 50, height = 6) {
  const grid = createGrid(width, height, 0)
  input.split('\n')
    .map(parseLine)
    .forEach((action) => {
      actions[action.command](grid, action.args)
    })
  return countGrid(grid)
}

// {{PART_2}}

function part2(input, width = 50, height = 6) {
  const grid = createGrid(width, height, 0)
  input.split('\n')
    .map(parseLine)
    .forEach((action) => {
      actions[action.command](grid, action.args)
    })
  return printGrid(grid)
}

module.exports = { part1, part2 }
