<template>
  <div class="main-container">
    <card class="search-card">
      <div class="search-container">
        <svg
          enable-background="new 0 0 515.558 515.558"
          viewBox="0 0 515.558 515.558"
          xmlns="http://www.w3.org/2000/svg"
          class="search-icon"
        >
          <path
            d="m378.344 332.78c25.37-34.645 40.545-77.2 40.545-123.333 0-115.484-93.961-209.445-209.445-209.445s-209.444 93.961-209.444 209.445 93.961 209.445 209.445 209.445c46.133 0 88.692-15.177 123.337-40.547l137.212 137.212 45.564-45.564c0-.001-137.214-137.213-137.214-137.213zm-168.899 21.667c-79.958 0-145-65.042-145-145s65.042-145 145-145 145 65.042 145 145-65.043 145-145 145z"
            fill="#b4b5bf"
          />
        </svg>
        <input
          v-model="name"
          type="text"
          class="search-input"
          placeholder="Search for name"
          @input="searchDebounce"
          @focus="onFocus"
          @blur="onBlur"
          @keydown="onKeydown"
        >
      </div>
      <div class="search-results-container" :class="{'show': hasFocus }">
        <div v-if="!isEmpty(queryResult) && !isEmpty(name) && name === queryResult.name" class="result-container">
          <span class="result-title">Results</span>
          <result v-if="!isEmpty(queryResult.country)" :data="queryResult" @onSelection="onSelection" />
          <div v-else class="static-result">
            <span>No Result</span>
          </div>
        </div>
        <div class="result-container">
          <span class="result-title">Recent</span>
          <div v-if="!isEmpty(results)">
            <result v-for="(result, resultIdx) in results" :key="resultIdx" :data="result" @onSelection="onSelection" />
          </div>
          <div v-else class="no-result">
            <span>No recent searches</span>
          </div>
        </div>
      </div>
    </card>
    <div class="view-container">
      <card class="view items-center justify-center">
        <div class="p-5">
          <h1 v-if="!isEmpty(selectedResult)" class="text-gray-500 text-center text-2xl">
            Result for {{ selectedResult.name }}
          </h1>
          <apexchart v-if="!isEmpty(selectedResult)" type="bar" width="500" :options="parseChartOptions()" :series="resultSeries()" />
          <span v-else>Search for name</span>
        </div>
      </card>
      <card class="view">
        <div class="w-full p-5">
          <span class="result-title">Previous Results</span>
          <div v-if="!isEmpty(recents)">
            <result v-for="(recent, recentIdx) in recents" :key="recentIdx" :data="recent" @onSelection="onSelectionPrevious" />
          </div>
          <div v-else class="no-result">
            <span>No recent searches</span>
          </div>
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'
import card from '~/components/card.vue'

export default {
  components: { card },
  data () {
    return {
      name: '',
      searchDebounce: Function,
      isEmpty: _.isEmpty,
      hasFocus: false,
      chartOptions: {}
    }
  },
  computed: {
    results: {
      get () {
        return this.$store.state.nationality.results
      }
    },
    recents: {
      get () {
        return this.$store.state.nationality.recents
      }
    },
    queryResult: {
      get () {
        return this.$store.state.nationality.queryResult
      }
    },
    selectedResult: {
      get () {
        return this.$store.state.nationality.selectedResult
      }
    }
  },
  created () {
    this.searchDebounce = _.debounce(this.onSearchDebounce.bind(this), 500)
    this.chartOptions = {
      ...this.chartOptions,
      ...{
        chart: {
          id: 'vuechart-example',
          type: 'bar',
          stacked: false,
          toolbar: {
            show: false,
            tools: {
              selection: false,
              zoom: false,
              zoomin: false,
              zoomout: false,
              pan: false
            }
          }
        },
        yaxis: {
          max: 100,
          labels: {
            formatter (value) {
              return value.toFixed(0)
            }
          }
        }
      }
    }
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
    },
    onSelectionPrevious (data) {
      this.name = data.name
      this.setSelectedResult(data)
    },
    parseChartOptions () {
      if (!_.isEmpty(this.selectedResult)) {
        const results = this.selectedResult.country
        const categories = _.map(results, (result) => {
          return result.country_id
        })

        return {
          ...this.chartOptions,
          ...{
            xaxis: {
              categories
            }
          }
        }
      } else {
        return this.chartOptions
      }
    },
    resultSeries () {
      if (!_.isEmpty(this.selectedResult)) {
        const results = this.selectedResult.country
        const data = _.map(results, (result) => {
          return (result.probability * 100).toFixed(2)
        })

        return [{
          name: 'Nationality',
          data
        }]
      } else {
        return [{
          name: 'Nationality',
          data: []
        }]
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  @apply flex flex-col h-screen min-h-screen;
  background-color: #cfd1dd;
}
.search {
  &-card {
    @apply absolute top-2 w-9/12 md:w-6/12 z-50;
    margin: auto;
    top: 20px; left: 0; right: 0;
  }
  &-container {
    @apply flex items-center space-x-3 p-4;
  }
  &-icon {
    height: 20px;
    width: 20px;
  }
  &-input {
    @apply w-full focus:outline-none placeholder-gray-300;
  }
  &-results {
    &-container {
      @apply bg-white rounded-b shadow-lg border-t border-gray-200 p-0 overflow-auto;
      transition: all 0.2s ease-in;
      max-height: 0;
      opacity: 0;

      &.show {
        @apply p-3;
        max-height: 50vh;
        opacity: 1;
      }
    }
  }
}

.result {
  &-title {
    @apply text-gray-500;
    font-size: 12px;
  }
}

.view {
  @apply flex w-6/12 mt-20;
  &-container {
    @apply h-full flex m-4 space-x-4;
  }
}
</style>
