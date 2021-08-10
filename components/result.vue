<template>
  <div class="result" @click="$emit('onSelection', data)">
    <span>{{ data.name }}</span>
    <div class="select-container">
      <span>Select</span>
      <img src="@/assets/images/enter-key.svg" alt="enter-key" class="enter-key">
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
  @apply flex justify-between cursor-pointer ml-2 rounded-md p-2 hover:bg-gray-200;

  .select-container {
    @apply hidden items-center text-gray-500;
    font-size: 12px;
  }

  .enter-key {
    @apply ml-2;
    height: 16px;
    width: 16px;
  }

  &:hover {
    .select-container {
      @apply flex;
    }
  }

  &-container {
    @apply flex flex-col mb-2;

    .static-result {
      @apply text-gray-500 ml-2;
      font-size: 12px;
    }
  }
}
</style>
