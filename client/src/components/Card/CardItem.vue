<script setup lang="ts">
import { useStore } from '../../stores/state';
import type { ItemType } from '../../types/types';

defineProps<{ item: ItemType }>();

const { booking, showBookingModal, submitBooking } = useStore();
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <!-- FIXME: cursor-pointer -->
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
      <v-card-text class="pb-0">
        <v-flex v-for="i in 5" :key="i" class="mr-2">
          <star-icon class="text-blue" />
        </v-flex>
        <v-flex v-for="i in 2" :key="i">
          <currency-dollar-icon class="text-blue" />
        </v-flex>
        <currency-dollar-icon class="text-grey" />
      </v-card-text>
      <v-card-text
        class="d-flex align-center justify-start text-h6 text-grey-darken-2 mr-2 py-1"
      >
        8:00 - 18:00
        <v-btn
          @click="showBookingModal = true"
          variant="tonal"
          class="bg-blue hover:bg-blue-lighten-3 text-white ml-3 px-2 py-2 rounded-xl focus:outline-none"
        >
          Book Now
        </v-btn>
      </v-card-text>
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
      <!-- <BookingModal :showBookingModal="showBookingModal" :tenant="item" /> -->
      <v-dialog v-model="showBookingModal" activator="parent" width="70%">
        <v-card class="pa-5">
          <v-row>
            <v-col cols="6" justify="start" class="bg-yellow">
              <v-card-image>
                <v-img :src="item.image" width="100%" />
              </v-card-image>
              <v-card-title class="text-lg font-weight-bold my-2 pa-0">
                {{ item.name }}
                <v-divider thickness="2" class="border-opacity-75 mt-1 w-50" />
              </v-card-title>
              <v-card-text class="text-lg pa-0">
                <!-- {{ item.address }} -->
                Address-str.14 86156 Augsburg
              </v-card-text>
            </v-col>
            <v-col cols="6">
              <div class="d-flex align-center justify-center px-1">
                <v-card-text class="text-subtitle-1 font-weight-bold py-0">
                  Book {{ item.name }}
                </v-card-text>
                <v-card-actions class="justify-end">
                  <v-btn
                    icon
                    @click="showBookingModal = false"
                    class="bg-grey-lighten-3 text-blue rounded-circle pa-0"
                  >
                    <x-icon />
                  </v-btn>
                </v-card-actions>
              </div>
              <v-card-text>
                <form @submit.prevent="submitBooking">
                  <v-text-field
                    placeholder="Name"
                    v-model="booking.name"
                    outlined
                  />
                  <v-text-field
                    placeholder="Personen"
                    v-model="booking.people"
                    outlined
                  />
                  <v-text-field
                    placeholder="Datum und Uhrzeit"
                    v-model="booking.datetime"
                    type="datetime-local"
                    outlined
                  />
                  <v-card-actions class="justify-end">
                    <!-- TODO: add loading -->
                    <v-btn
                      color="info"
                      variant="flat"
                      size="large"
                      type="submit"
                      class="rounded-xl px-4"
                    >
                      buchen
                    </v-btn>
                  </v-card-actions>
                </form>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
      </v-dialog>
    </v-card>
  </v-hover>
</template>
