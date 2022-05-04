<script setup>
const props = defineProps({
  question: {
    type: String,
  },
  currentAnswer: {
    type: String,
  },
});

defineEmits(["answer"]);
</script>

<template>
  <div>
    <h2>{{ props.question }}</h2>
    <div class="condition-container">
      <div
        class="condition-card"
        :class="{ active: currentAnswer === 'excellent' }"
        @click="$emit('answer', 'excellent')"
      >
        <div class="condition-card-img">
          <img
            src="@/assets/images/excellent-house.png"
            alt="Excellent Condition House"
          />
          <div style="color: rgb(116, 207, 231); font-weight: bold">
            Excellent
          </div>
        </div>
        <div class="condition-card-text">
          The house is like new. It's in tip top shape with modern ammenities.
        </div>
      </div>
      <div
        class="condition-card"
        :class="{ active: currentAnswer === 'good' }"
        @click="$emit('answer', 'good')"
      >
        <div class="condition-card-img">
          <img
            src="@/assets/images/good-house.png"
            alt="Good Condition House"
          />
          <div style="color: rgb(165, 186, 82); font-weight: bold">Good</div>
        </div>
        <div class="condition-card-text">
          The house has no major issues but it is old and needs to be updated.
        </div>
      </div>
      <div
        class="condition-card"
        :class="{ active: currentAnswer === 'fair' }"
        @click="$emit('answer', 'fair')"
      >
        <div class="condition-card-img">
          <img
            src="@/assets/images/fair-house.png"
            alt="Fair Condition House"
          />
          <div style="color: rgb(246, 167, 36); font-weight: bold">Fair</div>
        </div>
        <div class="condition-card-text">
          The house has some issues and needs a moderate amount of repairs.
        </div>
      </div>
      <div
        class="condition-card"
        :class="{ active: currentAnswer === 'bad' }"
        @click="$emit('answer', 'bad')"
      >
        <div class="condition-card-img">
          <img src="@/assets/images/bad-house.png" alt="Bad Condition House" />
          <div style="color: rgb(243, 119, 119); font-weight: bold">Bad</div>
        </div>
        <div class="condition-card-text">
          The house needs extensive repairs. It's in rough shape.
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.condition-container {
  display: grid;
  grid-auto-flow: column;
  grid-auto-columns: 1fr;
  gap: 0.5rem;

  .condition-card {
    cursor: pointer;
    padding: 1rem;
    border: 1px solid var(--color-brand);
    .condition-card-img {
      text-align: center;
    }

    .condition-card-text {
      margin-top: 1rem;
      text-align: center;
    }
  }

  .active {
    background-color: var(--color-brand-hover);
  }
}
</style>
