<script setup>
import { computed } from "@vue/reactivity";
import axios from "axios";
import { reactive, ref, watch } from "vue";

const props = defineProps({
  question: String,
});

const emit = defineEmits(["answer"]);

const api = axios.create({
  baseURL: "https://backend.ehomefacts.com/api",
});

const formData = reactive({
  first_name: null,
  last_name: null,
  email: null,
  phone: null,
});

async function createAccount() {
  try {
    formData.username = formData.email;
    await api.post("signup", formData);
  } catch (error) {
    console.error(error);
  }
}

const valid = computed(() => {
  return !!formData.email && !!formData.first_name && !!formData.last_name;
});

watch(valid, () => {
  if (valid) {
    emit("answer", formData);
  } else {
    emit("answer", null);
  }
});
</script>

<template>
  <div>
    <h1>{{ props.question }}</h1>
    <form @submit.prevent="createAccount" class="sign-up-form">
      <input
        v-model="formData.first_name"
        class="col-6"
        type="text"
        placeholder="First name"
      />

      <input
        v-model="formData.last_name"
        class="col-6"
        type="text"
        placeholder="Last name"
      />

      <input
        v-model="formData.email"
        class="col-12"
        type="email"
        placeholder="Email"
      />

      <input
        v-model="formData.phone"
        class="col-12"
        type="tel"
        placeholder="Phone"
      />
    </form>
  </div>
</template>

<style lang="scss" scoped>
$input-margin: 0.5rem;
$input-padding: 1rem;
.sign-up-form {
  display: flex;
  flex-wrap: wrap;

  input {
    padding: $input-padding;
    margin: $input-margin;
  }
}

.col-6 {
  width: calc(50% - $input-margin * 2);
}

.col-12 {
  width: calc(100% - $input-margin * 2);
}
</style>
