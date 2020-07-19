import { misc } from './misc'

export const dice = {

	/*
	xdy

	x rolls of a y sided dice

	xdy+n
	xdy

	x rolls of a y side dice + n
	*/
	roll(style) {
		let bonus=0, total=0;
		if(style.indexOf('+') > -1) {
			[style, bonus] = style.split('+');
		} 
		
		let [rolls, sided] = style.split('d');
		
		//console.log(rolls, sided);
		for(let i=0;i<rolls;i++) {
			total += misc.getRandomIntInclusive(1, sided);
		}
		total += parseInt(bonus);
		return total;
	}
}
