import _ from 'lodash'

export const state = () => ({
  results: [],
  recents: [],
  queryResult: {},
  selectedResult: {}
})

export const getters = {}

export const mutations = {
  SET_RESULTS (state, results) {
    // @TODO: Save results to localstorage
    state.results = results
  },
  PUSH_RESULT (state, result) {
    const results = state.results
    results.unshift(result)
    state.results = _.uniqBy(results, 'name')
  },
  PUSH_RECENTS (state, recent) {
    const recents = state.recents
    recents.push(recent)
    state.recents = _.uniqBy(recents, 'name')
  },
  SET_QUERY_RESULT (state, queryResult) {
    state.queryResult = queryResult
  },
  SET_SELECTED_RESULT (state, selectedResult) {
    state.selectedResult = selectedResult
  }
}

export const actions = {
  async fetchNationalityByName ({ commit }, name) {
    if (_.isEmpty(name)) {
      commit('SET_QUERY_RESULT', {})
      return
    }
    await this.$axios({
      method: 'get',
      url: `https://api.nationalize.io?name=${name}`
    })
      .then((res) => {
        commit('SET_QUERY_RESULT', res.data)
        return res.data
      })
  },
  setQueryResult ({ commit }, queryResult) {
    commit('SET_QUERY_RESULT', queryResult)
  },
  setSelectedResult ({ commit }, selectedResult) {
    commit('SET_SELECTED_RESULT', selectedResult)
  },
  pushResult ({ commit }, result) {
    commit('PUSH_RESULT', result)
    commit('PUSH_RECENTS', result)
  }
}
