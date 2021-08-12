<template>
  <div>
    <div v-if="!isEmpty(data)">
      <result
        v-for="(item, itemIdx) in data"
        :key="itemIdx"
        :data="item"
        @onSelection="onSelection(item)"
      />
    </div>
    <div v-else class="no-result">
      <span>{{ emptyText }}</span>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import _ from 'lodash'

export default {
  props: {
    emptyText: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      isEmpty: _.isEmpty
    }
  },
  computed: {
    data: {
      get () {
        return this.$store.state.nationality.results
      }
    }
  },
  methods: {
    ...mapActions({
      setSelectedResult: 'nationality/setSelectedResult'
    }),
    onSelection (data) {
      this.setSelectedResult(data)
    }
  }
}
</script>
