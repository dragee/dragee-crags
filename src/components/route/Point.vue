<template>
  <div class="point" @click.stop></div>
</template>

<script>
import { Draggable, Point } from 'dragee'

export default {
  name: 'Route',
  props: {
    pointKey: String,
    initialX: Number,
    initialY: Number
  },
  data () {
    return {
      x: this.initialX,
      y: this.initialY
    }
  },
  mounted() {
    this.draggable = new Draggable(this.$el, {
      position: new Point(this.initialX, this.initialY),
      on: {
        'drag:move': () => this.savePosition()
      }
    })
  },
  methods: {
    savePosition(){
      this.x = this.draggable.position.x
      this.y = this.draggable.position.y

      console.log([this.x, this.y])
      this.$emit('change', {
        key: this.pointKey,
        x: this.x,
        y: this.y
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.point {
  position: absolute;
  box-sizing: border-box;
  z-index: 2;
  width: 20px;
  height: 20px;
  border-radius: 30px;
  border: 3px solid green;
}
</style>
