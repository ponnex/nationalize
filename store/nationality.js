import { CancelToken } from 'axios'
import _ from 'lodash'
let searchNationalityAxiosCall = null

export const state = () => ({
  results: [],
  currentResult: {}
})

export const getters = {}

export const mutations = {
  SET_RESULTS (state, results) {
    state.results = results
  },
  PUSH_RESULT (state, result) {
    const results = state.results
    results.push(result)
    state.results = _.uniqBy(results, 'name')
  },
  SET_CURRENT_RESULT (state, currentResult) {
    state.currentResult = currentResult
  }
}

export const actions = {
  async fetchNationalityByName ({ commit }, name) {
    if (searchNationalityAxiosCall) {
      searchNationalityAxiosCall.cancel()
    }
    searchNationalityAxiosCall = CancelToken.source()
    await this.$axios({
      method: 'get',
      url: `https://api.nationalize.io?name=${name}`,
      cancelToken: searchNationalityAxiosCall.token
    })
      .then((res) => {
        commit('SET_CURRENT_RESULT', res.data)
        commit('PUSH_RESULT', res.data)
        return res.data
      })
  },
  cancelNationalitySearch ({ commit }, req) {
    searchNationalityAxiosCall.cancel()
  },
  setCurrentResult ({ commit }, currentResult) {
    commit('SET_CURRENT_RESULT', currentResult)
  }
}
