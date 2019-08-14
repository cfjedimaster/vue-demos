<template>
  <div>
    <h1>Welcome to Lemonade Stand</h1>

    <p>
      In this game, you will have ten turns to try to earn as
      much profit as you can at a simulated Lemonade Stand.
    </p>

    <p>
      On each turn you will be given a weather forecast and the price
      for each cup of lemonade. You can then select
      <strong>how many glasses you want to make</strong>,
      <strong>how many advertising signs you want to produce</strong>, and at
      <strong>
        what
        price you will see your lemonade
      </strong>.
    </p>

    <p>
      Good luck, and remember that the weather forecase will
      <strong>not</strong>
      always be correct!
    </p>

    <router-link to="/game" tag="button">Get Started</router-link>
  </div>
</template>

<script>
export default {};
</script>

<style>
</style>
