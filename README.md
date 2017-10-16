# advent-of-code-2016.js

This is my repo for keeping track of my answers for [advent of code][advent].
This is setup for questions to be answered using JavaScript, specifically in the
[node][node] environment.

You can also set an environment variable `ADVENT_SESSION` if you'd like to pull
info (input and description) from [adventofcode.com](advent). Set it to the
value of the "Cookie" header on adventofcode.com after you login.

```sh
yarn
yarn advent init day1
yarn advent run day1 part1 'your input'
yarn advent run day1 part1 + # If you have ADVENT_SESSION set, it will pull input from adventofcode.com
yarn advent run day1 part1 - < day1.input # Putting in `-` will make it read the input from stdin
```

[advent]: http://adventofcode.com/
[node]: https://nodejs.org/en/
[nvm]: https://github.com/creationix/nvm
