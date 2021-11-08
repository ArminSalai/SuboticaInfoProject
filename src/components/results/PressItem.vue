<template>
  <li class="p-3 my-3 border-bottom border-secondary">
    <div class="row">
      <h3>
        <router-link
          :to="'/details/' + index"
          class="text-decoration-none text-dark"
          >{{ title }}</router-link
        >
      </h3>
      <p class="flex-fill indented">{{ desc }}</p>
      <p class="mb-0 text-secondary text-right ms-auto">{{ date }}</p>
    </div>
  </li>
</template>

<script>
import shortenDesc from "../hooks/shortenDesc.js";

export default {
  props: ["index", "title", "fullDesc", "image", "date", "category"],
  setup(props) {
    const desc = shortenDesc(props.fullDesc, 400);

    return {
      desc,
    };
  },
};
</script>