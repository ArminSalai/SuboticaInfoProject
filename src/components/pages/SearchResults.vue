<template>
  <div class="container">
    <TheHeader />
    <h1 class="mt-5 mb-3">Search Results:</h1>
    <div class="row d-flex flex-row">
      <label for="search">Search terms: </label>
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
import { useStore } from "vuex";
import { ref, onMounted, computed } from "vue";

export default {
  components: {
    TheHeader,
    ResultItem,
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
};
</script>