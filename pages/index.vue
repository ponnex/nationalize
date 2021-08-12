<template>
  <div class="main-container">
    <search />
    <div class="view-container">
      <graph />
      <card class="view">
        <div class="w-full p-5">
          <span class="result-title">Previous Results</span>
          <previous :empty-text="'No previous results'" />
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import card from '~/components/card.vue'
import search from '~/components/search.vue'
import graph from '~/components/graph.vue'

export default {
  components: { card, search, graph }
}
</script>

<style lang="scss" scoped>
.main-container {
  @apply flex flex-col h-screen min-h-screen;
  background-color: #cfd1dd;
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
