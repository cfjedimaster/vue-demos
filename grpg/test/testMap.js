/*
Ray, run with: node -r esm test.js
*/

import { mapMaker } from '../src/utils/mapMaker'


let map = mapMaker.create(10, 10);
mapMaker.draw(map);

map = mapMaker.create(100, 100);
mapMaker.draw(map);