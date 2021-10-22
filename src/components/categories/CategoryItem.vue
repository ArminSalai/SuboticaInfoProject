<template>
  <li class="p-1 my-5">
    <div class="row">
      <div class="col-4">
        <router-link :to="'/details/' + index"><img :src="image" class="w-100 rounded-2" alt="No Image Provided" /></router-link>
      </div>
      <div class="col-6 d-flex flex-column">
        <h3><router-link :to="'/details/' + index" class="text-decoration-none text-dark">{{ title }}</router-link></h3>
        <p class="flex-wrap indented mb-1">{{ desc }}</p>
        <p class="ms-auto mb-0 text-secondary"><small>{{ date }}</small></p>
      </div>
    </div>
  </li>
</template>

<script>
import shortenDesc from "../hooks/shortenDesc.js";

export default {
  props: ["index", "title", "fullDesc", "image", "date"],
  setup(props) {
    const desc = shortenDesc(props.fullDesc, 400);

    return {
      desc,
    };
  },
};
</script>