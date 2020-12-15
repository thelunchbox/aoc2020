const fs = require('fs');

// const input = fs.readFileSync('./day10sample.txt', 'utf-8');
const input = fs.readFileSync('./day10.txt', 'utf-8');
const lines = input.split('\n').map(line => !line.startsWith('//') ? parseInt(line): null);
const sorted = lines.filter(x => x).sort((a, b) => a - b);

let counts = {
  1: 0,
  3: 1,
};

const cache = {};

for (let i = 0; i < sorted.length; i++) {
  const diff = sorted[i] - (sorted[i - 1] || 0);
  counts[diff] += 1;
}
console.log('part 1:', counts[1] * counts[3]);

function countPathsToEnd(i, level = 0) {
  if (cache[i]) return cache[i];

  const start = (sorted[i] || 0);
  const indent = new Array(level).fill('--').join('');
  const indicies = [1, 2, 3].map(x => sorted.indexOf(start + x));
  // console.log(indent, indicies.join());
  // console.log(indent, start, [1, 2, 3].map(x => sorted.indexOf(start + x) >= 0 ? start + x : '').join(' '));

  const counts = indicies.map(x => x >= 0 ? countPathsToEnd(x, level + 1) : 0);
  const ans = indicies.every(x => x === -1) ? 1 : counts.reduce((sum, x) => sum + x);
  cache[i] = ans;
  return ans;
}

console.log(countPathsToEnd(-1));

// let unresolved = [];
// sorted.unshift(0);
// let total = 1;
// let multipliers = [];

// for (let i = 0; i < sorted.length; i++) {
//   const start = (sorted[i] || 0);
//   const indicies = ['ignore', 1, 2, 3].map(x => sorted.indexOf(start + x));
//   const routes = indicies.filter(x => x > -1).length;
//   console.log('start', start, 'unresolved', unresolved);
//   if (routes < 2) {
//     if (unresolved.includes(start)) {
//       total += unresolved.filter(x => x <= start).length;
//       unresolved = unresolved.filter(x => x > start);
//       if (unresolved.length === 0) {
//         multipliers.push(total);
//         total = 1;
//         console.log(multipliers);
//       }
//       if (routes === 0) {
//         console.log('end of possible chain');
//         break;
//       }
//     }
//   } else {
//     if (indicies[2] > -1) unresolved.push(start + 2);
//     if (indicies[3] > -1) unresolved.push(start + 3);
//   }
// }

// console.log('part 2:', multipliers.reduce((p, x) => p * x, 1));
// const cache = {};
// sorted.unshift(0);

// const dp = (n) => {
//   if (n === sorted.length - 1) {
//     console.log('end', n, '-', sorted[n]);
//     return 1;
//   }
//   if (n in cache) {
//     console.log('cached!', n, '-', sorted[n], '=', cache[n]);
//     return cache[n];
//   }
//   let ans = 0;
//   for (let i = n + 1; i < sorted.length; i++) {
//     if (sorted[i] - sorted[n] <= 3) {
//       ans += dp(i);
//     }
//   }
//   cache[n] = ans;
//   return ans;
// };

// console.log(dp(0));