const fs = require('fs');

const input = fs.readFileSync('./day12.txt', 'utf-8');
// const input = fs.readFileSync('./day12sample.txt', 'utf-8');
const lines = input.split('\n');

const E = 'E';
const W = 'W';
const N = 'N';
const S = 'S';

const F = 'F';
const L = 'L';
const R = 'R';

const order = [N, E, S, W];

// const ferry = {
//   dir: E,
//   x: 0,
//   y: 0,
// };

// function turn(dir, value) {
//   const amt = value / 90;
//   let i = order.indexOf(ferry.dir);
//   i += order.length;
//   const adjust = dir === R ? i + amt : i - amt;
//   const j = adjust % order.length;
//   return order[j];
// }

// lines.forEach(instruction => {
//   console.log(ferry);
//   console.log(instruction);
//   let command = instruction[0];
//   const value = parseInt(instruction.substr(1));

//   if (command === F) command = ferry.dir;

//   switch(command) {
//     case W:
//       ferry.x -= value;
//       break;
//     case E:
//       ferry.x += value;
//       break;
//     case N:
//       ferry.y += value;
//       break;
//     case S:
//       ferry.y -= value;
//       break;
//     default:
//       ferry.dir = turn(command, value);
//       break;
//   }
// });

// console.log(ferry);
// console.log(Math.abs(ferry.x) + Math.abs(ferry.y));

const ferry = {
  x: 0,
  y: 0,
};

let waypoint = {
  x: 10,
  y: 1,
};

function turn(dir, value) {
  const { x, y } = waypoint;
  let amt = value / 90;
  if (dir === L) amt = 4 - amt;
  switch(amt) {
    case 1:
      waypoint.x = y;
      waypoint.y = -x;
      break;
    case 2:
      waypoint.x = -x;
      waypoint.y = -y;
      break;
    case 3:
      waypoint.x = -y;
      waypoint.y = x;
      break;
  }
}

lines.forEach(instruction => {
  console.log(ferry);
  console.log(instruction);
  let command = instruction[0];
  const value = parseInt(instruction.substr(1));

  switch(command) {
    case W:
      waypoint.x -= value;
      break;
    case E:
      waypoint.x += value;
      break;
    case N:
      waypoint.y += value;
      break;
    case S:
      waypoint.y -= value;
      break;
    case F:
      ferry.x += waypoint.x * value;
      ferry.y += waypoint.y * value;
      break;
    default:
      turn(command, value);
      break;
  }
});

console.log(ferry);
console.log(Math.abs(ferry.x) + Math.abs(ferry.y));