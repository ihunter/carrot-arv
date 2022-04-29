<script setup>
import { ref } from "vue";
import DialogBox from "@/components/DialogBox.vue";
import SellerQuestionaire from "@/components/SellerQuestionaire.vue";

const showDialog = ref(false);
</script>

<template>
  <main>
    <section>
      <DialogBox
        max-width="800px"
        height="600px"
        :show="showDialog"
        @close="showDialog = false"
      >
        <SellerQuestionaire @close="showDialog = false"></SellerQuestionaire>
      </DialogBox>

      <button @click="showDialog = !showDialog">Show Dialog</button>
    </section>
  </main>
</template>

<style scoped>
main {
  flex: 1 1 auto;
  padding: 1rem;
}
</style>
