<template>
  <div class="route" @click="addPoint">
    <div v-if="$store.state.editable">
      <Point v-for="point in points"
           :key="point.key"
           :initial-x="point.x"
           :initial-y="point.y"
           :point-key="point.key"
           @change="updatePoint" />
    </div>

    <svg :width="width" :height="height" xmlns="http://www.w3.org/2000/svg">
      <path :d="path"
            v-bind:style="pathStyle" />
    </svg>
  </div>
</template>

<script>
const pointSize = 10
import Point from './Point.vue'
import Vue from 'vue'
import { cragsStore } from '../../store.js'

const line = (pointA, pointB) => {
  const lengthX = pointB[0] - pointA[0]
  const lengthY = pointB[1] - pointA[1]
  return {
    length: Math.sqrt(Math.pow(lengthX, 2) + Math.pow(lengthY, 2)),
    angle: Math.atan2(lengthY, lengthX)
  }
}

// Position of a control point
// I:  - current (array) [x, y]: current point coordinates
//     - previous (array) [x, y]: previous point coordinates
//     - next (array) [x, y]: next point coordinates
//     - reverse (boolean, optional): sets the direction
// O:  - (array) [x,y]: a tuple of coordinates
const controlPoint = (current, previous, next, reverse) => {
  // When 'current' is the first or last point of the array
  // 'previous' or 'next' don't exist.
  // Replace with 'current'
  const p = previous || current
  const n = next || current
  // The smoothing ratio
  const smoothing = 0.2
  // Properties of the opposed-line
  const o = line(p, n)
  // If is end-control-point, add PI to the angle to go backward
  const angle = o.angle + (reverse ? Math.PI : 0)
  const length = o.length * smoothing
  // The control point position is relative to the current point
  const x = current[0] + Math.cos(angle) * length
  const y = current[1] + Math.sin(angle) * length
  return [x, y]
}

// Create the bezier curve command
// I:  - point (array) [x,y]: current point coordinates
//     - i (integer): index of 'point' in the array 'a'
//     - a (array): complete array of points coordinates
// O:  - (string) 'C x2,y2 x1,y1 x,y': SVG cubic bezier C command
const bezierCommand = (point, i, a) => {
  // start control point
  const [cpsX, cpsY] = controlPoint(a[i - 1], a[i - 2], point)
  // end control point
  const [cpeX, cpeY] = controlPoint(point, a[i - 1], a[i + 1], true)
  return `C ${cpsX},${cpsY} ${cpeX},${cpeY} ${point[0]},${point[1]}`
}

export default {
  name: 'Route',
  store: cragsStore,
  components: {
    Point
  },
  props: {
    name: {
      type: String
    },
    initialPoints: {
      type: Array,
      default: () => []
    },
    width: {
      type: Number,
      default: 760,
    },
    height: {
      type: Number,
      default: 570,
    },
    project: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      points: this.initialPoints.map((arr, index) => {
        return {
          key: `point${index}`,
          x: arr[0],
          y: arr[1]
        }
      }),
      highlighted: false
    }
  },
  computed: {
    path() {
      if(this.points.length == 2) {
        return `M ${this.points[0].x+pointSize},${this.points[0].y+pointSize} L${this.points[1].x+pointSize},${this.points[1].y+pointSize}`

      } else if(this.points.length > 2) {
        const d = this.points.map((p) => [p.x+pointSize, p.y+pointSize]).reduce((acc, point, i, a) => i === 0
          // if first point
          ? `M ${point[0]},${point[1]}`
          // else
          : `${acc} ${bezierCommand(point, i, a)}`
        , '')
        return d;
      } else {
        return ''
      }
    },
    pathStyle() {
      const color = this.highlighted ? "orange" : "dodgerblue"
      const width = this.highlighted ? 3 : 2
      const dashed = this.project ? "30 10" : "100 0"

      return {
        "stroke": color,
        "stroke-width": width,
        "stroke-dasharray": dashed,
        "fill": "none"
      }
    }
  },
  methods: {
    addPoint(event) {
      if(!this.$store.state.editable) { return }
      // const drageePoint = new DrageePoint(
      //   event.clientX - this.$el.offsetLeft - pointSize,
      //   event.clientY - this.$el.offsetTop - pointSize,
      // )

      this.points.push({
        key: `point${this.points.length}`,
        x: event.clientX - this.$el.offsetLeft - pointSize,
        y: event.clientY - this.$el.offsetTop - pointSize
      })
      console.log(this.points.map(function(p){ return [p.x, p.y] }))
    },
    updatePoint(point) {
      let index = this.points.findIndex((p) => p.key == point.key)
      Vue.set(this.points, index, point)
      this.$store.dispatch('updateRoute', {
        name: this.name,
        path: this.points.map((p) => [p.x, p.y])
      })
    },
    highlight() {
      this.highlighted = true
    },
    unhighlight() {
      this.highlighted = false
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.route {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

svg {
  position: absolute;
  z-index: 1;
  left: 0;
  top: 0;

}
</style>
