<template>
  <li class="border-bottom border-secondary p-3 py-5 my-3">
    <div class="row">
      <div class="col-lg-3 col-md-5 col-12">
        <router-link :to="'/intervju/details/' + index" @click="savePage"><img :src="image" class="w-100 rounded-2 listImg" alt="No Image Provided" /></router-link>
      </div>
      <div class="col-lg-7 col-md-7 col-12 d-flex flex-column mt-lg-0 mt-5">
        <h3><router-link :to="'/intervju/details/' + index" @click="savePage" class="text-decoration-none text-light">{{ title }}</router-link></h3>
        <p class="flex-fill text-secondary">{{ desc }}</p>
        <p class="mb-0 text-danger">{{ date }}</p>
      </div>
    </div>
  </li>
</template>

<script>
import shortenDesc from "../hooks/shortenDesc.js";
import { useStore } from 'vuex';

export default {
  props: ["index", "title", "fullDesc", "image", "date"],
  setup(props) {
    const desc = shortenDesc(props.fullDesc, 500);

    const store = useStore();
    function savePage() {
      const page = store.getters.getPage.find(
        (el) => el.Nid == props.index
      ).Page;
      localStorage.setItem('Page', page);
    }

    return {
      savePage,
      desc,
    };
  },
};
</script>