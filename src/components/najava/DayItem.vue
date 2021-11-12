<template>
  <li class="mt-3">
    <h3 class="bg-dark pt-3 pb-3 text-light ps-4 mb-4">{{ dateStart }}</h3>
    <router-link :to="'/najava/details/' + index" class="text-decoration-none text-light h2 py-4">{{ title }}</router-link><br/>
    <router-link :to="'/najava/details/' + index"><img :src="image" alt="No Image Available" class="listImg my-3" /></router-link>
    <p class="text-secondary fw-bolder mb-0">Mesto odžavanja</p>
    <p class="text-light mb-0"><b>{{ loc }}</b></p>
    <p class="text-secondary fw-bolder mb-0">Održava se u:</p>
    <p class="text-light fs-4 my-2">{{ dateStart }}</p>
    <p class="text-light mb-0" v-if="dateEnd !== ''">Traje do:</p>
    <p class="text-light mb-0">{{ dateEnd }}</p>
  </li>
</template>

<script>
export default {
  props: ["title", "index", "image", "loc", "dateStart", "dateEnd"],
};
</script>