import { misc } from './misc'
import { dice } from './dice'

/*
Each encounter is an object containing:
	prereq - an expression that must be true. Ex: hp>5, gold>10. the client will evaluate and if false, disregard the encounter
	text - the text of the encounter
	options:
		an array of options which contain:
			text - text of the option
			results - 
				an array of results which contain
					text - text of the result
					effect - an expression, like hp-=5, gp+=10

Sample encounter:
{
	prereq:'gold>0 && hp>0',
	text:'You meet a beggar who asks for help.',
	options: [
		{
			text: 'Give a gold coin to him.',
			results:[
				{ text: 'The beggar thanks you!', effect:'gold--' }, 
				{ text: 'The beggar thanks you, winks, and dissappears.', effect:'gold += 300'}, // it was a god or whatever in disguise
				{ text: 'The beggar smirks and punches you!', effect:'hp--' }
			]
		},
		{
			text: 'Walk away.',
			results:[
				{ text: 'The beggar spits at you!', effect:'' }, // no effect
				{ text: 'The beggar growls and punshes you!', effect:'hp--' }
			]
		},

	]
}
*/
const data = [
	{
		prereq:'gold>0 && hp>0',
		text:'You meet a beggar who asks for help. He looks desperate.',
		options: [
			{
				text: 'Give a gold coin to him.',
				results:[
					{ text: 'The beggar thanks you!', effect:'gold--' }, 
					{ text: 'The beggar thanks you, winks, and dissappears.', effect:'gold += 300'}, // it was a god or whatever in disguise
					{ text: 'The beggar smirks and punches you!', effect:'hp--' }
				]
			},
			{
				text: 'Walk away.',
				results:[
					{ text: 'The beggar spits at you!', effect:'' }, // no effect
					{ text: 'The beggar growls and punshes you!', effect:'hp--' }
				]
			},

		]
	},
	{
		prereq:'hp>0',
		text:'You hear a growl from behind you.',
		options: [
			{
				text: 'Put on a brave face.',
				results:[
					{ text: 'You seem to have scared off whatever was stalking you.', effect:'exp+=100' }
				]
			},
			{
				text: 'Run away',
				results:[
					{ text: 'You run until your out of breath.' , effect:'' }, // no effect
					{ text: 'You run, but trip and sprain your ankle!', effect:'hp--' }
				]
			},

		]
	}
]
export const encounterMaker = {
 
	// given a player ob, find an encounter they can do
	select(player) {
		let possibleEncounters = data.filter(d => {
			if(!d.prereq) return true;
			let prereq = fixEvalString(d.prereq);
			return eval(prereq);
		});
		if(possibleEncounters.length === 0) return null;
		return possibleEncounters[misc.getRandomIntInclusive(0, possibleEncounters.length-1)];
	},
	resolve(player, encounter, choice) {
		if(choice >= encounter.options.length) choice = 0;
		let selected = encounter.options[choice];
		let result = selected.results[misc.getRandomIntInclusive(0, selected.results.length-1)];
		console.log('result for '+choice, result);
		if(result.effect != '') {
			console.log(player);
			eval(fixEvalString(result.effect));
			console.log(player);
		}
		return player;
	}

}

// utility function to fix eval string to include player
function fixEvalString(str) {
	str = str.replace(/gold/g, 'player.gold');
	str = str.replace(/hp/g, 'player.hp');
	str = str.replace(/exp/g, 'player.exp');
	return str;
}