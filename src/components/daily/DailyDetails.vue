<template>
  <div class="bg-pattern">
    <SecondaryHeader class="mb-5" />
    <div class="container">
      <h1 class="display-2 text-light my-2">{{ title }}</h1>
      <p class="lead indented mt-5 text-light">
        {{ desc }}
      </p>
      <img :src="image" class="img-fluid w-50 m-auto" alt="No Image Provided" />
      <br />
      <p class="mt-3 text-light"><b>Tagovi: </b> {{ tagovi }}</p>
    </div>
    <div class="space"></div>
    <TheFooter />
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import { gsap } from 'gsap';
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

    function getArticle() {
      const page = localStorage.getItem('Page');
      store.dispatch('setDailyDetails', {
        Nid: route.params.Nid,
        Page: page,
      });
    }

    const article = computed(() => {
      return store.getters.getDaily[0];
    });

    const title = computed(() => {
      if (article.value == undefined) return null;
      else return article.value.Naslov;
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

    onMounted(async function () {
      await getArticle();
      gsap.from(".display-2", {
        delay: 0.2,
        filter: 'blur(10px)',
        duration: 0.5,
				scale: 4,
			});
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