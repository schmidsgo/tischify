<!-- FIXME: -->
<!-- <script setup lang="ts">
const query = '';
const sortBy = 'name'; //FIXME:

const emit = defineEmits(['search']);

const submitSearch = () => {
  emit('search', { query, sortBy });
};
</script> -->

<script lang="ts">
export default {
  data() {
    return {
      query: '',
      sortBy: 'name'
    };
  },
  methods: {
    submitSearch() {
      this.$emit('search', this.query, this.sortBy);
      console.log(this.query, this.sortBy);
    }
  }
};
</script>

<template>
  <div>
    <v-img
      src="bar1.jpeg"
      gradient="to bottom, rgba(0,0,0,.5), rgba(0,0,0,.5)"
      height="50vh"
      cover
      class="align-center"
    >
      <v-row justify="center">
        <v-col cols="7">
          <h1 class="text-h3 text-center text-white font-weight-bold">
            Jetzt einen Tisch buchen
          </h1>
        </v-col>
        <v-col cols="7">
          <v-form @submit.prevent>
            <div class="d-flex align-start justify-end w-75 mx-auto">
              <v-text-field
                clearable
                placeholder="e.g. Restaurant1, Augsburg, Cafe"
                compact
                variant="solo"
                density="compact"
                v-model="query"
              />
              <v-btn
                type="submit"
                color="blue"
                height="40px"
                class="ml-2"
                @click="submitSearch"
              >
                Suchen
              </v-btn>
            </div>
          </v-form>
        </v-col>
      </v-row>
    </v-img>
  </div>
</template>
