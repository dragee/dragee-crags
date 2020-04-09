<template>
  <div class="crag">
    <Route v-for="(route, index) in routes" :initial-points="route" :key="index" />
  </div>
</template>

<script>
import Route from './route/Route.vue'
export default {
  name: 'Crag',
  components: {
    Route
  },
  data () {
    return {
      routes: [[]]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.crag {
  position: relative;
  background: url("../assets/mishina-skala.jpg");
  width: 760px;
  height: 570px;
}
</style>
