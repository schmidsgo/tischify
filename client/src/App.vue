<script setup>
import Searchbar from './components/Searchbar.vue';
import CardItem from './components/Card/CardItem.vue';
import Navbar from './components/Navbar.vue';
import SearchResult from './components/SearchResult.vue';
</script>

<template>
  <div>
    <Navbar />
    <Searchbar />
    <div class="p-6">
      <h2 class="text-2xl font-medium pb-2 border-b-2 border-blue-400">
        Empfehlungen
      </h2>
      <div class="grid grid-cols-4 gap-4 p-4">
        <CardItem v-for="cafe in filteredCafes" :key="cafe.id" :cafe="cafe" />
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </div>
    </div>
    <div class="p-6">
      <h2 class="text-2xl font-medium pb-2 border-b-2 border-blue-400">
        Im Trend
      </h2>
      <div class="grid grid-cols-4 gap-4 p-4">
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </div>
    </div>
    <!-- <SearchResult /> -->
  </div>
</template>
