<template>
  <div id="app">
    <Crag v-for="(crag, index) in crags" :crag="crag" :key="index" />
    <div id="saveButton" @click="save()" v-if="$store.state.editable">
      Save
    </div>
  </div>
</template>

<script>
import Crag from './components/Crag.vue'
import { cragsStore } from './store.js'

export default {
  name: 'App',
  store: cragsStore,
  components: {
    Crag
  },
  created() {
    if(window.location.hash == '#editable') {
      this.$store.commit('setEditable', true)
    }

    this.$store.dispatch('getNovograd')
  },
  computed: {
    crags() {
      return this.$store.state.novograd ? [this.$store.state.novograd] : []
    },
  },
  methods: {
    save() {
      this.$store.dispatch('updateNovograd')
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  width: 100%;
  min-width: 1400px;
  position: relative;
}

#saveButton {
  display: block;
  position: absolute;

  left: 20px;
  top:  20px;
  padding: 5px 20px;
  border: 2px solid lightblue;
  background: #fff;

  cursor: pointer;
  z-index: 100;
}
</style>
