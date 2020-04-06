<template>
	<div>
		<div v-html="render"></div>
	<p/>
	<button @click="startOver">Another MadLib</button>
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