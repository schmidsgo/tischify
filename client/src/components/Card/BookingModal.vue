<script setup lang="ts">
import { computed, reactive, ref } from 'vue';
import { useAuthStore, useBookingStore } from '../../stores/state';
import type { ItemType } from '../../types/types';

const props = defineProps<{ item: ItemType; itemId: string }>();

const authStore = useAuthStore();
const bookingStore = useBookingStore();

const store = reactive({
  item: {} as ItemType
});

const item = computed(() => {
  if (props.item.restaurant_id === props.itemId)
    return { ...props.item, restaurant_id: props.itemId };
  return null;
});

// watch(restaurant_id, id => {
//   if (id) {
//     bookingStore.closeModal();
//   }
// });

const name = authStore.user.name !== '' ? authStore.user.name : ref('');
const email = ref('');
const people = ref(0);
const datetime = ref('');

const book = async () => {
  await bookingStore.submitBooking({
    restaurant_id: store.item.restaurant_id,
    name: name.value,
    email: email.value,
    people: people.value,
    datetime: datetime.value
  });
};
</script>

<template>
  <v-dialog
    v-model="bookingStore.showBookingModal"
    width="70%"
    scrim="grey-darken-4"
  >
    <v-card class="pa-5">
      <v-row>
        <v-col cols="6" justify="start" class="bg-yellow">
          <v-card-image>
            <v-img
              :src="`${item.category}.jpeg`"
              width="100%"
              class="bg-grey-lighten-1 rounded-lg"
            />
          </v-card-image>
          <v-card-title class="text-lg font-weight-bold mt-4 mb-2 pa-0">
            {{ item.name }}
            <v-divider thickness="2" class="border-opacity-75 mt-1 w-50" />
          </v-card-title>
          <v-card-text class="text-lg mt-2 pa-0">
            {{ item.address }}, {{ item.city }}
          </v-card-text>
          <div class="d-flex align-center justify-start w-50 mt-2">
            <v-card-text class="text-lg pa-0">
              {{ item.opening_hours }}
            </v-card-text>
            <v-card-text class="text-lg text-blue-darken-2 pa-0">
              <v-icon icon="mdi-phone" size="small" class="mr-2" />{{
                item.phone_number
              }}
            </v-card-text>
          </div>
        </v-col>
        <v-col cols="6">
          <div class="d-flex align-center justify-center px-1">
            <v-card-text class="text-subtitle-1 font-weight-bold py-0">
              Book {{ item.name }}
            </v-card-text>
            <v-card-actions class="justify-end">
              <!-- FIXME -->
              <v-btn
                icon="mdi-close"
                @click="bookingStore.closeModal"
                class="bg-grey-lighten-3 text-blue rounded-circle pa-0"
              />
            </v-card-actions>
          </div>
          <v-card-text>
            <form @submit.prevent="book">
              <v-text-field
                placeholder="Name"
                v-model="bookingStore.booking.name"
                outlined
                type="text"
                required
              />
              <v-text-field
                placeholder="Email"
                v-model="bookingStore.booking.email"
                outlined
                type="email"
                required
              />
              <v-text-field
                placeholder="Personen"
                v-model="bookingStore.booking.people"
                outlined
                type="number"
                required
              />
              <v-text-field
                placeholder="Datum und Uhrzeit"
                v-model="bookingStore.booking.datetime"
                type="datetime-local"
                outlined
                required
              />
              <p v-if="authStore.isError" class="text-red ml-4">Error!</p>
              <v-card-actions class="justify-end">
                <v-btn
                  v-if="!authStore.isLoading"
                  color="info"
                  variant="flat"
                  size="large"
                  type="submit"
                  class="rounded-xl px-4"
                >
                  buchen
                </v-btn>
                <v-btn
                  v-else-if="authStore.isLoading"
                  color="Blue"
                  variant="flat"
                  class="p-2"
                  disabled
                >
                  <v-progress-circular color="Blue" size="25" indeterminate />
                </v-btn>
              </v-card-actions>
            </form>
          </v-card-text>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>
