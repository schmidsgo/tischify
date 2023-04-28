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
          <h1 class="text-h3 text-white font-weight-bold">
            Jetzt einen Tisch buchen
          </h1>
        </v-col>
        <v-col cols="7">
          <div class="d-flex align-start justify-end w-100">
            <v-text-field
              clearable
              placeholder="e.g. Augsburg"
              compact
              variant="solo"
              density="compact"
            />
            <v-text-field
              clearable
              placeholder="e.g. ) Restaurant, Café, Bar"
              compact
              variant="solo"
              density="compact"
              class="mx-2"
            />
            <v-btn color="blue" class="ml-2">Suchen</v-btn>
          </div>
        </v-col>
      </v-row>

      <!-- <div class="d-flex align-center">
      <v-label for="sort-by" class="mr-2">Sort By:</v-label>
      <v-select v-model="sortBy" :items="sortOptions" outlined />
    </div> -->
    </v-img>
  </div>
</template>

<script>
export default {};
</script>
