const DB_NAME = 'tododb';
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
				db.createObjectStore('todos', { autoIncrement: true, keyPath:'id' });
			};
		});
	},
	async getToDos() {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['todos'],'readonly');
			trans.oncomplete = () => {
				resolve(todos);
			};
			
			let store = trans.objectStore('todos');
			let todos = [];
			
			store.openCursor().onsuccess = e => {
				let cursor = e.target.result;
				if (cursor) {
					todos.push(cursor.value)
					cursor.continue();
				}
			};

		});
	},
	async saveToDo(todo) {

		let db = await this.getDb();

		return new Promise(resolve => {

			let trans = db.transaction(['todos'],'readwrite');
			trans.oncomplete = () => {
				resolve();
			};

			let store = trans.objectStore('todos');
			store.put(todo);

		});
	
	}
}