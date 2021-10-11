<template>
  <div>
    <TheHeader />
    <section>
      <div class="container">
        <ul class="list-unstyled mt-5">
          <LatestItem
            v-for="latestItem in news"
            :key="latestItem.Nid"
            :index="latestItem.Nid"
            :title="latestItem.Naslov"
            :fullDesc="latestItem['Sadrzaj clanka']"
            :image="latestItem['Vodeca slika']"
            :date="latestItem['Post date']"
          />
        </ul>

        <div class="input-group mb-3">
          <button class="btn btn-outline-secondary" @click="prev" type="button">
            Prethodna
          </button>
          <button class="btn btn-outline-secondary" @click="next" type="button">
            Iduća
          </button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TheHeader from "../UI/TheHeader.vue";
import LatestItem from "../latest/LatestItem.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

export default {
  components: {
    TheHeader,
    LatestItem,
  },
  setup() {
    const store = useStore();

    const page = ref(0);

    const news = computed(() => {
      return store.getters.getArticles;
    });
    
    async function prev() {
      page.value--;
      await store.dispatch("setLatest", page);
    }

    async function next() {
      page.value++;
      await store.dispatch("setLatest", page);
    }

    async function getLatest(page) {
      await store.dispatch("setLatest", page);
    }

    onMounted(async function () {
      await getLatest(page.value);
    });

    return {
      news,
      prev,
      next,
    };
  },
};
</script>