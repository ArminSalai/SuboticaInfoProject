<template>
  <li class="p-3 my-3 w-25">
      <h6 class="fst-italic">
        <router-link
          :to="'/details/' + index"
          class="text-decoration-none text-secondary"
          >{{ title }}</router-link
        > - {{ date }}
      </h6>
    <router-link :to="'/details/' + index"
      ><img
        :src="image"
        class="w-100 rounded-2 listImg text-secondary"
        alt="No Image Provided"
    /></router-link>
  </li>
</template>

<script>
export default {
  props: ["index", "title", "image", "date"],
};
</script>