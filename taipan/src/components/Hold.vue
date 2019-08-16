<template>
	<form>
		<fieldset>
			<legend>Hold</legend>

			<table>
				<thead>
					<tr>
						<th>Name</th>
						<th>Quantity</th>
					</tr>
				</thead>
				<tbody>
					<tr v-for="h in hold" :key="h.name">
						<td>{{ h.name }}:</td>
						<td>{{ h.quantity }}</td>
					</tr>
				</tbody>
			</table>
		</fieldset>
	</form>
</template>

<script>
export default {
	name:'Hold',
	computed: {
		hold() {
			return this.$store.state.hold;
		}
	}
}
</script>

<style scoped>
form {
	width: 100%;
}
</style>