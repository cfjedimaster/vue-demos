<template>
  <div>
    <h1>Users</h1>
    <ul>
    <li v-for="user in users" :key="user.id">
      <router-link :to="'/user/'+user.id">{{ user.name }}</router-link>
    </li>
    </ul>
    <router-link to="/user/3?name=jacob">Test</router-link>
  </div>
</template>

<script>
export default {
  data() {
    return {
      users:[
        {"name":"Ray", "id":1},
        {"name":"Lindy", "id":2},
        {"name":"Jacob", "id":3},
      ]
    }
  }
}
</script>