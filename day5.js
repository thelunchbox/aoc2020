const fs = require('fs');

const input = fs.readFileSync('./day5.txt', 'utf-8');
const lines = input.split('\n');

const seatNums = lines.map(boardingPass => {
  const instructions = boardingPass
    .replace(/F/g, '0')
    .replace(/B/g, '1')
    .replace(/L/g, '0')
    .replace(/R/g, '1');

  const rowText = instructions.substr(0, 7);
  const colText = instructions.substr(7);

  const row = parseInt(
    rowText,
    2
  );
  const col = parseInt(
    colText,
    2
  );

  // console.log(rowText, row, colText, col);
  return row * 8 + col;
});

console.log(Math.max(...seatNums));

const missingSeats = seatNums.sort((a, b) => a - b).filter((seat, index, seats) => {
  return seats[index + 1] !== seat + 1 || seats[index - 1] !== seat - 1;
});

console.log(missingSeats);