<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import axios from 'axios';
import type { ItemType } from './types/types';
import { useAuthStore, useSettingsStore } from './stores/state';
import Navbar from './components/Navbar.vue';
import Searchbar from './components/Searchbar.vue';
import CardItem from './components/Card/CardItem.vue';
import LoginModal from './components/LoginModal.vue';

const authStore = useAuthStore();

const state = reactive({
  restaurants: [] as ItemType[]
});
const searchQuery = ref('');
const searchType = ref('');

axios.get('http://localhost:3000/restaurants').then(res => {
  state.restaurants = res.data;
});

const handleSearch = (query: string, type: string) => {
  searchQuery.value = query;
  searchType.value = type.toLowerCase();
  console.log(searchQuery.value, searchType.value);
};

const filteredItems = computed(() => {
  let items = state.restaurants;
  if (searchQuery.value) {
    switch (searchType.value) {
      case 'name':
        items = items.filter(item =>
          item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
        break;
      case 'city':
        items = items.filter(item =>
          item.city.toLowerCase().includes(searchQuery.value.toLowerCase())
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
  state.restaurants.filter(item => item.city === 'Frankfurt').slice(0, 4)
);

const fourCafes = computed(() =>
  state.restaurants
    .filter(item => item.opening_hours === '10:00-22:00')
    .slice(0, 4)
);

console.log(authStore.user.name, authStore.user.role);

const settingStore = useSettingsStore();

const name = authStore.user.name;
const address = ref('');
const city = ref('');
const phone_number = ref('');
const opening_hours = ref('');
const people = ref(0);
const datetime = ref('');
const isError = ref(false);
const isLoading = ref(false);

const settings = async () => {
  try {
    isLoading.value = true;
    // const response = await axios.post('http://localhost:3000/settings', {
    //   name: name.valueOf,
    //   address: address.value,
    //   city: city.value,
    //   phone_number: phone_number.value,
    //   opening_hours: opening_hours.value,
    //   people: people.value,
    //   datetime: datetime.value
    // });
    // settingStore.submitSetting(response.data);
    alert(
      name.valueOf +
        address.value +
        city.value +
        phone_number.value +
        opening_hours.value +
        people.value +
        datetime.value
    );
  } catch (error) {
    isError.value = true;
  } finally {
    isLoading.value = false;
  }
};
</script>

<template>
  <div class="bg-grey-lighten-5">
    <Navbar />
    <LoginModal />
    <v-window>
      <v-window-item v-if="authStore.user.role === 'restaurant'">
        <v-layout>
          <v-main>
            <v-container class="h-screen mt-4">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <v-text class="text-h4 text-grey-darken-3 font-weight-bold">
                    Willkommen {{ authStore.user.name }}!
                  </v-text>
                </v-col>
                <v-col>
                  <v-text class="text-h6 text-grey-darken-3 font-weight-bold">
                    Hier kannst du deine Restaurantsinfo bearbeiten.
                  </v-text>
                </v-col>
              </v-row>
              <v-divider class="my-4" />
              <v-row class="pa-4">
                <v-col cols="6" justify="start" class="bg-yellow">
                  <image>
                    <v-img src="rest1.jpeg" width="100%" />
                  </image>
                </v-col>
                <v-col cols="6" class="px-8">
                  <v-text class="text-h6 font-weight-semibold">
                    Bearbeitung:
                    <span class="font-weight-bold">{{
                      authStore.user.name
                    }}</span>
                  </v-text>
                  <form @submit.prevent="settings" class="mt-4 p-4">
                    <v-text-field
                      model-value="address-str.3"
                      label="Adresse"
                      required
                      append-inner-icon="mdi-pencil"
                    />
                    <v-text-field
                      model-value="0851/2629"
                      label="Telefon Nummer"
                      required
                      append-inner-icon="mdi-pencil"
                    />
                    <v-text-field
                      model-value="08:00-20:00"
                      label="Öffnungszeit"
                      required
                      append-inner-icon="mdi-pencil"
                    />
                    <v-text-field
                      model-value="0"
                      label="Kapazität"
                      required
                      append-inner-icon="mdi-pencil"
                    />
                    <p v-if="settingStore.isError" class="text-red ml-4">
                      Error!
                    </p>
                    <v-btn
                      color="info"
                      variant="flat"
                      size="large"
                      type="submit"
                      text="submit"
                      class="rounded-xl px-4"
                      @click="settings"
                    />
                  </form>
                </v-col>
              </v-row>
            </v-container>
          </v-main>
        </v-layout>
      </v-window-item>

      <v-window-item v-else>
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
                <h2
                  class="text-h4 text-grey-darken-3 font-weight-bold pb-2 mt-4"
                >
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
      </v-window-item>
    </v-window>
  </div>
</template>
