<script setup>
import { onMounted, ref } from "vue";
import axios from "axios";

// import { useARV } from "@/composables/arv.js";

const api = axios.create({
  baseURL: "https://backend.ehomefacts.com/api",
});

const props = defineProps({
  condition: {
    type: String,
  },
  arv: {
    type: Number,
  },
  answers: {
    type: Object,
  },
});

const loading = ref(false);
const cashOffer = ref(0);
const fees = ref(0);
const rehab = ref(0);

async function calculateRehabCostsAPI() {
  loading.value = true;
  // const { calculateARV } = useARV(comps, subject, constants, true);

  try {
    const res = await api.post("/offer_any", props.answers);
    cashOffer.value = res.data.cashOffer;
    fees.value = res.data.fees;
    rehab.value = res.data.rehab;
  } catch (error) {
    console.error("Error getting rehab calculation:", error);
  }

  loading.value = false;
}

onMounted(() => {
  calculateRehabCostsAPI();
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

      <div class="arv-price">${{ props.arv }}</div>

      <p>
        However a manual valuation by one of our agents may indicate a higher
        potential list price.
      </p>

      <p>
        Would you like to speak with a licensed agent to discuss the details?
      </p>
    </div>
    <div class="offer-results" v-else>
      <div class="offer-details">
        <div>Est. After Repair Value:</div>
        <div>{{ props.arv }}</div>
      </div>

      <div class="offer-details">
        <div>Est. Rehab Costs:</div>
        <div>{{ rehab }}</div>
      </div>

      <div class="offer-details">
        <div>Fees:</div>
        <div>{{ fees }}</div>
      </div>

      <hr />

      <div class="offer-details">
        <div>Cash Offer:</div>
        <div>{{ cashOffer }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.offer-container {
  .offer-excellent {
    p {
      margin-bottom: 1rem;
    }

    .arv-price {
      text-align: center;
      color: var(--color-brand);
      font-family: Helvetica;
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 1rem;
    }
  }
  .offer-results {
    .offer-details {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
    }
  }
}
</style>
