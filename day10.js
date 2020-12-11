const fs = require('fs');

// const input = fs.readFileSync('./day10sample.txt', 'utf-8');
const input = fs.readFileSync('./day10sample.txt', 'utf-8');
const lines = input.split('\n').map(line => parseInt(line));
const sorted = lines.sort((a, b) => a - b);

// console.log(sorted);

// let counts = {
//   1: 0,
//   3: 1,
// };

// for (let i = 0; i < sorted.length; i++) {
//   const diff = sorted[i] - (sorted[i - 1] || 0);
//   counts[diff] += 1;
// }
// console.log('part 1:', counts[1] * counts[3]);

// function countPathsToEnd(i, level = 0) {
//   const start = (sorted[i] || 0);
//   const indent = new Array(level).fill('--').join('');
//   const indicies = [1, 2, 3].map(x => sorted.indexOf(start + x));
//   // console.log(indent, indicies.join());
//   // console.log(indent, start, [1, 2, 3].map(x => sorted.indexOf(start + x) >= 0 ? start + x : '').join(' '));

//   const counts = indicies.map(x => x >= 0 ? countPathsToEnd(x, level + 1) : 0);
//   return indicies.every(x => x === -1) ? 1 : counts.reduce((sum, x) => sum + x);
// }

// console.log(countPathsToEnd(-1));

const tree = {};
sorted.unshift(0);
for (let i = 0; i < sorted.length; i++) {
  const start = (sorted[i] || 0);
  const indicies = [1, 2, 3].map(x => sorted.indexOf(start + x));
  branches[i] = indicies;
}
console.log(branches);
for (let j = 0; j < branches.length; j++) {
  const branch = branches[j];
  const count = branch.filter(x => x >= 0).length || 1;
  const value = sorted[j];
}

console.log('part 2:', branches.reduce((prod, x) => prod * x, 1));