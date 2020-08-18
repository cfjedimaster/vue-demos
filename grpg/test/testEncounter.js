/*
Ray, run with: node -r esm test.js
*/

import { encounterMaker } from '../src/utils/encounterMaker'

console.log('basic player');
console.log(encounterMaker.select({
	gold:10,
	hp:10
}));

console.log('poor player');
console.log(encounterMaker.select({
	gold:0,
	hp:10
}));

console.log('dead player');
console.log(encounterMaker.select({
	gold:10,
	hp:0
}));
console.log('---------------------------------');
console.log('basic player resolve');
let player = {
	gold:10, hp: 10, exp:200
};
let enc = encounterMaker.select(player);
console.log('chosen enc', enc);
player = encounterMaker.resolve(player, enc, 0);
console.log('Player at end', player);
player = encounterMaker.resolve(player, enc, 1);
console.log('Player at end2', player);