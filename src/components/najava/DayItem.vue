<template>
  <li class="">
    <h3 class="bg-dark pt-4 pb-3 text-light ps-4 mb-4">{{ dateStart }}</h3>
    <router-link :to="'/najava/details/' + index" class="text-decoration-none text-dark h2">{{ title }}</router-link><br/>
    <router-link :to="'/najava/details/' + index"><img :src="image" alt="No Image Available" class="listImg my-2" /></router-link>
    <p>Mesto odžavanja</p>
    <p><u>{{ loc }}</u></p>
    <p>Održava se u:</p>
    <p>{{ dateStart }}</p>
    <p v-if="dateEnd !== ''">Traje do:</p>
    <p>{{ dateEnd }}</p>
  </li>
</template>

<script>
export default {
  props: ["title", "index", "image", "loc", "dateStart", "dateEnd"],
};
</script>