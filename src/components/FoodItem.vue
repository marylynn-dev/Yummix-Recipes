<template>
  <v-card class="mx-auto my-12" max-width="350" max-height="400" flat>
    <v-img
      :src="hit.image"
      :width="300"
      :height="250"
      :alt="hit.title"
      :lazy-src="hit.title"
      cover
    ></v-img>
    <div class="title my-3">{{ hit.title }}</div>
    <div
      style="
        font-weight: 600;
        font-size: 18px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      "
    >
      {{ hit._id.split("_").join(" ") }}
    </div>
    <v-card-text>
      <v-row align="center" class="mr-13 mt-2">
        <v-rating
          :model-value="4.5"
          color="primary"
          density="compact"
          half-increments
          readonly
          size="small"
        ></v-rating>

        <div class="text-grey ms-4">2,675 Ratings</div>
        <div><v-icon color="primary">mdi-heart</v-icon></div>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script setup>
//props
defineProps({
  hit: Object,
});
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 12px;
  color: grey;
}
</style>
