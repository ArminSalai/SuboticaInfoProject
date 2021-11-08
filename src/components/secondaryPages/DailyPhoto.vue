<template>
  <SecondaryHeader />
  <div class="container">
    <h1 class="mt-5 mb-3">Daily Photo</h1>
    <div class="row d-flex flex-row">
      <ul class="p-0 mt-5 list-unstyled">
        <PhotoItem
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
import SecondaryHeader from "../UI/SecondaryHeader.vue";
import PhotoItem from "../results/PhotoItem.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { gsap } from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

export default {
  components: {
    SecondaryHeader,
    PhotoItem,
  },
  setup() {
    gsap.registerPlugin(ScrollToPlugin);
    const store = useStore();
    const page = ref(0);
    const wait = ref(false);
    const articles = computed(() => {
      return store.getters.getDaily;
    });

    async function load() {
      let scrollTop = window.scrollY;
      let docHeight = document.body.offsetHeight;
      let winHeight = window.innerHeight;
      let scrollPercent = scrollTop / (docHeight - winHeight);
      if (scrollPercent > 0.9 && !wait.value) {
        page.value++;
        wait.value = true;
        await store.dispatch("loadDailyItems", page.value);
        wait.value = false;
      }
    }

    onBeforeUnmount(() => {
      window.removeEventListener("scroll", load);
    });

    onMounted(async function () {
      window.addEventListener("scroll", load);
      store.dispatch("Reset");
      await store.dispatch("loadDailyItems", page.value);
    });

    return {
      articles,
      load,
    };
  },
};
</script>