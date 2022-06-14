<script setup>
import { computed } from "@vue/reactivity";

const props = defineProps({
  color: {
    type: String,
  },
  height: {
    type: String,
    default: "10px",
  },
  progress: {
    type: Number,
    default: 0,
  },
});

const totalProgress = computed(() => {
  return Math.min(props.progress / 100, 1);
});
</script>

<template>
  <div class="progress-bar-container">
    <div class="progress-bar-track"></div>
    <div class="progress-bar-inner"></div>
  </div>
</template>

<style lang="scss" scoped>
.progress-bar-container {
  position: relative;
  width: 100%;
  height: v-bind(height);
}

.progress-bar-track {
  position: absolute;
  height: 100%;
  width: 100%;
  background-color: var(--color-brand);
  opacity: 0.3;
}

.progress-bar-inner {
  position: absolute;
  height: 100%;
  width: calc(v-bind(totalProgress) * 100%);
  background-color: var(--color-brand);
  transition: width 300ms ease-in-out;
}
</style>
