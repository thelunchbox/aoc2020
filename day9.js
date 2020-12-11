const fs = require('fs');

// const input = fs.readFileSync('./day9sample.txt', 'utf-8');
const input = fs.readFileSync('./day9.txt', 'utf-8');
const lines = input.split('\n').map(line => parseInt(line));

const PREAMBLE_LENGTH = 25;
let erroneousIndex;

for (let i = PREAMBLE_LENGTH; i < lines.length; i++) {
  const target = lines[i];
  const preamble = lines.slice(i - PREAMBLE_LENGTH, i);
  const options = preamble.filter(n => n <= target);

  let pair = null;    
  for (let a = 0; a < options.length; a++) {
    for (let b = a + 1; b < options.length; b++) {
      if (options[a] + options[b] === target) {
        pair = [a, b];
        break;
      }
    }
    if (pair) break;
  }

  if (!pair) {
    erroneousIndex = i;
    break;
  }
}

console.log('index', erroneousIndex, 'value', lines[erroneousIndex]);

for (let j = 0; j < erroneousIndex; j++) {
  const contiguous = [];
  let restart = false;
  let stop = false;
  for (let k = j; k < erroneousIndex; k++) {
    if (lines[k] > lines[erroneousIndex]) {
      restart = true;
      break;
    }
    contiguous.push(lines[k]);
    const sum = contiguous.reduce((sum, x) => sum + x, 0);
    if (sum === lines[erroneousIndex]) {
      stop = true;
      break;
    }
  }
  if (restart) continue;
  if (stop) {
    const min = Math.min(...contiguous);
    const max = Math.max(...contiguous);
    console.log(min + max);
    break;
  }
}
