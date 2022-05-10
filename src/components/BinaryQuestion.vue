<script setup>
const props = defineProps({
  question: {
    type: String,
  },
  currentAnswer: {
    type: Boolean,
  },
});
defineEmits(["answer"]);
</script>

<template>
  <div class="binary-container">
    <h2>{{ props.question }}</h2>
    <div class="binary-image">
      <img src="@/assets/images/excellent-house.png" alt="" />
    </div>
    <div class="button-container">
      <button
        :class="{ selected: props.currentAnswer }"
        @click="$emit('answer', true)"
      >
        Yes
      </button>
      <button
        :class="{ selected: props.currentAnswer === false }"
        @click="$emit('answer', false)"
      >
        No
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.binary-container {
  .binary-image {
    padding: 1rem;
    text-align: center;
  }
  .button-container {
    display: flex;
    justify-content: space-around;
    button {
      padding: 1rem 1.5rem;
      border: 1px solid var(--color-brand);
      background: none;
      cursor: pointer;
    }

    .selected {
      border: 2px solid var(--color-brand);
      background-color: var(--color-brand-hover);
    }
  }
}
</style>
