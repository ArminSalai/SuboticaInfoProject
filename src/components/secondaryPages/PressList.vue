<template>
  <SecondaryHeader />
  <div class="container">
    <h1 class="mt-5 mb-3">Press</h1>
    <div class="d-flex mt-2">
      <label class="lead">Kategorija:</label>
      <div class="dropdown ms-3">
        <button
          class="btn btn-light border-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          v-if="selectedCategory"
        >
          {{ selectedCategory }}
        </button>
        <button
          class="btn btn-light border-secondary dropdown-toggle"
          type="button"
          id="dropdownMenuButton1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
          v-else
        >
          -- Sve --
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
          <li>
            <router-link
              class="dropdown-item"
              @click="setCategory"
              :to="'/kategorija/press/sve'"
              >-- Sve --</router-link
            >
          </li>
          <li>
            <router-link
              class="dropdown-item"
              @click="setCategory"
              :to="'/kategorija/press/bluelight'"
              >Bluelight</router-link
            >
          </li>
          <li>
            <router-link
              class="dropdown-item"
              @click="setCategory"
              :to="'/kategorija/press/zajednica'"
              >Zajednica</router-link
            >
          </li>
          <li>
            <router-link
              class="dropdown-item"
              @click="setCategory"
              :to="'/kategorija/press/gradonacelnik'"
              >Gradonacelnik-</router-link
            >
          </li>
          <li>
            <router-link
              class="dropdown-item"
              @click="setCategory"
              :to="'/kategorija/press/kultura'"
              >Kultura</router-link
            >
          </li>
          <li>
            <router-link
              class="dropdown-item"
              @click="setCategory"
              :to="'/kategorija/press/pannon'"
              >Pannon</router-link
            >
          </li>
          <li>
            <router-link
              class="dropdown-item"
              @click="setCategory"
              :to="'/kategorija/press/press'"
              >Press</router-link
            >
          </li>
          <li>
            <router-link
              class="dropdown-item"
              @click="setCategory"
              :to="'/kategorija/press/privreda'"
              >Privreda</router-link
            >
          </li>
        </ul>
      </div>
    </div>
    <div class="row d-flex flex-row">
      <ul class="p-0 mt-5 list-unstyled">
        <PressItem
          v-for="article in articles"
          :key="article.Nid"
          :index="article.Nid"
          :title="article.Naslov"
          :fullDesc="article['Sadrzaj clanka']"
          :date="article['Post date']"
        />
      </ul>
    </div>
  </div>
</template>

<script>
import SecondaryHeader from "../UI/SecondaryHeader.vue";
import PressItem from "../results/PressItem.vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default {
  components: {
    SecondaryHeader,
    PressItem,
  },
  setup() {
    gsap.registerPlugin(ScrollToPlugin);
    const store = useStore();
    const route = useRoute();
    const page = ref(0);
    const wait = ref(false);
    const articles = computed(() => {
      return store.getters.getPress;
    });

    const selectedCategory = computed(() => {
      return route.params.category;
    });

    async function setCategory() {
      store.dispatch("Reset");
      await store.dispatch("loadPressItems", {
        page: page.value,
        category: selectedCategory,
      });
    }

    async function load() {
      let scrollTop = window.scrollY;
      let docHeight = document.body.offsetHeight;
      let winHeight = window.innerHeight;
      let scrollPercent = scrollTop / (docHeight - winHeight);
      if (scrollPercent > 0.9 && !wait.value) {
        page.value++;
        wait.value = true;
        await store.dispatch("loadPressItems", {
          page: page.value,
          category: selectedCategory,
        });
        wait.value = false;
      }
    }

    function ChangeFilter(current) {
      selectedCategory.value = current;
      store.dispatch("Reset");
    }

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", load);
    });

    onMounted(async function () {
      window.addEventListener("scroll", load);
      store.dispatch("Reset");
      await store.dispatch("loadPressItems", {
        page: page.value,
        category: selectedCategory,
      });
    });

    return {
      articles,
      load,
      ChangeFilter,
      selectedCategory,
      setCategory,
    };
  },
};
</script>