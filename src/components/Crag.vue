<template>
  <div class="wrapper">
    <div class="crag" v-bind:style="styleObject">
      <Route v-for="(route, index) in crag.routes"
             :initial-points="route.path"
             :width="crag.width"
             :height="crag.height"
             :project="route.project"
             :key="index"
             :ref="'routes'" />
    </div>
    <table class="table">
      <tr v-for="(route, index) in crag.routes" :key="index">
        <td @click="highlightRoute(index)" class="link">
          {{ route.name }}
        </td>
        <td>
          {{ route.grade }}
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import Route from './route/Route.vue'
export default {
  name: 'Crag',
  components: {
    Route
  },
  props: {
    crag: Object
  },
  computed: {
    styleObject() {
      return {
        "background": `url(${this.crag.image})`,
        width: `${this.crag.width}px`,
        height: `${this.crag.height}px`
      }
    }
  },
  mounted() {
    this.highlightRoute(5);
  },
  methods: {
    highlightRoute(index) {
      document.querySelectorAll(".wrapper .link").forEach((link) => link.classList.remove("highlighted"))
      document.querySelector(`.wrapper tr:nth-of-type(${index+1}) .link`).classList.add("highlighted")

      this.$refs.routes.forEach((route) => route.unhighlight())
      this.$refs.routes[index].highlight()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.wrapper {
  vertical-align: top;
}

.crag {
  position: relative;
  display: inline-block;
}

table {
  vertical-align: top;
  display: inline-block;
  cursor:  pointer;
}

table .link {
  cursor:  pointer;
  text-decoration: underline;
}

table .link.highlighted {
  color:  orange;
}

table td {
  padding: 5px 10px;
}
</style>
