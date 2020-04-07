<template>
	<div class="render">
		<div v-html="render" ></div>
	<p/>
	<button @click="startOver">Again!</button>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
	computed: {
		...mapGetters(['render']),
	},
	methods: {
		startOver() {
			this.$router.replace('/prompt');
		}
	}
}
</script>

<style scoped>
.render {
  margin: auto;
  width: 80%;
  text-align: center;
  font-size: 30px;
}

button {
  background-color:pink; 
  width: 220px;
  height: 120px;
  font-size: 30px;
}

</style>