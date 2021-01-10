<template>
  <div>
    <h1>Products</h1>
    <ul>
    <li v-for="product in products" :key="product.id">
      <router-link :to="'/product/'+product.id">{{ product.name }}</router-link>
    </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products:[
        {"name":"Product 1", "id":1},
        {"name":"Product 2", "id":2},
        {"name":"Product 3", "id":3},
      ]
    }
  }
}
</script>