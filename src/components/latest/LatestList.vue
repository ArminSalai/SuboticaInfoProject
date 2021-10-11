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
        
      </div>
    </section>
  </div>
</template>

<script>
import TheHeader from "../UI/TheHeader.vue";
import LatestItem from "../latest/LatestItem.vue";
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

export default {
  components: {
    TheHeader,
    LatestItem,
  },
  setup() {
    const store = useStore();

    async function getLatest(page) {
      await store.dispatch("setLatest", page);
    }

    const news = computed(() => {
      return store.getters.getArticles;
    });

    onMounted(async function () {
      await getLatest(0);
    });

    return {
      news,
    };
  },
};
</script>