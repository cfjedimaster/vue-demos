<template>
  <div class="main">
  	<div class="centered">
		<h2>Stats</h2>
	</div>

	<p>
	Name: {{ $store.state.player.name }}<br/>
	</p>

	<p>
	Attributes:<br/>
	STR: {{ $store.state.player.str }}<br/>
	DEX: {{ $store.state.player.dex }}<br/>
	INT: {{ $store.state.player.int }}<br/>
	</p>
	
	<p>
	Gold: {{ $store.state.player.gold }}<br/>
	XP: {{ $store.state.player.exp }}
	</p>
  </div>
</template>

<script>
export default {
  name: 'Stats',
  props: {
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