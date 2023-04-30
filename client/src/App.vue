<template>
  <div class="bg-grey-lighten-5">
    <Navbar />
    <Searchbar v-model="searchQuery" @search="handleSearch" />
    <v-layout>
      <v-main>
        <!-- FIXME: -->
        <!-- <SearchResult
          :items="filteredItems"
          :searchQuery="searchQuery"
          :searchType="searchType"
        /> -->
        <v-container
          v-if="searchQuery"
          class="d-flex justify-center align-center mt-8 px-0"
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
              <v-divider
                color="info"
                thickness="3"
                class="border-opacity-75 my-4"
              />
            </v-col>
            <v-col cols="3" v-for="item in filteredItems" :key="item.id">
              <CardItem :item="item" />
            </v-col>
          </v-row>
        </v-container>

        <v-container class="d-flex justify-center align-center">
          <v-row>
            <h2
              class="text-h4 text-grey-darken-3 font-weight-bold mt-8 bg-Blue"
            >
              Empfehlungen
            </h2>
            <v-divider
              color="info"
              thickness="3"
              class="border-opacity-75 my-4"
            />
            <v-row>
              <v-col cols="3" v-for="item in fourRests" :key="item.id">
                <CardItem :item="item" />
              </v-col>
            </v-row>
          </v-row>
        </v-container>

        <v-container class="d-flex justify-center align-center mt-8">
          <v-row>
            <h2
              class="text-h4 text-grey-darken-3 font-weight-bold pb-2 mt-4 text-Blue"
            >
              Im Trend
            </h2>
            <v-divider
              color="info"
              thickness="3"
              class="border-opacity-75 my-4"
            />
            <v-row>
              <v-col cols="3" v-for="item in fourCafes" :key="item.id">
                <CardItem :item="item" />
              </v-col>
            </v-row>
          </v-row>
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Searchbar from '@/components/Searchbar.vue';
import Navbar from '@/components/Navbar.vue';
import CardItem from '@/components/Card/CardItem.vue';
import SearchResult from '@/components/SearchResult.vue';
import dummy_data from '../dummy_data.json';
import { useRestaurantStore } from '@/stores/state.ts';

export default {
  data() {
    return {
      items: dummy_data,
      searchQuery: '',
      searchType: 'name'
    };
  },
  components: {
    Navbar,
    Searchbar,
    CardItem,
    SearchResult
  },
  methods: {
    handleSearch(query: string, type: string) {
      this.searchQuery = query;
      this.searchType = type;
    }
  },
  created() {
    useRestaurantStore().fetchRestaurants();
  },
  computed: {
    restaurants() {
      return useRestaurantStore().restaurants;
    },
    filteredItems() {
      // TODO: should render any type of search
      let items = this.items;
      if (this.searchQuery) {
        switch (this.searchType) {
          case 'name':
            const searchQuery = this.searchQuery || '';
            items = items.filter(item =>
              item.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            break;
          case 'location':
            items = items.filter(item =>
              item.location.toLowerCase().includes(searchQuery.toLowerCase())
            );
            break;
          case 'category':
            items = items.filter(item =>
              item.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
            break;
          default:
            items = [];
            break;
        }
      }
      return items;
    },
    fourRests() {
      return this.items
        .filter(item => item.location === 'Augsburg')
        .slice(0, 4);
    },
    fourCafes() {
      return this.items
        .filter(item => item.capacity['18:00'] === '\u25b3')
        .slice(0, 4);
    }
  }
};
</script>
