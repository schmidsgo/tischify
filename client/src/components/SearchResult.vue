<script setup>
import CardItem from '../components/Card/CardItem.vue';
</script>

<template>
  <div class="p-4">
    <div class="flex">
      <h2 class="text-2xl font-medium pb-2 border-b-2 border-blue-400">
        Suchergebnisse:
      </h2>
      <p
        class="bg-pink-500/70 rounded-full text-white text-center w-24 py-1 px-2 mx-4"
      >
        cafe
      </p>
      <p
        class="bg-blue-500/70 rounded-full text-white text-center w-24 py-1 px-2"
      >
        Augsburg
      </p>
    </div>
    <div class="grid grid-cols-4 gap-4 p-4">
      <!-- <CardItem v-for="cafe in filteredCafes" :key="cafe.id" :cafe="cafe" /> -->
      <CardItem />
      <CardItem />
      <CardItem />
      <CardItem />
    </div>
  </div>
</template>
