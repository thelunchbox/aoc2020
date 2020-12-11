const { group } = require('console');
const fs = require('fs');

const input = fs.readFileSync('./day6.txt', 'utf-8');
const lines = input.split('\n');
lines.push('');

let questions = {};
let count = 0;
let groupSize = 0;

for(let l = 0; l < lines.length; l++) {
  const line = lines[l];
  if (line) {
    line.split('').forEach(key => questions[key] = (questions[key] || 0) + 1);
    groupSize++;
  } else {
    count += Object.values(questions).filter(value => value === groupSize).length;
    questions = {};
    groupSize = 0;
  }
}

console.log(count);