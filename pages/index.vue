<template>
  <div class="bg-mischka flex flex-col h-screen min-h-screen">
    <search />
    <div class="h-full flex m-4 space-x-4">
      <graph />
      <card class="flex w-6/12 mt-20">
        <div class="w-full p-5">
          <span class="text-gray-500 text-xs">Previous Results</span>
          <previous :empty-text="'No previous results'" />
        </div>
      </card>
    </div>
  </div>
</template>

<script>
import card from '@/components/card.vue'
import search from '@/components/search.vue'
import graph from '@/components/graph.vue'
import previous from '@/containers/previous.vue'

export default {
  components: { card, search, graph, previous }
}
</script>
