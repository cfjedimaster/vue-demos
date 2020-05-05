export const dice = {

	/*
	xdy

	x rolls of a y sided dice
	*/
	roll(style) {
		let [rolls, sided] = style.split('d');
		console.log(rolls, sided);
		let total = 0;
		for(let i=0;i<rolls;i++) {
			total += getRandomIntInclusive(1, sided);
		}
		return total;
	}
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}