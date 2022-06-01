<script setup>
import { computed } from "@vue/reactivity";

defineEmits(["close"]);

const props = defineProps({
  show: {
    type: Boolean,
    default: false,
  },
  maxWidth: {
    type: String,
    default: "auto",
  },
  height: {
    type: String,
    default: "auto",
  },
});

const displayStyle = computed(() => {
  return props.show ? "flex" : "none";
});
</script>

<template>
  <div
    class="dialog-container"
    :style="{ display: displayStyle }"
    @click="$emit('close')"
  >
    <div
      class="dialog-content"
      :style="{
        maxWidth: props.maxWidth,
        minHeight: props.height,
      }"
      @click.stop
    >
      <slot></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.dialog {
  &-container {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    justify-content: center;
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0, 0, 0); /* Fallback color */
    background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
  }

  &-content {
    display: flex;
    position: absolute;
    background-color: #fefefe;
    margin: 0 auto; /* 15% from the top and centered */
    margin-top: 10%;
    border: 1px solid #888;
  }
}
</style>
