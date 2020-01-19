<template>
	<div id="app">
		<h2>ToDos</h2>

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

	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	data() {
		return {
			todoText:''
		}
	},
	created() {
		this.$store.dispatch('loadToDos');
	},
	computed: {
		...mapGetters(['sortedToDos'])
	},
	methods: {
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