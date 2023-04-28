<template>
  <div>
    <Navbar />
    <Searchbar v-model="searchQuery" />
    <v-layout>
      <v-main>
        <v-container class="d-flex justify-center align-center">
          <v-row>
            <h2
              class="text-h4 text-grey-darken-3 font-weight-bold mt-4 bg-Blue"
            >
              Empfehlungen
            </h2>
            <v-divider
              color="info"
              thickness="3"
              class="border-opacity-75 my-4"
            />
            <v-row>
              <v-col v-for="item in fourRests" class="mr-2 p-4" :key="item.id">
                <CardItem :item="item" />
              </v-col>
            </v-row>
          </v-row>
        </v-container>

        <v-container class="d-flex justify-center align-center mt-10">
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
              <v-col v-for="item in fourCafes" class="mr-2 p-4" :key="item.id">
                <CardItem :item="item" />
              </v-col>
            </v-row>
          </v-row>
          <!-- <SearchResult /> -->
        </v-container>
      </v-main>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Searchbar from './components/Searchbar.vue';
import Navbar from './components/Navbar.vue';
import CardItem from './components/Card/CardItem.vue';
// import SearchResult from './components/SearchResult.vue';
import dummy_data from '../dummy_data.json';

export default {
  data() {
    return {
      items: dummy_data,
      searchQuery: ''
    };
  },
  components: {
    Navbar,
    Searchbar,
    CardItem
  },
  computed: {
    filteredLocations() {
      return this.items.filter(item => {
        return item.location
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
    },
    filteredCategories() {
      return this.items.filter(item => {
        return item.category
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase());
      });
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
