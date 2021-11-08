<template>
  <div>
    <SecondaryHeader class="mb-5" />
    <div class="container-fluid w-75">
      <h1>{{ title }}</h1>
      <p class="lead indented mt-5">
        {{ desc }}
      </p>
      <img :src="image" class="img-fluid w-50 m-auto" alt="No Image Provided" />
      <br />
      <p class="mt-3"><b>Tagovi: </b> {{ tagovi }}</p>
    </div>
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
      await store.dispatch("setDailyDetails", route.params.Nid);
    }

    const article = computed(() => {
      return store.getters.getDaily[0];
    });

    const title = computed(() => { if(article.value == undefined) return null; else return article.value.Naslov ;});
    const desc = computed(() => { if(article.value == undefined) return null; else return article.value["Sadrzaj clanka"];});
    const image = computed(() => { if(article.value == undefined) return null; else return article.value["Vodeca slika"];});
    const tagovi = computed(() => { if(article.value == undefined) return null; else return article.value.Tagovi;});

    onBeforeMount(async function () {
      await getArticle();
    });

    return {
      title,
      desc,
      image,
      tagovi,
    };
  },
};
</script>