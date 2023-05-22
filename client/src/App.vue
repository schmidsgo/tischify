<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import Navbar from './components/Navbar.vue';
import Searchbar from './components/Searchbar.vue';
import CardItem from './components/Card/CardItem.vue';
// import SearchResult from './components/SearchResult.vue';
import axios from 'axios';
import type { ItemType } from './types/types';
import { useAuthStore } from './stores/state';
import LoginModal from './components/LoginModal.vue';

const authStore = useAuthStore();

const state = reactive({
  restaurants: [] as ItemType[]
});
const searchQuery = ref('');
const searchType = ref('name');

axios.get('http://localhost:3000/restaurants').then(res => {
  state.restaurants = res.data;
});

const handleSearch = (query: string, type: string) => {
  searchQuery.value = query;
  searchType.value = type;
  console.log(searchQuery.value, searchType.value);
};

const filteredItems = computed(() => {
  let items = state.restaurants;
  if (searchQuery.value) {
    switch (searchType.value) {
      case 'name':
        const searchQueryValue = searchQuery.value || '';
        items = items.filter(item =>
          item.name.toLowerCase().includes(searchQueryValue.toLowerCase())
        );
        break;
      case 'location':
        items = items.filter(item =>
          item.location.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
        break;
      case 'category':
        items = items.filter(item =>
          item.category.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
        break;
      default:
        items = [];
        break;
    }
  }
  return items;
});

const fourRests = computed(() =>
  state.restaurants.filter(item => item.location === 'Augsburg').slice(0, 4)
);

const fourCafes = computed(() =>
  state.restaurants
    .filter(item => item.capacity['18:00'] === '\u25b3')
    .slice(0, 4)
);
console.log(authStore.user.name, authStore.user.role);
</script>

<template>
  <div class="bg-grey-lighten-5">
    <Navbar />
    <LoginModal />
    <!-- TODO: add role condition windows -->
    <!-- <v-window v-if="authStore.user.name, authStore.user.role === 'guest'" />
        <v-window-item v-if=" -->
    <Searchbar v-model="searchQuery" @search="handleSearch" />
    <v-layout>
      <v-main>
        <!-- FIXME: -->
        <!-- <SearchResult
          :items="filteredItems"
          :searchQuery="searchQuery"
          :searchType="searchType"
        /> -->
        <v-container
          v-if="searchQuery"
          class="d-flex justify-center align-center mt-8 px-0"
        >
          <v-row>
            <v-col cols="12" class="p-0">
              <div class="d-flex align-center">
                <h2 class="text-h4 text-grey-darken-3 font-weight-bold">
                  Suchergebnisse:
                </h2>
                <v-btn
                  v-if="searchQuery"
                  variant="tonal"
                  class="bg-pink rounded-xl text-white py-1 px-4 mx-4"
                >
                  # {{ searchQuery }}
                </v-btn>
              </div>
              <v-divider
                color="info"
                thickness="3"
                class="border-opacity-75 my-4"
              />
            </v-col>
            <v-col cols="3" v-for="item in filteredItems" :key="item.id">
              <CardItem :item="item" />
            </v-col>
          </v-row>
        </v-container>

        <v-container class="d-flex justify-center align-center">
          <v-row>
            <h2 class="text-h4 text-grey-darken-3 font-weight-bold mt-8">
              Empfehlungen
            </h2>
            <v-divider
              color="info"
              thickness="3"
              class="border-opacity-75 my-4"
            />
            <v-row>
              <v-col cols="3" v-for="item in fourRests" :key="item.id">
                <CardItem :item="item" />
              </v-col>
            </v-row>
          </v-row>
        </v-container>

        <v-container class="d-flex justify-center align-center mt-8">
          <v-row>
            <h2 class="text-h4 text-grey-darken-3 font-weight-bold pb-2 mt-4">
              Im Trend
            </h2>
            <v-divider
              color="info"
              thickness="3"
              class="border-opacity-75 my-4"
            />
            <v-row>
              <v-col cols="3" v-for="item in fourCafes" :key="item.id">
                <CardItem :item="item" />
              </v-col>
            </v-row>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>
