<script setup>
import { ref } from "vue";
import ProgressBar from "../components/ProgressBar.vue";

const progress = ref(0);
</script>

<template>
  <div class="test-container">
    <ProgressBar :progress="progress" />

    <button @click="progress += 30">Increment progress</button>
    <button @click="progress -= 50">Decrement progress</button>
  </div>
</template>

<style lang="scss" scoped>
.test-container {
  height: 100vh;
}
</style>
