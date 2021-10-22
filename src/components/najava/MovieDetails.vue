<template>
  <SecondaryHeader class="mb-5" />
  <div class="container-fluid w-75">
    <img :src="image" class="img-fluid w-25 m-auto" alt="No Image Provided" />
    <br />
    <span class="badge bg-danger text-light rounded-pill my-3"
      ><p class="m-0 pt-1 px-3">{{ category }}</p></span
    >
    <h1>{{ title }}</h1>
    <p class="text-dark">Početak Događaja: {{ date }}</p>
    <hr />
    <p class="lead indented">
      {{ desc }}
    </p>
    <p class="fw-bold mt-3">
      Mesto Održavanja: <span class="fw-light">{{ place }}</span>
    </p>
  </div>
  <TheFooter />
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { onMounted, computed } from "vue";
import SecondaryHeader from "../UI/SecondaryHeader.vue";
import TheFooter from "../UI/TheFooter.vue";

export default {
  components: {
    SecondaryHeader,
    TheFooter
  },
  setup() {
    const store = useStore();
    const route = useRoute();

    async function getArticle() {
      await store.dispatch("setNajavaDetails", route.params.Nid);
    }

    const article = computed(() => {
      return store.getters.getNajava[0];
    });

    const title = computed(() => article.value.Naslov);
    const category = computed(() => article.value["Vrsta dogadjaja"]);
    const desc = computed(() => article.value["Sadrzaj clanka"]);
    const image = computed(() => article.value["Vodeca slika"]);
    const date = computed(() => article.value["Pocetak dogadjaja"]);
    const tagovi = computed(() => article.value.Tagovi);
    const place = computed(() => article.value["Mesto odrzavanja"]);

    onMounted(async function () {
      await getArticle();
    });

    return {
      category,
      title,
      desc,
      image,
      date,
      tagovi,
      place
    };
  },
};
</script>