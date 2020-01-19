const FS_API_KEY = 'AIzaSyC2AhAIueIBhcUHt1zLW69HSlUy8gIyCuE';
const FS_AUTH_DOMAIN = 'todos3.firebaseapp.com';
const FS_PROJECT_ID = 'todos3';
const FS_COLLECTION = 'todos';

let DB;

export default {

	async getDb() {
		return new Promise((resolve, reject) => {

			if(DB) { return resolve(DB); }
			console.log('OPENING FS');
			try {
				firebase.initializeApp({
					apiKey: FS_API_KEY,
					authDomain: FS_AUTH_DOMAIN,
					projectId: FS_PROJECT_ID
				});

				DB = firebase.firestore();
				resolve(DB);
			} catch(e) {
				reject(e);
			}
		});
	},
	async getToDos() {

		let db = await this.getDb();

		return new Promise(resolve => {
			console.log('attempt to get data');
			let todos = [];
			db.collection(FS_COLLECTION).get().then((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					console.log(`${doc.id} => ${JSON.stringify(doc.data())}`);
					let todo = doc.data();
					todo.id = doc.id;
					todos.push(todo);
				});
				resolve(todos);
			});			

		});
	},
	async saveToDo(todo) {
		let db = await this.getDb();

		if(!todo.id) return db.collection(FS_COLLECTION).add(todo);
		else return db.collection(FS_COLLECTION).doc(todo.id).update(todo);

	}
}