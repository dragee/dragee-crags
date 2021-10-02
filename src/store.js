import Vue from 'vue'
import Vuex from 'vuex'
import faunadb from 'faunadb'

const q = faunadb.query

const client = new faunadb.Client({
  secret: 'fnAEUg24CeAAxZCX5HAy7ZacHRjS6YEwifBL-HkS',
  domain: 'db.eu.fauna.com',
  port: 443,
})

Vue.use(Vuex)
export const cragsStore = new Vuex.Store({
  state: {
    novograd: null,
    editable: false
  },
  getters: {
    novograd(state) {
      return state.novograd
    },
    editable(state) {
      return state.editable
    }
  },
  mutations: {
    setNovograd(state, value) {
      state.novograd = value
    },
    setEditable(state, value) {
      state.editable = value
    }
  },
  actions: {
    async getNovograd({ commit }) {
      const novograd = await client.query(
        q.Get(
          q.Ref(
            q.Collection("Crag"),
            "311325813775532229"
          )
        )
      ).then((response) => {
        return response.data
      })

      commit("setNovograd", novograd)
    },
    async updateNovograd({ commit, state }) {
      const novograd = await client.query(
        q.Update(
          q.Ref(
            q.Collection("Crag"),
            "311325813775532229"
          ),
          {
            data: state.novograd
          }
        )
      ).then((response) => {
        return response.data
      })

      commit("setNovograd", novograd)
    },
    updateRoute({ commit, state }, route) {
      const copy = Object.assign({}, state.novograd)
      const existingRoute = state.novograd.routes.find((r) => r.name == route.name)
      const routeIndex = state.novograd.routes.indexOf(existingRoute)

      copy.routes[routeIndex].path = route.path

      commit("setNovograd", copy)
    }

  }
})
