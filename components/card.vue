<template>
  <div class="card">
    <slot />
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.card {
  @apply rounded-md;
  background-color: #FFFFFF;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.2);
}
</style>
