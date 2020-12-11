const fs = require('fs');

const input = fs.readFileSync('./day3.txt', 'utf-8');
const lines = input.split('\n');

function findTrees(dx, dy) {
  let x = 0;
  let y = 0;
  let count = 0;
  
  while (y < lines.length) {
    const line = lines[y];
    count += line[x % line.length] === '#' ? 1 : 0;
    x += dx;
    y += dy;
  }
  return count;
}

const ans = [
  [1, 1],
  [3, 1],
  [5, 1],
  [7, 1],
  [1, 2],
].reduce((agg, slope) => agg * findTrees(...slope), 1);

console.log(ans);