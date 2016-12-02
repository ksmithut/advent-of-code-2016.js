# Advent of Code

This is my repo for keeping track of my answers for [advent of code][advent].
This is setup for questions to be answered using JavaScript, specifically in the
[node][node] environment.

You must have `node` installed on your machine, and it must be version 6 or
later. If you are using [`nvm`][nvm], you can run `nvm install && nvm use` while
in the directory of this project.

```
npm install
npm start 1 # Run day 1's code
```

Each day has their own folder with three files in it:

- `answers.js` - This holds the input and answers to examples, as well as the
  answer to each part based in your official given input for the problem. If you
  apply this to your own advent of code inputs, you'll need to change your
  answers. I suggest that you remove them.
- `index.js` - This holds the actual code for your problems. It exports two
  functions: `part1()` and `part2()` which both take in the input of the
  contents of your input.
- `input.txt` - This is where you need to put your input that
  [advent of code][advent] gives you.

To run a day's code, run `npm start [day]`. For example, if you wish to run
`day01/`, you run `npm start 1` or `npm start 01` or `npm start day01`. You can
run multiple days. If you wish to run all of the days, run `npm start *`.

All of the inputs are set to my inputs. Change those for you as needed. You may
also need to change the answers, but the example inputs and answers should stay
the same. You can add to/remove from those examples as needed to test your
cases.

If you'd like to run your code with examples, you'll need to run it like this:

```
npm start -- -e 1
```

[advent]: http://adventofcode.com/
[node]: https://nodejs.org/en/
[nvm]: https://github.com/creationix/nvm
