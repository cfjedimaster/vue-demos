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
			total += getRandomIntInclusive(1, sided);
		}
		total += parseInt(bonus);
		return total;
	}
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}