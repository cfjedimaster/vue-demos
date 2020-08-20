<template>
  <div>
  render map, get the map from state and draw my window, 
  player at {{ pos }}
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Map',
  props: {
  },
  created() {

  }, 
  computed: {
  	...mapState('map', ['map']),
  	...mapState('player', ['pos']),
  }
}

</script>
