<script setup lang="ts">
import { useAuthStore } from '../stores/state';
import { onMounted, ref, reactive } from 'vue';
import axios from 'axios';
import type { ItemType } from '../types/types';

const authStore = useAuthStore();

const isError = ref(false);
const errText = ref('');
const isSuccessful = ref(false);
const isLoading = ref(false);

const updateSettings = async () => {
  isLoading.value = true;
  await axios
    .put('http://localhost:3000/restaurants/settings', {
      name: item.name,
      address: item.address,
      city: item.city,
      phone_number: item.phone_number,
      opening_hours: item.opening_hours,
      capacity: item.capacity
    })
    .then(response => {
      isLoading.value = false;
      if (response.status == 200) isSuccessful.value = true;
    })
    .catch(error => {
      isError.value = true;
      errText.value = error.response.data.message;
      isLoading.value = false;
    });
};

const item = reactive<ItemType>({
  name: '',
  address: '',
  city: '',
  phone_number: '',
  opening_hours: '',
  capacity: 0
});

onMounted(async () => {
  await axios
    .get('http://localhost:3000/restaurants/settings/')
    .then(res => {
      item.name = res.data.name;
      item.address = res.data.address;
      item.city = res.data.city;
      item.phone_number = res.data.phone_number;
      item.opening_hours = res.data.opening_hours;
      item.capacity = res.data.capacity;
    })
    .catch(err => {
      console.log(err);
    });
});
</script>

<template>
  <v-layout>
    <v-main class="h-screen pa-4">
      <v-container>
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
              <v-img src="restaurant.jpeg" width="100%" />
            </image>
          </v-col>
          <v-col cols="6" class="px-8">
            <v-text class="text-h6 font-weight-semibold">
              Bearbeitung:
              <span class="font-weight-bold">{{ item.name }}</span>
            </v-text>
            <form @submit.prevent="updateSettings" class="mt-4 p-4">
              <v-text-field
                v-model="item.name"
                :placeholder="item.name"
                label="restaurant name"
                required
                append-inner-icon="mdi-pencil"
              />
              <v-text-field
                v-model="item.address"
                :placeholder="item.address"
                label="Adresse"
                required
                append-inner-icon="mdi-pencil"
              />
              <v-text-field
                v-model="item.city"
                :placeholder="item.city"
                label="Stadt"
                required
                append-inner-icon="mdi-pencil"
              />
              <v-text-field
                v-model="item.phone_number"
                :placeholder="item.phone_number"
                label="Telefon Nummer"
                required
                append-inner-icon="mdi-pencil"
              />
              <v-text-field
                v-model="item.opening_hours"
                :placeholder="item.opening_hours"
                label="Öffnungszeit"
                required
                append-inner-icon="mdi-pencil"
              />
              <v-text-field
                v-model="item.capacity"
                :placeholder="item.capacity"
                label="Kapazität"
                required
                append-inner-icon="mdi-pencil"
              />
              <div class="d-flex align-center justify-end">
                <p v-if="isError" class="text-red mr-4">{{ errText }}</p>
                <p v-if="isSuccessful" class="text-green mr-4">
                  Erfolgreich überschrieben!
                </p>
                <v-card-actions>
                  <v-btn
                    v-if="!isLoading"
                    color="info"
                    variant="flat"
                    size="large"
                    type="submit"
                    text="Updaten"
                    class="rounded-xl px-4"
                    @click="updateSettings"
                  />
                  <v-btn
                    v-else-if="isLoading"
                    color="info"
                    variant="flat"
                    size="large"
                    type="submit"
                    text="Updaten"
                    class="rounded-xl px-4"
                    disabled
                  >
                    <v-progress-circular color="Blue" size="25" indeterminate />
                  </v-btn>
                </v-card-actions>
              </div>
            </form>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-layout>
</template>
