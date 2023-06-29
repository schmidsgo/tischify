<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue';
import axios from 'axios';
import 'vue3-carousel/dist/carousel.css';
import { Carousel, Pagination, Navigation, Slide } from 'vue3-carousel';
import type { ItemType } from './types/types';
import { useAuthStore, useBookingStore } from './stores/state';
import Navbar from './components/Navbar.vue';
import Searchbar from './components/Searchbar.vue';
import CardItem from './components/Card/CardItem.vue';
import LoginModal from './components/LoginModal.vue';
import Settings from './components/Settings.vue';

const authStore = useAuthStore();
// const bookStore = useBookingStore();

const state = reactive({
  restaurants: [] as ItemType[]
});
const searchQuery = ref('');
const searchType = ref('');

const isLoading = ref(true);

onMounted(async () => {
  isLoading.value = true;
  await axios.get('http://localhost:3000/restaurants').then(res => {
    state.restaurants = res.data;
    isLoading.value = false;
  });
});

const handleSearch = (query: string, type: string) => {
  searchQuery.value = query;
  searchType.value = type.toLowerCase();
};

const filteredItems = computed(() => {
  let items = state.restaurants;
  if (searchQuery.value) {
    switch (searchType.value) {
      case 'name':
        items = items.filter(item =>
          item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
        break;
      case 'city':
        items = items.filter(item =>
          item.city.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
        break;
      case 'category':
        items = items.filter(item =>
          item.category.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
        break;
      default:
        items = [];
        break;
    }
  }
  return items;
});

const fourRests = computed(() =>
  state.restaurants.filter(item => item.category === 'restaurant').slice(0, 10)
);

const fourCafes = computed(() =>
  state.restaurants
    .filter(item => item.opening_hours === '10:00-22:00')
    .slice(0, 4)
);

// const selectedItemId = ref<string | null>(null);
</script>

<template>
  <div class="bg-grey-lighten-5">
    <Navbar />
    <LoginModal />
    <v-window>
      <v-window-item v-if="authStore.user.role === 'restaurant'">
        <Settings />
      </v-window-item>

      <v-window-item v-else>
        <Searchbar v-model="searchQuery" @search="handleSearch" />
        <v-layout>
          <v-main class="sm:p-0 px-4">
            <v-container
              v-if="searchQuery"
              class="d-flex justify-center align-center mt-8 p-0"
            >
              <v-row>
                <v-col cols="12">
                  <div class="d-flex align-center">
                    <h2 class="text-h4 text-grey-darken-3 font-weight-bold">
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
                  <v-divider
                    color="info"
                    thickness="3"
                    class="border-opacity-75 my-4"
                  />
                </v-col>
                <v-row>
                  <v-col
                    cols="3"
                    v-for="item in filteredItems"
                    :key="item.restaurant_id"
                  >
                    <div v-if="isLoading">
                      <v-skeleton-loader
                        class="mx-auto border"
                        max-width="200"
                        height="300"
                        type="image, article"
                      />
                    </div>
                    <div v-else>
                      <CardItem :item="item" />
                    </div>
                  </v-col>
                </v-row>
              </v-row>
            </v-container>

            <v-container class="d-flex justify-center align-center">
              <v-row>
                <h2 class="text-h4 text-grey-darken-3 font-weight-bold mt-8">
                  Empfehlungen
                </h2>
                <v-divider
                  color="info"
                  thickness="3"
                  class="border-opacity-75 my-4"
                />
                <v-row>
                  <v-col sm:cols="3">
                    <Carousel
                      :itemsToShow="2.7"
                      :wrapAround="true"
                      :transition="600"
                    >
                      <Slide
                        v-for="item in fourRests"
                        :key="item.restaurant_id"
                      >
                        <div class="carousel__item">
                          <div v-if="isLoading">
                            <v-skeleton-loader
                              class="mx-auto border"
                              max-width="200"
                              height="300"
                              type="image, article"
                            />
                          </div>
                          <div v-else>
                            <CardItem :item="item" />
                          </div>
                        </div>
                      </Slide>
                      <template #addons>
                        <Navigation />
                        <Pagination />
                      </template>
                    </Carousel>
                  </v-col>
                </v-row>
              </v-row>
            </v-container>

            <v-container class="d-flex justify-center align-center my-8">
              <v-row>
                <h2
                  class="text-h4 text-grey-darken-3 font-weight-bold pb-2 mt-4"
                >
                  Im Trend
                </h2>
                <v-divider
                  color="info"
                  thickness="3"
                  class="border-opacity-75 my-4"
                />
                <v-row>
                  <v-col sm:cols="3">
                    <Carousel
                      :itemsToShow="2.8"
                      :wrapAround="true"
                      :transition="600"
                    >
                      <Slide
                        v-for="item in fourCafes"
                        :key="item.restaurant_id"
                      >
                        <div v-if="isLoading">
                          <v-skeleton-loader
                            class="mx-auto border"
                            max-width="200"
                            height="300"
                            type="image, article"
                          />
                        </div>
                        <div class="carousel__item">
                          <CardItem :item="item" />
                        </div>
                      </Slide>
                      <template #addons>
                        <Navigation />
                        <Pagination />
                      </template>
                    </Carousel>
                  </v-col>
                </v-row>
              </v-row>
            </v-container>
          </v-main>
        </v-layout>
      </v-window-item>
    </v-window>
  </div>
</template>

<style scoped>
.carousel__track {
  transform-style: preserve-3d;
}

.carousel__slide--sliding {
  transition: 0.5s;
}

.carousel__slide {
  opacity: 0.7;
  transform: rotateY(-20deg) scale(1);
  margin: 1.5rem 0;
}

.carousel__slide--active ~ .carousel__slide {
  transform: rotateY(20deg) scale(1);
}

.carousel__slide--prev {
  opacity: 0.85;
  transform: rotateY(-10deg) scale(1);
}

.carousel__slide--next {
  opacity: 0.85;
  transform: rotateY(10deg) scale(1);
}

.carousel__slide--active {
  opacity: 1;
  transform: rotateY(0) scale(1.1);
}
</style>
