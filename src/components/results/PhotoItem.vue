<template>
  <li class="p-3 my-3 w-25">
    <div class="d-flex fst-italic">
      <h6>
        <router-link
          :to="'/details/' + index"
          class="text-decoration-none text-secondary"
          >{{ title }}</router-link
        >
      </h6>
      <p class="mb-0 ms-2">- {{ date }}</p>
    </div>
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