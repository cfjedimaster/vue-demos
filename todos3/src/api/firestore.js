const FS_API_KEY = 'AIzaSyC2AhAIueIBhcUHt1zLW69HSlUy8gIyCuE';
const FS_AUTH_DOMAIN = 'todos3.firebaseapp.com';
const FS_PROJECT_ID = 'todos3';
const FS_COLLECTION = 'todos';

let setup = false;
let DB;
let UID;

export default {

	init() {

		if(setup) return;
		firebase.initializeApp({
			apiKey: FS_API_KEY,
			authDomain: FS_AUTH_DOMAIN,
			projectId: FS_PROJECT_ID
		});

		setup = true;

	},
	async login() {

		this.init();
		let provider = new firebase.auth.GoogleAuthProvider();
		return new Promise((resolve, reject) => {

			firebase.auth().signInWithPopup(provider).then(function(result) {
				// This gives you a Google Access Token. You can use it to access the Google API.
				let token = result.credential.accessToken;
				// The signed-in user info.
				let user = result.user;
				UID = user.uid;
				resolve(user);
			}).catch(function(error) {
				reject(error);
				/*
				// Handle Errors here.
				var errorCode = error.code;
				var errorMessage = error.message;
				// The email of the user's account used.
				var email = error.email;
				// The firebase.auth.AuthCredential type that was used.
				var credential = error.credential;
				*/
			});

		});

	},
	async getDb() {
		return new Promise((resolve, reject) => {

			if(DB) { return resolve(DB); }
			console.log('OPENING FS');
			try {
				this.init();
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
			db.collection(FS_COLLECTION).where('userId','==',UID).get().then((querySnapshot) => {
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
		// always associate with me
		todo.userId = UID;
		console.log("my UID "+UID);
		if(!todo.id) return db.collection(FS_COLLECTION).add(todo);
		else return db.collection(FS_COLLECTION).doc(todo.id).update(todo);

	}
}