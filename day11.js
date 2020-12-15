const fs = require('fs');

const input = fs.readFileSync('./day11.txt', 'utf-8');
// const input = fs.readFileSync('./day11sample.txt', 'utf-8');
const lines = input.split('\n');

let seats = lines.map(line => line.split(''));

const FLOOR = '.';
const EMPTY = 'L';
const OCCUPADO = '#';

function getAdjacentOccupancyCount(s, row, col, tolerance = 0) {
  
  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    // [0, 0], this is me
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  const occupied = directions.filter(([x, y]) => {
    let r = row + x;
    let c = col + y;
    let i = 0;
    while ((tolerance === 0 || i < tolerance) && r >= 0 && r < s.length && c >= 0 && c < s[r].length) {
      if (s[r][c] === OCCUPADO) {
        // console.log('occupied seat found at', r, c, i);
        return true;
      }
      if (s[r][c] === EMPTY) {
        // console.log('empty seat found at', r, c, i);
        return false;
      }
      r += x;
      c += y;
      i++;
    }
    // console.log('nothing ever found', r, c, i);
    return false;
  });
  return occupied.length;
}

function update(s, level, tolerance) {
  return s.map((row, r) => row.map((seat, c) => {
    if (seat === FLOOR) return FLOOR;
    const count = getAdjacentOccupancyCount(s, r, c, tolerance);
    if (seat === EMPTY && count === 0) return OCCUPADO;
    if (seat === OCCUPADO && count >= level) return EMPTY;
    return seat;
  }));
}

function part1(s) {
  let last = null;
  let next = s.map(row => row.join('')).join('\n');
  
  // console.log(next);
  while (next != last) {
    s = update(s, 4, 1);
    last = next;
    next = s.map(row => row.join('')).join('\n');
    // console.log(seats[0].map(x => '-').join(''));
    // console.log(next);
  }
  
  const occupiedSeats = next.split('').filter(x => x === OCCUPADO).length;
  console.log('part 1:', occupiedSeats);
}

function part2(s) {
  let last = null;
  let next = s.map(row => row.join('')).join('\n');
  
  // console.log(next);
  while (next != last) {
    s = update(s, 5, 0);
    last = next;
    next = s.map(row => row.join('')).join('\n');
    // console.log(seats[0].map(x => '-').join(''));
    // console.log(next);
  }
  
  const occupiedSeats = next.split('').filter(x => x === OCCUPADO).length;
  console.log('part 2:', occupiedSeats);
}

function cloneSeats() {
  return seats.map(row => [...row]);
}

part1(cloneSeats());
part2(cloneSeats());

// const test = `.........
// ...#.....
// .L.......
// .........
// ..#L.....
// ....#....
// .........
// #........
// ...#.....`.split('\n').map(x => x.split(''));
// const count = getAdjacentOccupancyCount(test, 4, 3, 0);
// console.log(count);
