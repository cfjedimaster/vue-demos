<template>
  <div>
    <h1>User</h1>
	{{ user }}
  </div>
</template>

<script>
export default {
	data() {
		return {
			user:null
		}
	},
	created() {
		let uid = this.$route.params.id;
		this.user = `This is the description for user ${uid}`;
	}
}
</script>
