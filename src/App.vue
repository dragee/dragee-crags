<template>
  <div id="app" style="text-align: left;">
    <Crag v-for="(crag, index) in crags" :crag="crag" :key="index" />
  </div>
</template>

<script>
import Crag from './components/Crag.vue'
// import mishinaSkala from './assets/mishina-skala.jpg'
import novograd from './assets/novograd.jpg'

export default {
  name: 'App',
  components: {
    Crag
  },
  data () {
    return {
      crags: [
      // {
      //   name: "Мішина скала",
      //   image: mishinaSkala,
      //   width: 760,
      //   height: 570,
      //   routes: [{
      //     name: "Змій горинич(лівий)",
      //     path: [
      //       [155, 536],
      //       [184, 346],
      //       [290, 278],
      //       [333, 173],
      //       [351, 74]
      //     ]
      //   }, {
      //     name: "Змій горинич(центральний)",
      //     path: [
      //       [136, 531],
      //       [155, 330],
      //       [250, 11]
      //     ]
      //   }, {
      //     name: "New",
      //     path: []
      //   }]
      // },
      {
        name: "Новоград",
        image: novograd,
        width: 1280,
        height: 957,
        routes: [
          {
            name: "Peace",
            grade: "6a",
            path: [
              [52, 675],
              [37, 587],
              [27, 534],
              [27, 469],
              [87, 390],
              [78, 338],
              [91, 286],
              [106, 230],
            ]
          },
          {
            name: "Лісова Пісня",
            grade: "6a",
            path: [
              [247, 665],
              [244, 557],
              [254, 469],
              [264, 410],
              [300, 289],
              [311, 206],
            ]
          },
          {
            name: "Contra Spem Spero",
            grade: "6b",
            path: [
              [291, 662],
              [281, 550],
              [298, 451],
              [313, 364],
              [326, 290],
              [340, 214],
            ]
          },
          {
            name: "Кут Сприйняття",
            grade: "6c",
            path: [
              [361, 673],
              [347, 539],
              [363, 432],
              [370, 367],
              [377, 249],
              [381, 177],
            ]
          },
          {
            name: "Зуб",
            grade: "6c+",
            path: [
              [408, 690],
              [426, 557],
              [429, 508],
              [417, 454],
              [414, 305],
              [426, 216],
              [452, 126],
            ]
          },
          {
            name: "Карнаваль",
            grade: "6a",
            path: [
              [470, 701],
              [492, 604],
              [559, 508],
              [560, 391],
              [560, 276],
              [546, 189],
              [519, 105],
            ]
          },
          {
            name: "Пів дороги до киці",
            grade: "6a",
            path: [
              [688, 745],
              [674, 587],
              [671, 524],
              [635, 474],
              [651, 413],
              [654, 343],
              [624, 307],
              [607, 252],
              [596, 114],
            ]
          },
          {
            name: "Колаба",
            grade: "5с",
            path: [
              [829, 732],
              [810, 608],
              [793, 517],
              [782, 446],
              [794, 407],
              [803, 328],
              [815, 269],
            ]
          },
          {
            name: "Америка(або На Чілі)",
            grade: "7a",
            path: [
              [1002, 666],
              [997, 549],
              [989, 521],
              [973, 475],
              [978, 404],
              [997, 336],
              [1004, 234],
              [1005, 175],
            ]
          },
          {
            name: "Проект",
            grade: "???",
            project: true,
            path: []
          }
        ]
      }]
    }
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
