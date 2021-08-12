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
        return this.$store.state.nationality.recents
      }
    }
  },
  methods: {
    ...mapActions({
      setSelectedResult: 'nationality/setSelectedResult',
      pushResult: 'nationality/pushResult'
    }),
    onSelection (data) {
      this.setSelectedResult(data)
      this.pushResult(data)
    }
  }
}
</script>
