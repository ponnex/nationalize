<template>
  <div class="flex justify-between cursor-pointer ml-2 rounded-md p-2 hover:bg-gray-200 result" @click="$emit('onSelection', data)">
    <span>{{ data.name }}</span>
    <div class="hidden items-center text-gray-500 text-xs select-container">
      <span>Select</span>
      <img src="@/assets/images/enter-key.svg" alt="enter-key" class="ml-2 h-4 w-4">
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.result {
  &:hover {
    .select-container {
      @apply flex;
    }
  }
}
</style>
