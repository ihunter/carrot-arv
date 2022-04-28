<script setup>
const props = defineProps({
  condition: {
    type: String,
  },
  arv: {
    type: Number,
    default: 0,
  },
});
</script>

<template>
  <div class="offer-container">
    <div class="offer-excellent" v-if="props.condition === 'excellent'">
      <p>It appears that your home is already in retail ready condition.</p>
      <p>
        Listing the property is the best bet to ensure that you receive the
        highest price for your home.
      </p>
      <p>Currently our software places your home at a value of:</p>

      <div class="arv-price">
        {{ props.arv }}
      </div>

      <p>
        However a manual valuation by one of our agents may indicate a higher
        potential list price.
      </p>

      <p>
        Would you like to speak with a licensed agent to discuss the details?
      </p>
    </div>
    <div class="offer-good" v-if="props.condition === 'good'">
      <p></p>
    </div>
    <div class="offer-fair" v-if="props.condition === 'fair'">
      <p></p>
    </div>
    <div class="offer-bad" v-if="props.condition === 'bad'">
      <p></p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.offer-container {
  .offer-excellent {
  }
  .offer-good {
  }
  .offer-fair {
  }
  .offer-bad {
  }
}
</style>
