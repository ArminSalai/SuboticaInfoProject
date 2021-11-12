<template>
  <div class="bg-pattern">
    <SecondaryHeader class="mb-5" />
    <div class="container">
      <h1 class="display-2 text-light">{{ title }}</h1>
      <p class="text-secondary my-4">{{ date }}</p>
      <img :src="image" class="img-fluid w-50 m-auto" alt="No Image Provided" />
      <br />
      <p class="lead indented text-light mt-5">
        {{ desc }}
      </p>
      <p class="mt-3 text-light"><b>Tagovi: </b> {{ tagovi }}</p>
      <p class="text-light"><b>Ličnosti: </b> {{ licnosti }}</p>
    </div>
    <div class="space"></div>
    <TheFooter />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onBeforeMount, computed } from "vue";
import SecondaryHeader from "../UI/SecondaryHeader.vue";
import TheFooter from "../UI/TheFooter.vue";

export default {
  components: {
    SecondaryHeader,
    TheFooter,
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    async function getArticle() {
      const page = localStorage.getItem('Page');
      await store.dispatch("setIntervjuDetails", { Nid: route.params.Nid, Page: page});
    }

    const article = computed(() => {
      return store.getters.getIntervju[0];
    });

    const title = computed(() => {
      if (article.value == undefined) return null;
      else return article.value.Naslov;
    });
    const date = computed(() => {
      if (article.value == undefined) return null;
      else return article.value['Post date'];
    });
    const desc = computed(() => {
      if (article.value == undefined) return null;
      else return article.value["Sadrzaj clanka"];
    });
    const image = computed(() => {
      if (article.value == undefined) return null;
      else return article.value["Vodeca slika"];
    });
    const tagovi = computed(() => {
      if (article.value == undefined) return null;
      else return article.value.Tagovi;
    });
    const licnosti = computed(() => {
      if (article.value == undefined) return null;
      else return article.value.Licnosti;
    });

    onBeforeMount(async function () {
      await getArticle();
    });

    return {
      title,
      date,
      desc,
      image,
      tagovi,
      licnosti
    };
  },
};
</script>