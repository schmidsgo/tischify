<script setup lang="ts">
import { useAuthStore } from '../stores/state';

const authStore = useAuthStore();
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
          />
        </template>
        <v-card min-width="360" class="mt-1">
          <v-card-title>Deine Buchungen</v-card-title>
          <v-divider />
          <v-list>
            <v-list-item>
              <v-row align="center">
                <v-col cols="4">
                  <v-img
                    class="bg-grey-lighten-2 rounded-lg"
                    height="70"
                    src="restaurant.jpeg"
                    cover
                  />
                </v-col>
                <v-col cols="8" class="pl-0">
                  <v-card-title class="text-h6 font-weight-bold p-0">
                    Restaurant 12
                  </v-card-title>
                  <v-card-text class="text-subtitle-1 p-0">
                    22.05.23 18:00 2 Pers.
                  </v-card-text>
                </v-col>
              </v-row>
            </v-list-item>
            <v-list-item>
              <v-row align="center">
                <v-col cols="4">
                  <v-img
                    class="bg-grey-lighten-2 rounded-lg"
                    height="70"
                    src="cafe.jpeg"
                    cover
                  />
                </v-col>
                <v-col cols="8" class="pl-0">
                  <v-card-title class="text-h6 font-weight-bold p-0">
                    Cafe 9
                  </v-card-title>
                  <v-card-text class="text-subtitle-1 p-0">
                    14.08.23 10:00 4 Pers.
                  </v-card-text>
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
        <v-card min-width="120" class="mt-1">
          <v-card-text>Hello, {{ authStore.user.name }}!</v-card-text>
          <v-card-text @click="authStore.logout()" class="pt-0 text-Blue"
            >ausloggen</v-card-text
          >
        </v-card>
      </v-menu>
    </v-col>
    <v-col
      v-else-if="authStore.user.role === 'restaurant'"
      cols="6"
      class="d-flex align-center justify-end"
    >
      <v-btn icon="mdi-cog" variant="icon" class="mr-6" />
      <v-btn icon="mdi-account" variant="icon" class="mr-6" />
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
