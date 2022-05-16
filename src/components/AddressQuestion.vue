<script setup>
import { computed } from "@vue/reactivity";
import { ref } from "vue";

const props = defineProps({
  question: String,
  currentAnswer: Object,
  errorMsg: Object,
});

const emit = defineEmits(["answer", "address"]);

const place = ref({});

async function setPlace(e) {
  place.value = e;

  const streetNumber = place.value.address_components.find((comp) =>
    comp.types.includes("street_number")
  ).short_name;

  const streetName = place.value.address_components.find((comp) =>
    comp.types.includes("route")
  ).short_name;

  const city = place.value.address_components.find((comp) =>
    comp.types.includes("locality")
  ).short_name;

  const county = place.value.address_components.find((comp) =>
    comp.types.includes("administrative_area_level_2")
  ).short_name;

  const state = place.value.address_components.find((comp) =>
    comp.types.includes("administrative_area_level_1")
  ).short_name;

  const zip1 = place.value.address_components.find((comp) =>
    comp.types.includes("postal_code")
  ).short_name;

  const zip2 = place.value.address_components.find((comp) =>
    comp.types.includes("postal_code_suffix")
  ).short_name;

  const address = `${streetNumber} ${streetName}`;

  const latitude = place.value.geometry.location.lat();
  const longitude = place.value.geometry.location.lng();

  const addressData = {
    address,
    city,
    county,
    latitude,
    longitude,
    state,
    zip1,
    zip2,
  };

  console.log(addressData);

  emit("answer", addressData);
  emit("address", addressData);

  if (!props.errorMsg) {
    emit("answer", null);
  }
}

const formattedAddress = computed(() => {
  if (props.currentAnswer) {
    return `${props.currentAnswer.address}, ${props.currentAnswer.city} ${props.currentAnswer.zip1}`;
  }

  return false;
});
</script>

<template>
  <div>
    <h2>{{ props.question }}</h2>
    <GMapAutocomplete
      placeholder="Enter an address here"
      @place_changed="setPlace"
      class="autocomplete"
    >
    </GMapAutocomplete>

    <div v-if="props.errorMsg" class="error-message">
      <h1>Unsupported Property</h1>
      <h2>Unfortunately this property is not supported at this time.</h2>
    </div>
    <div class="address-container" v-else-if="formattedAddress">
      <h1>Selected Property</h1>
      <div class="property-address">{{ formattedAddress }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.autocomplete {
  width: 100%;
  padding: 1rem;
  margin: 1rem 0;
  border-radius: 9999px;
}

.address-container {
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    font-size: 2rem;
  }

  .property-address {
    font-size: 2rem;
  }
}

.error-message {
  text-align: center;

  h1 {
    font-size: 2rem;
    color: var(--color-error);
  }

  h2 {
    font-size: 1.5rem;
  }
}
</style>
