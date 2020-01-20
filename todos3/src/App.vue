<template>
	<div id="app">
		<div v-if="user">
			<h2>ToDos for {{ user.displayName }}</h2>

			<table>
			<tr v-for="todo in sortedToDos" :key="todo.id">
				<td><span :class="{todoDone:todo.done}">{{todo.text}}</span></td>
				<td>
					<button @click="toggleDone(todo)">
						<span v-if="todo.done">
						Incomplete
						</span><span v-else>
						Done
						</span>
					</button>
				</td>
			</tr>
			</table>

			<p>
				<input type="text" v-model="todoText">
				<button @click="saveToDo">Save ToDo</button>
			</p>    
		</div><div v-else>
			<p><i>You must login first...</i></p>
			<button @click="login">Login with Google</button>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import fs from '@/api/firestore';

export default {
	data() {
		return {
			todoText:'',
			user:null
		}
	},
	created() {

	},
	computed: {
		...mapGetters(['sortedToDos'])
	},
	methods: {
		async login() {
			console.log('trying login');
			let user = await fs.login();
			this.user = user;
			this.$store.dispatch('loadToDos');
		},
		saveToDo() {
			if(this.todoText === '') return;
			this.$store.dispatch('saveToDo', { text:this.todoText, done:false} );
			this.todoText = '';			
		},
		toggleDone(todo) {
			this.$store.dispatch('toggleToDo', todo);
		}
	}
}
</script>

<style scoped>
.todoDone {
  color:#c0c0c0;
  text-decoration: line-through;
}
</style>