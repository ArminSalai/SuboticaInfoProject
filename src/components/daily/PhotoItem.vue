<template>
  <li class="p-3 my-3 size-pic">
    <h6 class="fst-italic">
      <router-link
        :to="'/daily/details/' + index"
        @click="savePage"
        class="text-decoration-none text-secondary"
        >{{ title }}</router-link
      >
      - {{ date }}
    </h6>
    <router-link :to="'/daily/details/' + index" @click="savePage"
      ><img
        :src="image"
        class="w-100 rounded-2 listImg text-secondary"
        alt="No Image Provided"
    /></router-link>
  </li>
</template>

<script>
import { useStore } from 'vuex';

export default {
  props: ["index", "title", "image", "date"],
  setup(props) {
    const store = useStore();
    function savePage() {
      const page = store.getters.getPage.find(
        (el) => el.Nid == props.index
      ).Page;
      localStorage.setItem('Page', page);
    }
    return {
      savePage
    }
  }
};
</script>

<style scoped>
.size-pic {
  width: 25%;
  height: 25%;
}

@media (max-width: 1199.98px) {
  .size-pic {
    width: 33%;
    height: 33%;
  }
}

@media (max-width: 768px) {
  .size-pic {
    width: 50%;
    height: 50%;
  }
}

@media (max-width: 576px) {
  .size-pic {
    width: 100%;
    height: 100%;
  }
}
</style>