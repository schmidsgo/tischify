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
      <v-img
        class="align-end text-white"
        height="180"
        :src="`${item.category}.jpeg`"
        cover
      >
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
        <v-row>
          <v-col cols="7" class="mr-0">
            <v-flex v-for="i in item.rating" :key="i">
              <v-icon icon="mdi-star" class="text-blue" />
            </v-flex>
            <v-flex v-for="i in 5 - item.rating" :key="i">
              <v-icon icon="mdi-star" class="text-grey" />
            </v-flex>
          </v-col>
          <v-col cols="5">
            <v-flex v-for="i in item.price_level" :key="i">
              <v-icon icon="mdi-currency-eur" class="text-blue" />
            </v-flex>
            <v-flex v-for="i in 3 - item.price_level" :key="i">
              <v-icon icon="mdi-currency-eur" class="text-grey" />
            </v-flex>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-text
        class="d-flex align-center justify-start text-h6 text-grey-darken-2 py-1"
      >
        <v-row>
          <v-col cols="7" class="my-2">
            {{ item.opening_hours }}
          </v-col>
          <v-col cols="5">
            <v-btn
              @click="bookingStore.showBookingModal = true"
              variant="tonal"
              class="bg-blue hover:bg-blue-lighten-3 rounded-xl focus:outline-none"
            >
              Buchen
            </v-btn>
          </v-col>
        </v-row>
      </v-card-text>
      <v-card-actions class="mt-1 ml-1 mb-2">
        <v-btn color="pink-lighten-1" variant="flat">○ 18:00 </v-btn>
        <v-btn color="pink-lighten-1" variant="flat">△ 18:30 </v-btn>
        <v-btn color="pink-lighten-1" variant="flat">◎ 19:00 </v-btn>
      </v-card-actions>
      <BookingModal :item="item" />

      <template v-slot:placeholder>
        <v-sheet color="bg-grey-lighten-4" class="fill-height">
          <v-skeleton-loader
            class="mx-auto border"
            max-width="200"
            height="300"
            type="image, article"
          />
        </v-sheet>
      </template>
    </v-card>
  </v-hover>
</template>
