<template>
  <div>
    <p>
    Welcome to Taipan. In this game, you take on the role of a captain of a trading ship.
    You will buy and sell goods, move from port to port, and work on upgrading your ship
    to have a larger hold. Travel is dangerous so you'll also need to keep up on repairs
    or risk losing your ship forever.
    </p>

    <p>
      <router-link to="/setup" tag="button">Begin</router-link>
    </p>
  </div>
</template>

<script>
export default {
  name: 'home',
  components: {
  }
}
</script>
