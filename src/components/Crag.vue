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
      routes: [[
        [155, 536],
        [184, 346],
        [290, 278],
        [333, 173],
        [351, 74]
      ], [
        [136, 531],
        [155, 330],
        [250, 11]
      ], [

      ]]
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
