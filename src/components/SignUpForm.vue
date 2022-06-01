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
  phone: yup.string(),
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
      <div class="col-6">
        <label for="firstname">* Firstname</label>
        <input
          v-model="firstname"
          type="text"
          name="firstname"
          placeholder="First name"
          required
        />
        <div class="error-message">{{ firstnameError }}</div>
      </div>

      <div class="col-6">
        <label for="lastname">* Lastname</label>
        <input
          v-model="lastname"
          type="text"
          name="lastname"
          placeholder="Last name"
          required
        />
        <div class="error-message">{{ lastnameError }}</div>
      </div>

      <div class="col-12">
        <label for="email">* Email</label>
        <input
          v-model="email"
          type="email"
          name="email"
          placeholder="Email"
          required
        />
        <div class="error-message">{{ emailError }}</div>
      </div>

      <div class="col-12">
        <label for="phone">Phone</label>
        <input v-model="phone" type="tel" name="phone" placeholder="Phone" />
        <div class="error-message">{{ phoneError }}</div>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
$input-margin: 0.5rem;
$input-padding: 1rem;
.sign-up-form {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;

  label {
    margin: 0 $input-margin;
    display: block;
  }

  input {
    width: 100%;
    padding: $input-padding;
  }

  .error-message {
    color: #cc0033;
    font-size: 14px;
    margin: 5px 0 0;
  }
}

.col-6 {
  width: calc(50% - $input-margin * 2);
}

.col-12 {
  width: calc(100% - $input-margin * 2);
}
</style>
