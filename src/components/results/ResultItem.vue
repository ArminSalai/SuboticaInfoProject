<template>
  <li class="border border-secondary rounded-3 p-3 my-3">
    <div class="row">
      <div class="col-md-3 col-5">
        <router-link :to="'/details/' + index"><img :src="image" class="w-100 rounded-2 listImg" alt="No Image Provided" /></router-link>
      </div>
      <div class="col-md-7 col-7 d-flex flex-column">
        <h3><router-link :to="'/details/' + index" class="text-decoration-none text-dark">{{ title }}</router-link></h3>
        <p class="flex-fill">{{ desc }}</p>
        <p class="mb-0 text-danger">{{ date }}</p>
      </div>
    </div>
  </li>
</template>

<script>
import shortenDesc from "../hooks/shortenDesc.js";

export default {
  props: ["index", "title", "fullDesc", "image", "date"],
  setup(props) {
    const desc = shortenDesc(props.fullDesc, 200);

    return {
      desc,
    };
  },
};
</script>