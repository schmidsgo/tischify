<script setup lang="ts">
import { useAuthStore } from '../stores/state';

const authStore = useAuthStore();
</script>

<template>
  <div class="d-flex px-8 bg-grey-darken-4 w-full h-100">
    <v-col cols="6" class="d-flex justify-start">
      <img class="h-12 mr-4" src="/logo.svg" alt="Logo" />
    </v-col>
    <v-col cols="6" class="d-flex justify-end">
      <v-btn
        class="mr-2 py-2 px-4 rounded font-weight-medium"
        variant="outlined"
        @click="
          (authStore.OpenLoginModal = false),
            (authStore.currentLoginType = 'login')
        "
      >
        Anmelden
      </v-btn>
      <v-btn
        class="mr-2 py-2 px-4 rounded font-weight-medium"
        variant="outlined"
        @click="
          (authStore.OpenLoginModal = false),
            (authStore.currentLoginType = 'signUp')
        "
      >
        Registrieren
      </v-btn>
    </v-col>
  </div>
</template>
