# advent-of-code-2016.js

This is my repo for keeping track of my answers for [advent of code][advent].
This is setup for questions to be answered using JavaScript, specifically in the
[node][node] environment.

You must have `node` installed on your machine, and it must be version 6 or
later. If you are using [`nvm`][nvm], you can run `nvm install && nvm use` while
in the directory of this project.

You can also set an environment variable `ADVENT_SESSION` if you'd like to pull
info (input and description) from [adventofcode.com](advent). Set it to the
value of the "Cookie" header on adventofcode.com after you login.

```sh
npm install
npm run init day1
npm start day1 part1 'your input'
npm start day1 part1 + # If you have ADVENT_SESSION set, it will pull input from adventofcode.com
npm start day1 part1 - < day1.input # Putting in `-` will make it read the input from stdin
```

[advent]: http://adventofcode.com/
[node]: https://nodejs.org/en/
[nvm]: https://github.com/creationix/nvm
