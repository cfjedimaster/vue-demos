<template>
  <div class="container">

    <Level />
    <Stats />
    <div class="twocol">
      <Legend />
    </div>
  </div>


</template>

<script>
import Level from '@/components/Level';
import Stats from '@/components/Stats';
import Legend from '@/components/Legend';

export default {
  components: { Level, Stats, Legend }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  row-gap: 10px;
}

.twocol {
  grid-column: 1 / span 2;
}
</style>