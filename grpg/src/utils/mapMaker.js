import { misc } from './misc'

/*
Question - should the map have data representing each tile or should it 'draw' the tile. So for example, 
if a tile is grass, do I assign it a code (4) or assign the character? It seems like I should just assign the
character since % for grass or 4 is still an abstraction. 

I'm currently breaking my own rules for 'empty' and using logic to show it as .

Border used in draw is # just to make it more clear, not part of the data itself
Town = H
Player = @ (not in map data though)
*/

export const mapMaker = {
 
	create(width,height) {
		//first, create the empty map
		let map = initializeMap(width,height);

		//assign the town to the center
		let center = { x: Math.floor(width/2), y:Math.floor(height/2) };
		map[center.x][center.y] = 'H';
		
		console.log(center);
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