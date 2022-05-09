<script setup>
import axios from "axios";
import { reactive, ref } from "vue";

const api = axios.create({
  baseURL: "https://backend.ehomefacts.com/api",
});

const formData = reactive({
  username: null,
  password: null,
  password2: null,
  address: null,
  email: null,
  first_name: null,
  last_name: null,
  is_pro: false,
  is_seller: true,
  is_owner: null,
  owners: "",
  street: null,
  city: null,
  zip: null,
  state: null,
});

const tos = ref(false);

async function createAccount() {
  try {
    formData.username = formData.email;
    await api.post("signup", formData);
  } catch (error) {
    console.error(error);
  }
}
</script>

<template>
  <div>
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
        type="text"
        placeholder="Email"
      />

      <input
        v-model="formData.street"
        class="col-12"
        type="text"
        placeholder="Street Address"
      />
      <input
        v-model="formData.city"
        class="col-3"
        type="text"
        placeholder="City"
      />
      <input
        v-model="formData.state"
        class="col-3"
        type="text"
        placeholder="State"
      />
      <input
        v-model="formData.zip"
        class="col-3"
        type="text"
        placeholder="Zipcode"
      />

      <div class="col-12" style="margin: 0.5rem 0">
        <input
          v-model="formData.is_owner"
          type="checkbox"
          name="owner"
          id="owner"
        />
        <label for="owner">Are you the sole owner of the property?</label>
      </div>

      <div class="col-12">
        <label for="owners">
          If "No" Please List the Full Names of the All Owner(s) Listed on the
          Deed
        </label>
        <textarea
          v-model="formData.owners"
          name="owners"
          id="owners"
          rows="5"
        ></textarea>
      </div>

      <input
        v-model="formData.password"
        class="col-6"
        type="password"
        placeholder="Password"
      />
      <input
        v-model="formData.password2"
        class="col-6"
        type="password"
        placeholder="Confirm Password"
      />

      <div style="margin: 0.5rem 0">
        <input v-model="tos" type="checkbox" name="tos" id="tos" />
        <label for="tos" class="tos">
          By checking the box you acknowledge that you have read and agree to
          the <span class="tos-link">Terms of Service</span>
        </label>
      </div>

      <div class="actions">
        <button class="cancel-btn">cancel</button>
        <button type="submit" class="create-btn">Create Account</button>
      </div>
    </form>
  </div>
</template>

<style lang="scss" scoped>
$input-margin: 0.5rem;
$input-padding: 0.5rem;
.sign-up-form {
  display: flex;
  flex-wrap: wrap;

  input {
    padding: $input-padding;
    margin: $input-margin;
  }

  label {
    margin: $input-margin;
  }

  textarea {
    width: 100%;
    padding: $input-padding;
    margin: $input-margin;
  }

  .actions {
    width: 100%;
    display: flex;
    justify-content: space-between;

    .create-btn {
      padding: 1rem;
      background-color: var(--color-brand);
      color: white;
      border-color: transparent;
      cursor: pointer;
      font-weight: bold;
    }

    .cancel-btn {
      padding: 1rem;
      background-color: none;
      cursor: pointer;
      font-weight: bold;
    }
  }
}

.tos {
  font-size: 0.75rem;
}
.col-2 {
  width: calc(12.5% - $input-margin - $input-padding);
}

.col-3 {
  width: calc((100% / 3) - $input-margin - $input-padding);
}

.col-4 {
  width: calc(25% - $input-margin - $input-padding);
}

.col-6 {
  width: calc(50% - $input-margin - $input-padding);
}

.col-12 {
  width: calc(100% - $input-margin - $input-padding);
}
</style>
