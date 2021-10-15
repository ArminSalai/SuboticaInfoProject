<template>
  <TheHeader />
  <div class="container">
    <h1 class="mt-5 mb-3">{{ category.toUpperCase() }}</h1>
    <div class="row d-flex flex-row">
      <ul class="p-0 mt-5 list-unstyled">
        <ResultItem
          v-for="article in articles"
          :key="article.Nid"
          :index="article.Nid"
          :title="article.Naslov"
          :fullDesc="article['Sadrzaj clanka']"
          :image="article['Vodeca slika']"
          :date="article['Post date']"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import TheHeader from "../UI/TheHeader.vue";
import ResultItem from "../search/ResultItem.vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default {
  components: {
    TheHeader,
    ResultItem,
  },
  setup() {
    gsap.registerPlugin(ScrollToPlugin);
    const store = useStore();
    const route = useRoute();
    const category = route.params.Category;
    const page = ref(0);
    const wait = ref(false);
    const articles = computed(() => {
      return store.getters.getArticles;
    });

    async function load() {
      let scrollTop = window.scrollY;
      let docHeight = document.body.offsetHeight;
      let winHeight = window.innerHeight;
      let scrollPercent = scrollTop / (docHeight - winHeight);
      if (scrollPercent > 0.9 && !wait.value) {
        page.value++;
        wait.value = true;
        await store.dispatch("loadCategoryItems", {
          category: category,
          page: page.value,
        });
      wait.value = false;
      }
    }

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", load);
    });

    onMounted(async function () {
      window.addEventListener("scroll", load);
      store.dispatch("Reset");
      await store.dispatch("loadCategoryItems", {
        category: category,
        page: page.value,
      });
    });

    return {
      category,
      articles,
      load,
    };
  },
};
</script>