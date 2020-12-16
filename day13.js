const fs = require('fs');

// const input = fs.readFileSync('./day13.txt', 'utf-8');
const input = fs.readFileSync('./day13sample.txt', 'utf-8');
const lines = input.split('\n');

const departure = parseInt(lines[0]);
const busses = lines[1].split(',').map(n => n === 'x' ? n : parseInt(n));
const inService = busses.filter(x => x !== 'x');

let bus, wait = -1;

for (let i = 0; i < inService.length; i++) {
  const check = inService[i];
  const leftovers = check - (departure % check);
  if (wait === -1 || leftovers < wait) {
    wait = leftovers;
    bus = check;
  }
}

console.log('part 1:', bus * wait, `(${bus} arrives in ${wait})`);

const departureMap = busses.reduce((map, bus, i) => {
  if (bus === 'x') return map;
  return [
    ...map,
    [bus, i],
  ];
}, []);

const max = Math.max(...inService);
const maxIndex = busses.indexOf(max);
let t;
for (let j = 1; true; j++) {
  t = max * j - maxIndex;
  console.log('checking t =', t);
  if (departureMap.every(([b, dt]) => b - (t % b) === dt)) {
    break;
  }
}

console.log('part 2:', t);