<template>
  <div class="main">
  	<div class="centered">
		<h2>Stats</h2>
	</div>

	<p>
	Name: {{ name }}<br/>
	</p>

	<p>
	Attributes:<br/>
	STR: {{ str }}<br/>
	DEX: {{ dex }}<br/>
	INT: {{ int }}<br/>
	</p>
	
	<p>
	Gold: {{ gold }}<br/>
	XP: {{ exp }}
	</p>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Stats',
  props: {
  },
  computed: {
	...mapState('player', ['exp','gold','str','dex','int','name'])
  }
}
</script>

<style scoped>
div.main {
	border: solid;
	padding: 10px;
}

div.centered {
	width: 100%;
	text-align: center;
}
</style>