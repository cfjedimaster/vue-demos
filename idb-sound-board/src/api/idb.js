const DB_NAME = 'sounddb';
const OS_NAME = 'sounds';

const DB_VERSION = 1;
let DB;

export default {

	async getDb() {
		return new Promise((resolve, reject) => {

			if(DB) { return resolve(DB); }
			console.log('OPENING DB', DB);
			let request = window.indexedDB.open(DB_NAME, DB_VERSION);
			
			request.onerror = e => {
				console.log('Error opening db', e);
				reject('Error');
			};
	
			request.onsuccess = e => {
				DB = e.target.result;
				resolve(DB);
			};
			
			request.onupgradeneeded = e => {
				console.log('onupgradeneeded');
				let db = e.target.result;
				db.createObjectStore(OS_NAME, { autoIncrement: true, keyPath:'id' });
			};
		});
	},
	async deleteSound(sound) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction([OS_NAME],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore(OS_NAME);
			store.delete(sound.id);
		});	
	},
	async getSounds() {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction([OS_NAME],'readonly');
			trans.oncomplete = () => {
				resolve(sounds);
			};
			
			let store = trans.objectStore(OS_NAME);
			let sounds = [];
			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					sounds.push(cursor.value)
					cursor.continue();
				}
			};

		});
	},

	async saveSound(sound) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction([OS_NAME],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore(OS_NAME);
			store.put(sound);

		});
	
	}

}