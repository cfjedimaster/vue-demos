<template>
  <div class="container">

    <Map />
    <Stats />
    <div class="twocol">
      <Legend />
    </div>
  </div>


</template>

<script>
import Map from '@/components/Map';
import Stats from '@/components/Stats';
import Legend from '@/components/Legend';

export default {
  components: { Map, Stats, Legend }
}
</script>

<style scoped>
.container {
  display: grid;
  grid-template-columns: 66% 33%;
  row-gap: 10px;
}

.twocol {
  grid-column: 1 / span 2;
}
</style>