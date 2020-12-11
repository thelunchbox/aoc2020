const { group } = require('console');
const fs = require('fs');

// const input = fs.readFileSync('./day7sample.txt', 'utf-8');
const input = fs.readFileSync('./day7.txt', 'utf-8');
const lines = input.split('\n');

const rules = {};
const canContain = {};

lines.forEach(line => {
  const [adj, color, _, ...rest] = line.split(' ');
  const container = `${adj} ${color}`;
  const containedBags = [];
  for (let w = 0; w + 3 < rest.length; w += 4) {
    const bag = `${rest[w + 2]} ${rest[w + 3]}`;
    const num = parseInt(rest[w + 1]);
    const count = isNaN(num) ? 0 : num;
    if (bag !== 'other bags.') containedBags.push({ bag, count });
    canContain[bag] = [...(canContain[bag] || []), container];
  }
  rules[container] = containedBags;
});

// console.log(canContain);

function canEventuallyContain(bag, level = 0) {
  let bags = canContain[bag] || [];
  // console.log(level, '    ', bag, 'can be contained by', bags);
  bags.forEach(container => {
    bags = [...bags, ...canEventuallyContain(container, level + 1)];
  });
  return bags;
}

function unique(array) {
  return array.reduce((arr, i) => {
    if (arr.includes(i)) return arr;
    return [...arr, i];
  }, []);
}

function bagCount(bag, level = 0) {
  let bags = rules[bag];
  if (!bags || bags.length === 0) return 0;

  const indent = new Array(level).fill('--').join('');
  console.log(indent, bag, 'contains', bags.map(b => `${b.count} ${b.bag}`).join(', '));

  const count = bags.reduce((count, bag) => {
    let bags2 = rules[bag.bag];
    if (!bags2 || bags2.length === 0) {
      console.log(indent, bag.bag, 'contains no other bags');
      return count + bag.count;
    }

    console.log(indent, bag.bag, 'original count:', bag.count);
    const enhancedCount = bag.count + bag.count * bagCount(bag.bag, level + 1);
    console.log(indent, bag.bag, 'new count:', enhancedCount);
    return count + enhancedCount;
  }, 0);
  return count;
}

// console.log(rules);

// part 1
console.log('part 1:', unique(canEventuallyContain('shiny gold')).length);

// part 2
console.log('part 2:', bagCount('shiny gold'));