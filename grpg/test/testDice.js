/*
Ray, run with: node -r esm test.js
*/

import { dice } from '../src/utils/dice'

// just some random rolls
for(let i=1;i<4;i++) {
	for(let k=3;k<10;k++) {
		let arg = i+'d'+k;
		console.log('input = '+arg, dice.roll(arg));
	}
}

console.log(dice.roll('2d6+2'));