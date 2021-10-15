<template>
  <li>
    <h3 class="bg-dark pt-4 pb-3 text-light ps-4">{{ dateStart }}</h3>
    <h2>{{ title }}</h2>
    <img :src="image" alt="No Image Available" class="listImg" />
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
  props: ["title", "image", "loc", "dateStart", "dateEnd"],
};
</script>