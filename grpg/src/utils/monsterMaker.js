import { misc } from './misc'
import { dice } from './dice'

/*
List of base monsters.
*/
const baseMonsters = [
	{
		name: "rat", 
		str: "1d3", 
		dex: "1d4",
		int: "1d3", 
		hp: "1d4"
	},
	{
		name: "pig",
		str: "1d4", 
		dex: "1d3", 
		int: "1d6", 
		hp: "1d4"
	}, 
	{
		name: "gremlin", 
		str: "1d3", 
		dex: "1d4", 
		int: "1d4", 
		hp: "1d4"
	}, 
	{
		name: "skeleton", 
		str: "1d6", 
		dex: "1d6", 
		int: "1d4", 
		hp: "1d6+2"
	},
	{
		name: "flying lizard", 
		str: "2d6", 
		dex: "2d6", 
		int: "1d6", 
		hp: "2d6"
	},
	{
		name: "troll", 
		str: "1d6", 
		dex: "1d6", 
		int: "1d4", 
		hp: "2d6"
	},
	{
		name: "orc", 
		str: "2d6", 
		dex: "2d6", 
		int: "1d4", 
		hp: "1d6+4"
	},
	{
		name: "evil clown", 
		str: "1d6", 
		dex: "1d6", 
		int: "2d6", 
		hp: "2d8"
	}
	
];

/*
A monster can have a boon, which is a small bonus, or penalty, to one stat. When
you get the boon, you get a title along with it. So a monster with extra str may be a 'ripped X'
*/
const boons = {
	str: {
		positive: ["strong", "ripped", "beefy","swole"], 
		negative: ["weak", "wimpy", "pushover", "meek"]
	}, 
	dex: {
		positive: ["quick", "nimble", "spry", "dexterous"], 
		negative: ["clumsy", "fumbly"]
	}, 
	int: {
		positive: ["smart", "brilliant", "intelligent"],
		negative: ["slow", "dumb", "dull"]
	}
}

/*
monsters scaled 2.x and higher have a random title. In the array below, index 0 is for 2, 1 for 3, etc
*/

const scaledTitles = [
	["experienced", "tough"],
	["expert", "trained", "veteran"],
	["elite", "master", "powerful", "lord"],
	["epic", "god-like", "super-powered"]
];


/*
Chance to get a boon (out of 100), we add the scale too which gives higher monster a better chance of having a boon
Since scale is 1-5, we double it
*/
const boonChance = 20;

export const monsterMaker = {

	create(scale=1) {
		// first, pick the monster
		let monster = generateBase();

		// do we have a boon?
		if(hasBoon(scale)) {
			let positive = 1;
			if(misc.getRandomIntInclusive(0,100) > 50) positive = -1;

			let boonType = misc.getRandomIntInclusive(0, 2);
			if(boonType === 0) {
				monster.str += positive * dice.roll('1d6');
				if(monster.str < 1) monster.str = 1;
				monster.name = getBoonTitle('str', positive) + ' ' + monster.name;
			} else if(boonType === 1) {
				monster.dex += positive * dice.roll('1d6');
				if(monster.dex < 1) monster.dex = 1;
				monster.name = getBoonTitle('dex', positive) + ' ' + monster.name;
			} else {
				monster.int += positive * dice.roll('1d6');
				if(monster.int < 1) monster.int = 1;
				monster.name = getBoonTitle('int', positive) + ' ' + monster.name;
			}
		}

		/*
		scale works as a multiplier of stats. given a scale of 1.5, each stat
		is multiplied and rounded down. for scale >= 2, we add a title
		*/
		if(scale === 1) return monster;

		//console.log('apply scale of '+scale);
		//console.log(monster);
		monster.str = Math.floor(scale * monster.str);
		monster.dex = Math.floor(scale * monster.dex);
		monster.int = Math.floor(scale * monster.int);
		monster.hp = Math.floor(scale * monster.hp);
		// titles only for 2.x and higher
		if(scale >= 2) {
			scale = Math.floor(scale);
			scale -= 2;
			if(scale > scaledTitles.length-1) scale = scaledTitles.length-1;
			let picked = misc.getRandomIntInclusive(0, scaledTitles[scale].length-1);
			monster.name =  scaledTitles[scale][picked]+ ' ' + monster.name;
		}
		return monster;
	}
}

function generateBase() {
	let picked = misc.getRandomIntInclusive(0, baseMonsters.length-1);
	let monster = Object.assign({}, baseMonsters[picked]);
	monster.str = dice.roll(monster.str);
	monster.dex = dice.roll(monster.dex);
	monster.int = dice.roll(monster.int);
	monster.hp = dice.roll(monster.hp);
	return monster;
	
}

/*
As described above, it's the boonChance, which is kinda low, but the higher the scale, the higher
the change of a boon. Right now its boonChance + 2*scale
*/
function hasBoon(scale) {
	let chance = boonChance + (2*scale);
	return (misc.getRandomIntInclusive(0, 100) < chance);
}

function getBoonTitle(boon, positive) {
	let type = 'positive';
	if(positive === -1) type = 'negative';
	let titles = boons[boon][type];
	return titles[misc.getRandomIntInclusive(0, titles.length-1)];
}