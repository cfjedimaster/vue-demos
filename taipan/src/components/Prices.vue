<template>
	<form>
		<fieldset>
			<legend>Prices</legend>

			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="p in prices" :key="p.name">
						<td>{{ p.name }}:</td>
						<td>{{ p.price | num }}</td>
					</tr>
				</tbody>
			</table>
		</fieldset>
	</form>
</template>

<script>
export default {
	name:'Prices',
	computed: {
		prices() {
			return this.$store.state.prices;
		}
	}
}
</script>

<style scoped>
form {
	width: 100%;
}
</style>