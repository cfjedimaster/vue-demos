<template>
  <div>
    <h1>Product</h1>
	{{ product }}
  </div>
</template>

<script>
export default {
	data() {
		return {
			product:null
		}
	},
	created() {
		let pid = this.$route.params.id;
		this.product = `This is the description for product ${pid}`;
	}
}
</script>
