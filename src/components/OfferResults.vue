<script setup>
import { onMounted, ref, watch } from "vue";
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
  loadingARV: Boolean,
});

const emit = defineEmits(["cashOffer", "fees", "rehab"]);

const loading = ref(false);
const cashOffer = ref(0);
const fees = ref(0);
const rehab = ref(0);

async function calculateRehabCostsAPI() {
  if (props.loadingARV) {
    console.log("ARV NOT READY");
    return;
  }

  console.log("ARV IS READY");

  loading.value = true;

  try {
    const res = await api.post("/offer_any", props.answers);
    cashOffer.value = res.data.cashOffer;
    fees.value = res.data.fees;
    rehab.value = res.data.rehab;

    emit("cashOffer", cashOffer.value);
    emit("fees", fees.value);
    emit("rehab", rehab.value);
  } catch (error) {
    console.error("Error getting rehab calculation:", error);
  }

  loading.value = false;
}

function formatCurrency(value) {
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return formatter.format(value);
}

watch(
  () => props.loadingARV,
  () => {
    calculateRehabCostsAPI();
  }
);

onMounted(() => {
  calculateRehabCostsAPI();
});
</script>

<template>
  <div class="offer-container">
    <div class="offer-loading" v-if="props.loadingARV">
      Getting Offer Results

      <div>
        <img src="@/assets/images/spinner.gif" alt="loading" />
      </div>
    </div>

    <div class="offer-excellent" v-else-if="props.condition === 'excellent'">
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
        <div>{{ formatCurrency(props.arv) }}</div>
      </div>

      <div class="offer-details">
        <div>Est. Rehab Costs:</div>
        <div>{{ formatCurrency(rehab) }}</div>
      </div>

      <div class="offer-details">
        <div>Fees:</div>
        <div>{{ formatCurrency(fees) }}</div>
      </div>

      <hr />

      <div class="offer-details">
        <div>Cash Offer:</div>
        <div>{{ formatCurrency(cashOffer) }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.offer-container {
  .offer-loading {
    text-align: center;
    font-size: 2rem;
  }
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
    font-size: 1.5rem;
    .offer-details {
      display: flex;
      justify-content: space-between;
      margin: 1rem 0;
    }
  }
}
</style>
