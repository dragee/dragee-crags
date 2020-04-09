<template>
  <div id="app">
    <Crag />
  </div>
</template>

<script>
import Crag from './components/Crag.vue'

export default {
  name: 'App',
  components: {
    Crag
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  width: 100%;
}
</style>
