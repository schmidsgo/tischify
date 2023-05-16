<script setup lang="ts">
import { useBookingStore } from '../../stores/state';
import type { ItemType } from '../../types/types';
import BookingModal from './BookingModal.vue';

defineProps<{ item: ItemType }>();

const bookingStore = useBookingStore();
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <v-card
      :elevation="isHovering ? 10 : 2"
      :class="{ 'on-hover': isHovering, 'cursor-pointer': isHovering }"
      v-bind="props"
      class="mx-auto rounded-lg"
    >
      <v-img class="align-end text-white" height="180" :src="item.image" cover>
        <v-card-title class="text-h6 font-weight-bold">
          {{ item.name }}
        </v-card-title>
      </v-img>
      <v-card-text class="text-subtitle-1 text-blue pt-4 pb-0">
        #{{ item.category }} <span class="text-grey">in</span> #{{
          item.location
        }}
      </v-card-text>
      <v-card-text class="pb-3">
        <v-flex v-for="i in 5" :key="i" class="mr-2">
          <!-- TODO: add rating -->
          <v-icon icon="mdi-star" class="text-blue" />
        </v-flex>
        <v-flex v-for="i in 2" :key="i">
          <!-- TODO: add price level -->
          <v-icon icon="mdi-currency-usd" class="text-blue" />
        </v-flex>
        <v-icon icon="mdi-currency-usd" class="text-grey" />
      </v-card-text>
      <v-card-text
        class="d-flex align-center justify-start text-h6 text-grey-darken-2 mr-2 py-1"
      >
        <!-- TODO: add opening hours -->
        8:00 - 18:00
      </v-card-text>
      <template v-slot:activator="{ props }">
        <v-btn
          v-bind="props"
          @click="bookingStore.showBookingModal = true"
          variant="tonal"
          class="bg-blue hover:bg-blue-lighten-3 ml-3 px-2 py-2 rounded-xl focus:outline-none"
        >
          Book Now
        </v-btn>
      </template>
      <v-card-actions class="mb-2">
        <v-btn color="pink-lighten-1" variant="flat">
          {{ item.capacity['18:00'] }} 18:00
        </v-btn>
        <v-btn color="pink-lighten-1" variant="flat">
          {{ item.capacity['18:30'] }} 18:30
        </v-btn>
        <v-btn color="pink-lighten-1" variant="flat">
          {{ item.capacity['19:00'] }} 19:00
        </v-btn>
      </v-card-actions>
      <!-- FIXME: -->
      <BookingModal :item="item" />
    </v-card>
  </v-hover>
</template>
