const fs = require('fs');

const input = fs.readFileSync('./day2.txt', 'utf-8');
const lines = input.split('\n');
const regex = /(\d+)-(\d+) (\w): (\w+)/gm;

const valid = lines.filter(line => {
  const dash = line.indexOf('-');
  const colon = line.indexOf(':');
  const space = line.indexOf(' ');

  const lo = parseInt(line.substring(0, dash));
  const hi = parseInt(line.substring(dash + 1, space));
  const match = line.substring(space + 1, colon);

  const password = line.substr(colon + 2);

  // const count = password.split('').filter(c => c === match).length;
  // return count >= lo && count <= hi

  const pos1 = password[lo-1] === match;
  const pos2 = password[hi-1] === match;
  const ans = (pos1 && !pos2) || (!pos1 && pos2);

  console.log(password, match, lo, password[lo-1], pos1, hi, password[hi-1], pos2, 'answer:', ans);
  return ans;
});

console.log(valid.length);
