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
      <v-card-subtitle class="text-blue pt-4">
        #{{ item.category }} <span class="text-grey">in</span> #{{
          item.location
        }}
      </v-card-subtitle>
      <v-card-text class="py-1">
        <v-icon color="" icon="mdi-dialpad" class="mr-2" />{{ item.telefon }}
      </v-card-text>
      <v-card-actions class="mb-2">
        <v-btn color="pink" variant="tonal">
          {{ item.capacity['18:00'] }} 18:00
        </v-btn>
        <v-btn color="pink" variant="tonal">
          {{ item.capacity['18:30'] }} 18:30
        </v-btn>
        <v-btn color="pink" variant="tonal">
          {{ item.capacity['19:00'] }} 19:00
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-hover>
</template>

<script lang="ts">
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
};
</script>
