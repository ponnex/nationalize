<template>
  <input
    v-model="name"
    type="text"
    @input="searchDebounce"
  >
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'

export default {
  data () {
    return {
      name: '',
      searchDebounce: Function
    }
  },
  computed: {
    results: {
      get () {
        return this.$store.state.nationality.results
      }
    },
    currentResult: {
      get () {
        return this.$store.state.nationality.currentResult
      }
    }
  },
  created () {
    this.searchDebounce = _.debounce(this.onSearchDebounce.bind(this), 500)
  },
  methods: {
    ...mapActions({
      fetchNationality: 'nationality/fetchNationalityByName'
    }),
    async onSearchDebounce () {
      if (_.isEmpty(this.name)) {
        return
      }
      await this.fetchNationality(this.name)
      console.log(this.currentResult)
      console.log(this.results)
    }
  }
}
</script>
