<script setup>
import { watch } from "vue";

import { useForm, useField } from "vee-validate";
import * as yup from "yup";

const props = defineProps({
  question: String,
  currentAnswer: Object,
});

const emit = defineEmits(["answer"]);

const schema = yup.object({
  firstname: yup.string().required().min(1),
  lastname: yup.string().required(),
  email: yup.string().required().email(),
  phone: yup.string().required(),
});

const { meta } = useForm({
  validationSchema: schema,
});

const { value: firstname, errorMessage: firstnameError } =
  useField("firstname");
const { value: lastname, errorMessage: lastnameError } = useField("lastname");
const { value: email, errorMessage: emailError } = useField("email");
const { value: phone, errorMessage: phoneError } = useField("phone");

watch(meta, () => {
  if (meta.value.valid) {
    emit("answer", {
      firstname,
      lastname,
      email,
      phone,
    });
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
        v-model="firstname"
        class="col-6"
        type="text"
        name="firstname"
        placeholder="First name"
      />

      <input
        v-model="lastname"
        class="col-6"
        type="text"
        name="lastname"
        placeholder="Last name"
      />

      <input
        v-model="email"
        class="col-12"
        type="email"
        name="email"
        placeholder="Email"
      />

      <input
        v-model="phone"
        class="col-12"
        type="tel"
        name="phone"
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
