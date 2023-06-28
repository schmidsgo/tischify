<script setup lang="ts">
import { useAuthStore } from '../stores/state';
import { onMounted, ref } from 'vue';
import axios from 'axios';

const authStore = useAuthStore();

const name = authStore.user.name;
// const restaurant_id = authStore.user.restaurant_id;
const address = ref(authStore.user?.address ?? '');
const city = ref(authStore.user?.city ?? '');
const phone_number = ref(authStore.user?.phone_number ?? '');
const opening_hours = ref(authStore.user?.opening_hours ?? '');
const capacity = ref(authStore.user?.capacity ?? 0);

// TODO: add error handling, loading state

const settings = async () => {
  console.log('Start of settings');
  await axios
    .put('http://localhost:3000/restaurants/settings', {
      name: name.valueOf,
      address: address.value,
      city: city.value,
      phone_number: phone_number.value,
      opening_hours: opening_hours.value,
      capacity: capacity.value
    })
    .then(response => {
      console.log(response);
    })
    .catch(error => {
      console.log(error);
    });
};

onMounted(async () => {
  await authStore.getRestaurant();
});
</script>

<template>
  <v-layout>
    <v-main class="mb-5 pa-4">
      <v-container>
        <v-row>
          <v-col cols="12" class="pb-0">
            <v-text class="text-h4 text-grey-darken-3 font-weight-bold">
              Willkommen {{ name }}!
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
              <v-img src="restaurant.jpeg" width="100%" />
            </image>
          </v-col>
          <v-col cols="6" class="px-8">
            <v-text class="text-h6 font-weight-semibold">
              Bearbeitung:
              <span class="font-weight-bold">{{ name }}</span>
            </v-text>
            <form @submit.prevent="settings" class="mt-4 p-4">
              <v-text-field
                v-model="name"
                :placeholder="name"
                label="restaurant name"
                required
                append-inner-icon="mdi-pencil"
              />
              <v-text-field
                v-model="address"
                :placeholder="address"
                label="Adresse"
                required
                append-inner-icon="mdi-pencil"
              />
              <!-- <p>city: {{ city }}</p> -->
              <v-text-field
                v-model="city"
                :placeholder="city"
                label="Stadt"
                required
                append-inner-icon="mdi-pencil"
              />
              <v-text-field
                v-model="phone_number"
                :placeholder="phone_number"
                label="Telefon Nummer"
                required
                append-inner-icon="mdi-pencil"
              />
              <v-text-field
                v-model="opening_hours"
                :placeholder="opening_hours"
                label="Öffnungszeit"
                required
                append-inner-icon="mdi-pencil"
              />
              <v-text-field
                v-model="capacity"
                :placeholder="capacity"
                label="Kapazität"
                required
                append-inner-icon="mdi-pencil"
              />
              <!-- <p v-if="settingStore.isError" class="text-red ml-4">Error!</p> -->
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
</template>
