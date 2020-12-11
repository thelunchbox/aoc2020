function adder(a, b, carryIn) {
  const sum = a + b + carryIn;
  const digit = sum % 10;
  const carryOut = Math.floor(sum / 10);
  return [digit, carryOut];
}


module.exports = (a, b) => {
  let answer = [];
  const longer = a.length > b.length ? a : b;
  const shorter = a.length > b.length ? b : a;

  const longArray = longer.split('').reverse();
  const shortArray = shorter.split('').reverse();

  let carry = 0, digit = 0;
  for (let i = 0; i < longArray.length; i++) {
    const aNum = parseInt(longArray[i] || '0');
    const bNum = parseInt(shortArray[i] || '0');
    [digit, carry] = adder(aNum, bNum, carry);
    answer.push(digit.toString());
  }
  if (carry > 0) {
    answer.push(...carry.toString().split('').reverse());
  }

  return answer.reverse().join('');
}