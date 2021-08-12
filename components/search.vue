<template>
  <card class="absolute w-9/12 md:w-6/12 z-50 m-auto top-5 left-0 right-0">
    <div class="flex items-center space-x-3 p-4">
      <svg
        enable-background="new 0 0 515.558 515.558"
        viewBox="0 0 515.558 515.558"
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-5"
      >
        <path
          d="m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z"
          fill="#b4b5bf"
        />
      </svg>
      <input
        v-model="name"
        type="text"
        class="w-full focus:outline-none placeholder-gray-300"
        placeholder="Search for name"
        @input="searchDebounce"
        @focus="onFocus"
        @blur="onBlur"
        @keydown="onKeydown"
      >
    </div>
    <div class="bg-white rounded-b shadow-lg border-t border-gray-200 p-0 overflow-auto transition-all duration-200 ease-in max-h-0 opacity-0" :class="{'max-h-screen opacity-100 p-3': hasFocus }">
      <div v-if="!isEmpty(queryResult) && !isEmpty(name) && name === queryResult.name" class="result-container">
        <span class="text-gray-500 text-xs">Results</span>
        <result v-if="!isEmpty(queryResult.country)" :data="queryResult" @onSelection="onSelection" />
        <div v-else class="static-result">
          <span>No Result</span>
        </div>
      </div>
      <div class="result-container">
        <span class="text-gray-500 text-xs">Recent</span>
        <recent :empty-text="'No recent searches'" />
      </div>
    </div>
  </card>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
import card from '@/components/card.vue'
import recent from '@/components/containers/recent.vue'

export default {
  components: { card, recent },
  data () {
    return {
      name: '',
      searchDebounce: Function,
      isEmpty: _.isEmpty,
      hasFocus: false
    }
  },
  computed: {
    queryResult: {
      get () {
        return this.$store.state.nationality.queryResult
      }
    }
  },
  created () {
    this.searchDebounce = _.debounce(this.onSearchDebounce.bind(this), 500)
  },
  methods: {
    ...mapActions({
      fetchNationality: 'nationality/fetchNationalityByName',
      setSelectedResult: 'nationality/setSelectedResult',
      pushResult: 'nationality/pushResult'
    }),
    async onSearchDebounce () {
      await this.fetchNationality(this.name)
    },
    onFocus () {
      this.hasFocus = true
      this.onSearchDebounce()
    },
    onBlur () {
      this.hasFocus = false
    },
    onKeydown (event) {
      if (event.code === 'Enter') {
        // @TODO: Get first result or recent search
      } else if (event.code === 'Escape') {
        this.onBlur()
      }
    },
    onSelection (data) {
      this.name = data.name
      this.setSelectedResult(data)
      this.pushResult(data)
    }
  }
}
</script>
