<script setup lang="ts">
import { watch } from 'vue';
import { useAuthStore } from '../stores/state';

const authStore = useAuthStore();

let items = authStore.user.bookings;

watch(
  () => authStore.user.bookings,
  newBookings => {
    items = newBookings;
    console.log(items);
  }
);

function deleteBooking(id: string) {
  authStore.deleteBooking(id);
}

console.log(items);
</script>

<template>
  <div class="d-flex px-8 bg-grey-darken-4 w-full h-100">
    <v-col cols="6" class="d-flex justify-start">
      <router-link to="/">
        <img class="h-12 mr-4" src="/logo.svg" alt="Logo" />
      </router-link>
    </v-col>
    <v-col
      v-if="authStore.user.role === 'guest'"
      cols="6"
      class="d-flex align-center justify-end"
    >
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-format-list-bulleted-square"
            variant="icon"
            v-bind="props"
            class="mr-6"
            @click="authStore.getBookings()"
          />
        </template>
        <v-card min-width="360" class="mt-1">
          <v-card-title class="text-subtitle-1 font-weight-medium"
            >Deine Buchungen</v-card-title
          >
          <v-divider />
          <v-list>
            <v-list-item
              v-for="(item, index) in items"
              :key="item.reservation_id"
            >
              <v-row align="center">
                <v-col cols="3">
                  <v-img
                    class="bg-grey-lighten-2 rounded-lg"
                    height="70"
                    :src="item.restaurant_category + '.jpeg'"
                    cover
                  />
                </v-col>
                <v-col cols="7" class="pl-0">
                  <v-card-title class="text-h6 font-weight-bold p-0">
                    {{ item.restaurant_name }}
                  </v-card-title>
                  <v-card-text class="text-subtitle-1 p-0">
                    {{ item.datetime }} | {{ item.party_size }} Pers.
                  </v-card-text>
                </v-col>
                <v-col cols="2">
                  <v-icon
                    icon="mdi-trash-can"
                    color="red-lighten-2"
                    size="large"
                    @click="deleteBooking(item.reservation_id)"
                  />
                </v-col>
              </v-row>
              <!-- Add a separator between list items, except for the last item -->
              <div v-if="index !== items.length - 1" class="separator"></div>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-account"
            v-bind="props"
            variant="icon"
            class="mr-6"
          />
        </template>
        <v-card min-width="120" class="text-center">
          <v-card-text class="text-subtitle-1"
            >Hello, {{ authStore.user.name }}!</v-card-text
          >
          <v-btn
            @click="authStore.logout()"
            class="text-subtitle-2 text-Blue mb-4"
            variant="tonal"
            >ausloggen</v-btn
          >
        </v-card>
      </v-menu>
    </v-col>
    <v-col
      v-else-if="authStore.user.role === 'restaurant'"
      cols="6"
      class="d-flex align-center justify-end"
    >
      <!-- TODO: function? -->
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn icon="mdi-bell" v-bind="props" variant="icon" class="mr-3" />
        </template>
        <v-card min-width="120" min-height="180" class="mt-1 text-left">
          <v-card-text class="text-subtitle-1">Neue Buchungen:</v-card-text>
          <v-divider />
          <v-list>
            <v-list-item>
              <v-row align="center">
                <v-col cols="9">
                  <v-card-text class="text-subtitle-2 ma-0 pa-0">
                    4 Pers., 18:30 Uhr
                  </v-card-text>
                </v-col>
                <v-col cols="2">
                  <v-icon
                    icon="mdi-check-circle-outline"
                    color="grey-lighten-1"
                  />
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row align="center">
                <v-col cols="9">
                  <v-card-text class="text-subtitle-2 ma-0 pa-0">
                    2 Pers., 20:00 Uhr
                  </v-card-text>
                </v-col>
                <v-col cols="2">
                  <v-icon
                    icon="mdi-check-circle-outline"
                    color="grey-lighten-1"
                  />
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card>
      </v-menu>
      <v-menu>
        <template v-slot:activator="{ props }">
          <v-btn
            icon="mdi-account"
            v-bind="props"
            variant="icon"
            class="mr-6"
          />
        </template>
        <v-card min-width="120" class="mt-1 text-center">
          <v-card-text class="text-subtitle-1"
            >Hello, {{ authStore.user.name }}!</v-card-text
          >
          <v-btn
            @click="authStore.logout()"
            class="text-subtitle-2 text-Blue mb-4"
            variant="tonal"
            >ausloggen</v-btn
          >
        </v-card>
      </v-menu>
    </v-col>
    <v-col v-else cols="6" class="d-flex align-center justify-end">
      <v-btn
        class="mr-2 py-2 px-4 rounded font-weight-medium"
        variant="outlined"
        @click="
          (authStore.OpenLoginModal = true),
            (authStore.currentLoginType = 'login')
        "
      >
        Anmelden
      </v-btn>
      <v-btn
        class="mr-2 py-2 px-4 rounded font-weight-medium"
        variant="outlined"
        @click="
          (authStore.OpenLoginModal = true),
            (authStore.currentLoginType = 'register')
        "
      >
        Registrieren
      </v-btn>
    </v-col>
  </div>
</template>

<style>
.separator {
  height: 1px;
  background-color: #ccc;
  margin-top: 0.5rem;
  margin-bottom: 0.1rem;
}
</style>
