<template>
  <div class="d-flex align-centerpy-4 px-8 bg-grey-darken-4 w-full h-100">
    <v-col cols="6" class="d-flex justify-start">
      <img class="h-12 mr-4 bgPink" src="/logo.svg" alt="Logo" />
    </v-col>
    <v-col cols="6" class="d-flex justify-end">
      <v-btn
        class="bg-grey-lighten-2 mr-2 py-2 px-4 rounded font-weight-medium"
        v-for="i in ['Login', 'Sign up']"
        :key="i"
      >
        {{ i }}
      </v-btn>
    </v-col>
  </div>
</template>

<script lang="ts">
export default {};
</script>
