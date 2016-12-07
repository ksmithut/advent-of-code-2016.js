'use strict'

exports.part1 = {
  answer: 115,
  examples: [
    { input: 'abba[mnop]qrst', value: 1 },
    { input: 'abcd[bddb]xyyx', value: 0 },
    { input: 'aaaa[qwer]tyui', value: 0 },
    { input: 'ioxxoj[asdfgh]zxcvbn', value: 1 },
  ],
}

exports.part2 = {
  answer: 231,
  examples: [
    { input: 'aba[bab]xyz', value: 1 },
    { input: 'xyx[xyx]xyx', value: 0 },
    { input: 'aaa[kek]eke', value: 1 },
    { input: 'zazbz[bzb]cdb', value: 1 },
  ],
}
