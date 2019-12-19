<template>
  <div>
    <table>
      <tbody>
      <tr v-for="(row,idx) in grid" :key="idx">
        <td v-for="(cell,idy) in row" :key="idy" 
        :class="{ 
          locked: grid[idx][idy].locked, 
          selected:grid[idx][idy].selected,
          error:grid[idx][idy].error
        }"
        @click="setSelected(grid[idx][idy], idx, idy)"> {{ grid[idx][idy].value }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Grid',
  computed: mapState([
    'grid'
  ]),
  methods: {
    pickNumber(e) {
      let typed = parseInt(String.fromCharCode(e.keyCode),10);
      // if it was NaN, split out
      if(!typed) return;
      this.$store.commit('setNumber', typed);
    },
    setSelected(cell,x,y) {
      this.$store.commit('setSelected',{x,y});
    }
  },
  mounted() {
    window.addEventListener('keypress', this.pickNumber);
  },
  destroyed() {
    window.removeEventListener('keypress', this.pickNumber);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
table {
  border-collapse: collapse;
  border: 2px solid;
}

td {
  border: 1px solid;
  text-align: center;
  height: 40px;
  width: 40px;
}

table tbody tr td:nth-child(3), table tbody tr td:nth-child(6) {
  border-right: 2px solid;
}

table tbody tr:nth-child(3), table tbody tr:nth-child(6) {
  border-bottom: 2px solid;
}

td.locked {
  cursor: not-allowed;
}

td {
  cursor: pointer;
}

td.selected {
  background-color: bisque;
}

td.error {
  color: red;
}


</style>
