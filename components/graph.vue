<template>
  <card class="flex w-6/12 mt-20 items-center justify-center">
    <div class="p-5">
      <h1 v-if="!isEmpty(selectedResult)" class="text-gray-500 text-center text-2xl">
        Result for {{ selectedResult.name }}
      </h1>
      <apexchart v-if="!isEmpty(selectedResult)" type="bar" width="500" :options="parseChartOptions()" :series="resultSeries()" />
      <span v-else>Search for name</span>
    </div>
  </card>
</template>

<script>
import _ from 'lodash'
import card from '~/components/card.vue'

export default {
  components: { card },
  data () {
    return {
      isEmpty: _.isEmpty,
      chartOptions: {}
    }
  },
  computed: {
    selectedResult: {
      get () {
        return this.$store.state.nationality.selectedResult
      }
    }
  },
  created () {
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
