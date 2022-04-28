<script setup>
defineEmits(["answer"]);
</script>

<template>
  <div class="binary-container">
    <div class="button-container">
      <button @click="$emit('answer', true)">Yes</button>
      <button @click="$emit('answer', false)">No</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.binary-container {
  .button-container {
    display: flex;
    justify-content: space-around;
    button {
      padding: 1rem 1.5rem;
      border: 1px solid var(--color-brand);
      background: none;
    }
  }
}
</style>
