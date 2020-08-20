import { misc } from './misc'

/*
Question - should the map have data representing each tile or should it 'draw' the tile. So for example, 
if a tile is grass, do I assign it a code (4) or assign the character? It seems like I should just assign the
character since % for grass or 4 is still an abstraction. 

I'm currently breaking my own rules for 'empty' and using logic to show it as .

Border used in draw is # just to make it more clear, not part of the data itself
Town = H
Dungeon entrace: O 
Player = @ (not in map data though)
Forest = }
*/

export const mapMaker = {
 
	create(width,height) {

		if(width < 10 || height < 10) throw new Error('Height and Width must be greater than or equal to 10');

		//first, create the empty map
		let map = initializeMap(width,height);

		//assign the town to the center
		let center = { x: Math.floor(width/2), y:Math.floor(height/2) };
		map[center.x][center.y] = 'H';

		/*
		The dungeon is always located towards the edge. What edge is random
		*/
		let side = misc.getRandomIntInclusive(1,4);
		if(side === 1) {
			let dX = misc.getRandomIntInclusive(0, width-1);
			let dY = misc.getRandomIntInclusive(0,3);
			map[dX][dY] = 'O';
		} else if(side === 2) {
			let dX = misc.getRandomIntInclusive(0, width-1);
			let dY = misc.getRandomIntInclusive(height-4,height-1);
			map[dX][dY] = 'O';
		} else if(side == 3) {
			let dY = misc.getRandomIntInclusive(0, width-1);
			let dX = misc.getRandomIntInclusive(0,3);
			map[dX][dY] = 'O';
		} else {
			let dY = misc.getRandomIntInclusive(0, width-1);
			let dX = misc.getRandomIntInclusive(height-4,height-1);
			map[dX][dY] = 'O';
		}

		return map;
	},
	draw(map) {
		//utility function, may remove
		let s = '#'.repeat(map.length+2)+'\n';
		for(let x=0;x<map.length;x++) {
			s += '#';
			for(let y=0;y<map[x].length;y++) {
				if(map[x][y] === ' ') s+= '.';
				else s+=map[x][y];
			}
			s += '#\n';
		}
		s += '#'.repeat(map.length+2);
		console.log(s);
	}

}

function initializeMap(w, h) {
	let map = [];
	for(let x=0;x<w;x++) {
		map[x] = [];
		for(let y=0;y<h;y++) {
			map[x][y] = ' ';
		}
	}
	return map;
}

/*
A forest, and other features, is done via a "splotch", given a random point, we
circle it and add features as long as there's a connection, but it's random. So imagine:
...
.X.
...

We start from upper left and go clock wise, randomly adding more if there's an X near it, and there is:

XX.
.XX
.XX

Then we go again:

XX...
XXX..
X.XXX
..XXX
.X..X

Decided to punt on this. May return to it later.
*/
function makeSplotch(size) {
	// note this can make a splotch of size+1, I'm ok with that..It's a splotch.
	let rowsAbove = Math.floor(size/2);
	let rowsBelow = rowsAbove;
	let totalRows = rowsAbove + rowsBelow + 1;
	console.log('totalRows', totalRows);
	let splotch = [];
	for(let x=0;x<size;x++) {
		for(let y=0;y<totalRows;y++) {
			splotch[x][y] = '';
		}
	}
}