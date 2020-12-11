const fs = require('fs');

// const input = fs.readFileSync('./day7sample.txt', 'utf-8');
const input = fs.readFileSync('./day8.txt', 'utf-8');
const lines = input.split('\n');

function run(substitutions = {}) {
  let pc = 0;
  let trace = [];
  let acc = 0;
  
  while (pc < lines.length) {
    const line = substitutions[pc] || lines[pc];
  
    if (trace.includes(pc)) {
      return [1, acc, pc, trace];
    }
    trace.push(pc);
  
    const [command, value] = line.split(' ');
    const valueNum = parseInt(value);
  
    switch(command) {
      case 'acc':
        acc += valueNum;
        pc += 1;
        break;
      case 'jmp':
        pc += valueNum;
        break;
      case 'nop':
        pc += 1;
        break;
    }
  }
  return [0, acc, pc, trace];
}

function repair(trace) {
  let exitCode = 1, acc;
  let corruptedLine;
  while (exitCode === 1 && trace.length > 0) {
    const last = trace.pop();
    let sub = lines[last];
    if (sub.startsWith('nop')) sub = sub.replace('nop', 'jmp');
    else if (sub.startsWith('jmp')) sub = sub.replace('jmp', 'nop');
    else continue;
    [exitCode, acc] = run({ [last]: sub });
    if (exitCode === 0) corruptedLine = last;
  }
  return [corruptedLine, acc];
}

const [exitCode, acc, pc, trace] = run();
if (exitCode === 1) {
  const [corruption, acc2] = repair(trace);
  console.log(`Program repaired, acc=${acc2}`);
}
else console.log(`Program Exited Successfully, acc=${acc}`);