const fs = require('fs');

const input = fs.readFileSync('./day4.txt', 'utf-8');
const lines = input.split('\n');

const fields = ['byr:', 'iyr:', 'eyr:', 'hgt:', 'hcl:', 'ecl:', 'pid:'];
const nonRequired = ['cid:'];

const pattern = /(\w\w\w):/g;
let current = [];
let valid = 0;

/*
  byr (Birth Year) - four digits; at least 1920 and at most 2002.
  iyr (Issue Year) - four digits; at least 2010 and at most 2020.
  eyr (Expiration Year) - four digits; at least 2020 and at most 2030.
  hgt (Height) - a number followed by either cm or in:
  If cm, the number must be at least 150 and at most 193.
  If in, the number must be at least 59 and at most 76.
  hcl (Hair Color) - a # followed by exactly six characters 0-9 or a-f.
  ecl (Eye Color) - exactly one of: amb blu brn gry grn hzl oth.
  pid (Passport ID) - a nine-digit number, including leading zeroes.
  cid (Country ID) - ignored, missing or not.
*/

function validateField(input) {
  const [field, data] = input.split(':');
  console.log(field, data);
  switch(field) {
    case 'byr':
      const byr = parseInt(data);
      return data.match(/^\d\d\d\d$/) && byr >= 1920 && byr <= 2002; 
    case 'iyr':
      const iyr = parseInt(data);
      return data.match(/^\d\d\d\d$/) && iyr >= 2010 && iyr <= 2020; 
    case 'eyr':
      const eyr = parseInt(data);
      return data.match(/^\d\d\d\d$/) && eyr >= 2020 && eyr <= 2030; 
    case 'hgt':
      if (data.endsWith('cm')) {
        const hgt = parseInt(data.substr(0, data.length - 2));
        return !isNaN(hgt) && hgt >= 150 && hgt <= 193;
      } else if (data.endsWith('in')) {
        const hgt = parseInt(data.substr(0, data.length - 2));
        return !isNaN(hgt) && hgt >= 59 && hgt <= 76;
      } else {
        return false;
      }
    case 'hcl':
      return data.match(/^#[0-9a-f]{6}$/);
    case 'ecl':
      return data.match(/^(amb|blu|brn|gry|grn|hzl|oth)$/);
    case 'pid':
      return data.match(/^[0-9]{9}$/);
    case 'cid':
      return true;
  }
  return false;
}

function hasRequiredFields(arr) {
  return fields.every(field => arr.find(input => input.startsWith(field)));
}

for (let l = 0; l < lines.length; l++) {
  const line = lines[l];
  if (line) {
    const matches = line.split(' ');
    current = [...current, ...matches];
  }
  if (!line || l + 1 === lines.length) {
    console.log(current);
    if (hasRequiredFields(current) && current.every(validateField)) valid++;
    current = [];
  } 
}

console.log(valid);
