<template>
	<form>
		<fieldset>
			<legend>Stats</legend>

			<table>
				<tbody>
					<tr>
						<td>Money:</td>
						<td>{{ money | num }}</td>
					</tr>
					<tr>
						<td>Ship Hold:</td>
						<td>{{ holdSize | num }}</td>
					</tr>
					<tr>
						<td>Hold in Use:</td>
						<td>{{ shipUsedSpace | num }}</td>
					</tr>
					<tr>
						<td>Damage (%):</td>
						<td>{{ damage }}</td>
					</tr>
					<tr>
						<td>Repair Cost:</td>
						<td>{{ repairCost | num }}</td>
					</tr>
				</tbody>
			</table>
		</fieldset>
	</form>
</template>

<script>
export default {
	name:'Stats',
	computed: {
		damage() {
			return this.$store.state.damage;
		},
		money() {
			return this.$store.state.money;
		},
		holdSize() {
			return this.$store.state.holdSize;
		},
		repairCost() {
			return this.$store.getters.repairCost;
		},
		shipUsedSpace() {
			return this.$store.getters.shipUsedSpace
		}
	}
}
</script>

<style scoped>
form {
	width: 100%;
}
</style>