<script setup>
import { ref } from "vue";
import DialogBox from "@/components/DialogBox.vue";
import SellerQuestionaire from "@/components/SellerQuestionaire.vue";

const showDialog = ref(false);
</script>

<template>
  <main>
    <section>
      <h1 style="text-align: center">
        Tampa Bay’s #1 Source for Instant Online Cash Offers
      </h1>

      <p>
        Are you looking to sell your home? Fair Fast Buyers has teamed up with
        eHomeFacts.com, a third-party automated home valuation platform in order
        to deliver truly instant cash offers! The process is free; it’s simple
        and there are absolutely no obligations!
      </p>

      <ul>
        <li>
          Enter the address of the single-family home that you are interested in
          selling
        </li>
        <li>Answer a few quick questions regarding the home’s condition</li>
        <li>
          Get your no obligation cash offer without any pushy sales people
          involved!
        </li>
      </ul>

      <p>
        It’s really that easy! No gimmicks! No tricks! Just a no hassle cash
        offer for your home!
      </p>

      <DialogBox
        max-width="800px"
        height="600px"
        :show="showDialog"
        @close="showDialog = false"
      >
        <SellerQuestionaire @close="showDialog = false"></SellerQuestionaire>
      </DialogBox>

      <button @click="showDialog = !showDialog">GET STARTED NOW</button>
    </section>
  </main>
</template>

<style lang="scss" scoped>
main {
  flex: 1 1 auto;
  padding: 1rem;
  display: flex;
  justify-content: center;

  section {
    max-width: 900px;

    h1,
    ul,
    p {
      margin-bottom: 1rem;
    }

    h1 {
      font-size: 2rem;
      font-weight: bold;
    }

    button {
      cursor: pointer;
      display: block;
      width: 100%;
      color: white;
      border: none;
      border-radius: 0.3rem;
      border-color: var(--color-button);
      background-color: var(--color-button);
      padding: 0.5rem;
      font-size: 2rem;
    }
  }
}
</style>
