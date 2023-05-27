<script setup lang="ts">
import type { ItemType } from '../types/types';
defineProps<{
  items: ItemType[];
  item: ItemType;
  searchQuery: String;
  searchType: String;
}>();
</script>

<template>
  <v-container
    v-if="searchQuery"
    class="d-flex justify-center align-center mt-4 p-0"
  >
    <v-row>
      <v-col cols="12" class="p-0">
        <div class="d-flex align-center">
          <h2 class="text-h4 text-grey-darken-3 font-weight-bold bg-Blue">
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
        <v-divider color="info" thickness="3" class="border-opacity-75 my-4" />
      </v-col>
      <v-col cols="3" v-for="item in items" :key="item.id">
        <CardItem :item="item" />
      </v-col>
    </v-row>
  </v-container>
</template>
