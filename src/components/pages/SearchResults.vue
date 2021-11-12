<template>
  <div class="bg-pattern">
    <SecondaryHeader />
    <div class="container">
      <h1 class="mt-5 mb-3 display-2 text-light">Search Results:</h1>
      <div class="row d-flex flex-row">
        <label for="search" class="mb-2 text-light">Search terms: </label>
        <div class="col-5">
          <form @submit.prevent="search" class="d-flex">
            <input
              class="form-control me-2 pb-1"
              type="search"
              v-model="searchTerm"
              aria-label="Search"
              id="search"
            />
            <button class="btn btn-outline-danger pb-1" type="submit">
              Search
            </button>
          </form>
        </div>
        <h3 v-if="articles.length == 0" class="mt-4">No Results Found</h3>
        <ul v-else class="p-0 mt-5 list-unstyled">
          <ResultItem
            data-aos="fade-up"
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
    <TheFooter />
  </div>
</template>

<script>
import SecondaryHeader from "../UI/SecondaryHeader.vue";
import TheFooter from "../UI/TheFooter.vue";
import ResultItem from "../results/ResultItem.vue";
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";
import AOS from "aos";
import "aos/dist/aos.js";

export default {
  components: {
    SecondaryHeader,
    ResultItem,
    TheFooter,
  },
  setup() {
    const store = useStore();

    const searchTerm = ref(store.getters.getTerm);
    async function search() {
      await store.dispatch("setTerm", searchTerm.value);
      getResults();
    }

    const articles = computed(() => {
      return store.getters.getArticles;
    });

    onMounted(async function () {
      store.dispatch("Reset");
      await search();
    });

    function getResults() {
      store.dispatch("search", searchTerm);
    }
    return {
      searchTerm,
      search,
      articles,
    };
  },
  created() {
    AOS.init();
  }
};
</script>