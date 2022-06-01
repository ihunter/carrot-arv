<script setup>
import { computed, ref, markRaw } from "@vue/reactivity";
import axios from "axios";
import AddressQuestion from "@/components/AddressQuestion.vue";
import BinaryQuestion from "@/components/BinaryQuestion.vue";
import ConditionQuestion from "@/components/ConditionQuestion.vue";
import OfferResults from "@/components/OfferResults.vue";
import SignUpForm from "./SignUpForm.vue";

import { useARV } from "@/composables/arv.js";

const emit = defineEmits(["close"]);

const api = axios.create({
  baseURL: "https://backend.ehomefacts.com/api",
});

const questionIndex = ref(0);

const questions = ref([
  {
    name: "address",
    question: "To get started, please enter a property address below.",
    component: markRaw(AddressQuestion),
    answer: null,
  },
  {
    name: "condition",
    question: "Overall, how would you rate the condition of your home?",
    component: markRaw(ConditionQuestion),
    answer: null,
  },
]);

const initQuestions = ref([
  {
    name: "address",
    question: "To get started, please enter a property address below.",
    component: markRaw(AddressQuestion),
    answer: null,
  },
  {
    name: "condition",
    question: "Overall, how would you rate the condition of your home?",
    component: markRaw(ConditionQuestion),
    answer: null,
  },
]);

const excellentQuestions = ref([
  {
    name: "signup",
    question: "Where would you like us to send your offer?",
    component: markRaw(SignUpForm),
    answer: null,
  },
  {
    name: "estimate",
    component: markRaw(OfferResults),
    answer: null,
  },
]);

const goodQuestions = ref([
  {
    name: "roof",
    question:
      "Has your roof been replaced and/or completely reshingled in the last 10 years?",
    component: markRaw(BinaryQuestion),
    answer: null,
  },
  {
    name: "bath_updates",
    question: "Have you updated any of your bathrooms in the last 5 years?",
    component: markRaw(BinaryQuestion),
    answer: null,
  },
  {
    name: "kitchen_updates",
    question: "Have you updated your kitchen in the last 5 years?",
    component: markRaw(BinaryQuestion),
    answer: null,
  },
  {
    name: "settlement",
    question:
      "Does your house have any present signs of settlement or sinkhole activity?",
    component: markRaw(BinaryQuestion),
    answer: null,
  },
  {
    name: "signup",
    question: "Where would you like us to send your offer?",
    component: markRaw(SignUpForm),
    answer: null,
  },
  {
    name: "estimate",
    component: markRaw(OfferResults),
    answer: true,
  },
]);

const fairQuestions = ref([
  {
    name: "roof",
    question:
      "Has your roof been replaced and/or completely reshingled in the last 10 years?",
    component: markRaw(BinaryQuestion),
    answer: null,
  },
  {
    name: "bath_updates",
    question: "Have you updated any of your bathrooms in the last 5 years?",
    component: markRaw(BinaryQuestion),
    answer: null,
  },
  {
    name: "kitchen_updates",
    question: "Have you updated your kitchen in the last 5 years?",
    component: markRaw(BinaryQuestion),
    answer: null,
  },
  {
    name: "settlement",
    question:
      "Does your house have any present signs of settlement or sinkhole activity?",
    component: markRaw(BinaryQuestion),
    answer: null,
  },
  {
    name: "signup",
    question: "Where would you like us to send your offer?",
    component: markRaw(SignUpForm),
    answer: null,
  },
  {
    name: "estimate",
    component: markRaw(OfferResults),
    answer: true,
  },
]);

const badQuestions = ref([
  {
    name: "settlement",
    question:
      "Does your house have any present signs of settlement or sinkhole activity?",
    component: markRaw(BinaryQuestion),
    answer: null,
  },
  {
    name: "signup",
    question: "Where would you like us to send your offer?",
    component: markRaw(SignUpForm),
    answer: null,
  },
  {
    name: "estimate",
    component: markRaw(OfferResults),
    answer: true,
  },
]);

const kitchenQuestions = ref([
  {
    name: "stone_countertops",
    question:
      "Are your counter tops made of granite or another polished stone?",
    component: markRaw(BinaryQuestion),
    answer: null,
  },
  {
    name: "wood_cabinets",
    question: "Are your cabinets made of wood and/or plywood?",
    component: markRaw(BinaryQuestion),
    answer: null,
  },
  {
    name: "ss_appliances",
    question: "Are your kitchen appliances stainless steel?",
    component: markRaw(BinaryQuestion),
    answer: null,
  },
]);

const settlementQuestions = ref([
  {
    name: "remediation",
    component: markRaw(BinaryQuestion),
    question:
      "Has there ever been any prior settlement/sinkhole remediation performed on the property?",
    answer: null,
  },
]);

const currentQuestion = computed(() => {
  return questions.value[questionIndex.value];
});

const currrentAnswer = computed(() => {
  return questions.value[questionIndex.value].answer;
});

const answers = computed(() => {
  const data = {};
  questions.value.forEach((q) => {
    data[q.name] = q.answer;
  });

  data.est_arv = arv.value;
  data.living_area = livingArea.value;
  data.baths = baths.value;

  return data;
});

function nextQuestion() {
  if (questionIndex.value + 1 < questions.value.length) {
    questionIndex.value++;
  } else {
    close();
  }
}

function backQuestion() {
  if (questionIndex.value - 1 >= 0) {
    questionIndex.value--;
  } else {
    close();
  }
}

function recordAnswer(answer) {
  const prevAnswer = questions.value[questionIndex.value].answer;
  questions.value[questionIndex.value].answer = answer;

  if (questions.value[questionIndex.value].name === "condition") {
    const condition = questions.value[questionIndex.value].answer;
    questions.value = getQuestionsForCondition(condition);
  }

  // Add additonal questions about the kitchen if recently updated
  if (questions.value[questionIndex.value].name === "kitchen_updates") {
    const answer = questions.value[questionIndex.value].answer;
    if (answer && !prevAnswer) {
      questions.value.splice(
        questionIndex.value + 1,
        0,
        ...kitchenQuestions.value
      );
    } else if (!answer && prevAnswer) {
      questions.value.splice(
        questionIndex.value + 1,
        kitchenQuestions.value.length
      );
    }
  }

  // Add additonal questions about settlement/sinkhole
  if (questions.value[questionIndex.value].name === "settlement") {
    const answer = questions.value[questionIndex.value].answer;
    if (!answer && (prevAnswer === null || prevAnswer)) {
      questions.value.splice(
        questionIndex.value + 1,
        0,
        ...settlementQuestions.value
      );
    } else if (answer && prevAnswer !== null && !prevAnswer) {
      questions.value.splice(
        questionIndex.value + 1,
        settlementQuestions.value.length
      );
    }
  }
}

function getQuestionsForCondition(condition) {
  const currentQuestions = questions.value.slice(0, 2);

  switch (condition) {
    case "excellent":
      return [...currentQuestions, ...excellentQuestions.value];
    case "good":
      return [...currentQuestions, ...goodQuestions.value];
    case "fair":
      return [...currentQuestions, ...fairQuestions.value];
    case "bad":
      return [...currentQuestions, ...badQuestions.value];
  }
}

const selectedCondtion = computed(() => {
  return questions.value.find((q) => q.name === "condition").answer;
});

const backButtonText = computed(() => {
  return questionIndex.value === 0 ? "Cancel" : "Back";
});

const nextButtonText = computed(() => {
  if (questionIndex.value === 0) {
    return "Get Started";
  } else if (questionIndex.value === questions.value.length - 1) {
    return "Close";
  } else {
    return "Next";
  }
});

const nextButtonDisabled = computed(() => {
  return currentQuestion.value.answer === null;
});

const arv = ref(null);
const livingArea = ref(null);
const baths = ref(null);

const loadingARV = ref(false);
const errorMsg = ref(null);

async function getARV(addressData) {
  loadingARV.value = true;

  try {
    errorMsg.value = null;
    const res = await api.post("calc_arv", addressData);

    const { data } = res;

    const comps = data.properties.comps;
    const subject = data.properties.subject;
    const constants = data.constants;

    livingArea.value = subject.livingArea;
    baths.value = subject.baths;

    const { calculateARV } = useARV(comps, subject, constants, true);

    arv.value = calculateARV();
  } catch (error) {
    console.error(error);
    errorMsg.value = error;
  }

  loadingARV.value = false;
}

function close() {
  emit("close");
  // reset questions
  questionIndex.value = 0;
  questions.value.forEach((q) => {
    q.answer = null;
  });
  questions.value = initQuestions.value;
}
</script>

<template>
  <div class="question-container">
    <div class="top-bar"></div>
    <div class="question-title">
      <h1>Get Cash Offer</h1>
      <button @click="close" class="close-btn">X</button>
    </div>
    <div class="question-content">
      <component
        :is="currentQuestion.component"
        :question="currentQuestion.question"
        :current-answer="currrentAnswer"
        :condition="selectedCondtion"
        :arv="arv"
        :answers="answers"
        :loadingARV="loadingARV"
        :errorMsg="errorMsg"
        @answer="recordAnswer"
        @address="getARV"
      ></component>
    </div>
    <div class="question-footer">
      <button @click="backQuestion" class="back">
        {{ backButtonText }}
      </button>
      <button
        @click="nextQuestion"
        :disabled="nextButtonDisabled"
        class="next"
        :class="{ disabled: nextButtonDisabled }"
      >
        {{ nextButtonText }}
      </button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.question-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  .top-bar {
    height: 0.5rem;
    background-color: var(--color-brand);
  }

  .question-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    border-bottom: 1px solid var(--color-brand);

    button {
      border: none;
      background: none;
      cursor: pointer;
      font-weight: bold;
      padding: 1rem;
    }
  }

  .question-content {
    display: flex;
    flex-direction: column;
    // justify-content: space-between;
    flex: 1 1 auto;
    padding: 1rem 1.5rem;

    h2 {
      margin-bottom: 1rem;
    }
  }

  .question-footer {
    display: flex;
    justify-content: space-between;
    padding: 1rem 1.5rem;

    button {
      border: none;
      background: none;
      cursor: pointer;
      padding: 0.75rem 1.5rem;
    }

    .back {
      color: var(--color-brand);
      border: 1px solid var(--color-brand);
    }
    .next {
      color: white;
      background-color: var(--color-brand);
    }

    .disabled {
      cursor: not-allowed;
      background-color: var(--color-brand-hover);
    }
  }
}
</style>
