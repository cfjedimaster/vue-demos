/*
Ray, run with: node -r esm test.js
*/

import { monsterMaker } from '../src/utils/monsterMaker'


console.log('no scale');
console.log(monsterMaker.create());

console.log('\nscale 1.5');
console.log(monsterMaker.create(1.5));

console.log('\nscale 2');
console.log(monsterMaker.create(2));

console.log('\nscale 3');
console.log(monsterMaker.create(3));

console.log('\nscale 4');
console.log(monsterMaker.create(4));

console.log('\nscale 5');
console.log(monsterMaker.create(5));

console.log('\nscale 6');
console.log(monsterMaker.create(6));