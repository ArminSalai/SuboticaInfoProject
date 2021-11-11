<template>
  <div>
    <TheHeader />
    <div class="container">
      <section class="row">
        <h1 class="mt-4 mb-3 py-3 mb-0 ps-4 col-4">Aktuelno</h1>
        <CarouselMain
          class="ms-0 col-lg-8 col-12"
          :latest-articles="latestArticles"
          :current="current"
        />
      </section>
    </div>
    <section class="bg-dark text-light mt-5">
      <div class="container">
        <p class="display-2 m-0 pt-5">Zajednica</p>
        <div v-if="loadedZajednica" class="row justify-content-center">
          <div class="col-lg-7 col-12 mt-5 position-relative">
            <router-link :to="'/details/' + zajednica.Nid"
              ><img
                class="w-100"
                :src="zajednica['Vodeca slika']"
                alt="Image Not Available"
              />
            </router-link>
            <h3 class="d-md-block d-none">
              <router-link
                :to="'/details/' + zajednica.Nid"
                class="
                  position-absolute
                  text-light
                  bottom-0
                  bg-news-title
                  center-title
                  px-3
                  py-2
                  mb-3
                "
                >{{ zajednica.Naslov }}</router-link
              >
            </h3>
          </div>
        </div>
        <div
          v-else
          class="spinner-border text-danger d-flex mx-auto align-slef-center"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <hr class="mt-5 mx-3 bg-danger" />
        <p class="display-2 m-0 pt-5">Sport</p>
        <div v-if="loadedSport" class="row justify-content-center">
          <div class="col-lg-7 col-12 mt-5 position-relative">
            <router-link :to="'/details/' + sport.Nid">
              <img
                class="w-100"
                :src="sport['Vodeca slika']"
                alt="Image Not Available"
              />
            </router-link>
            <h3 class="d-md-block d-none">
              <router-link
                :to="'/details/' + sport.Nid"
                class="
                  position-absolute
                  text-light
                  bottom-0
                  bg-news-title
                  center-title
                  px-3
                  py-2
                  mb-3
                "
                >{{ sport.Naslov }}</router-link
              >
            </h3>
          </div>
        </div>
        <div
          v-else
          class="spinner-border text-danger d-flex mx-auto align-slef-center"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
        <hr class="mt-5 mx-3 bg-danger" />
        <p class="display-2 m-0 pt-5">Kultura</p>
        <div v-if="loadedKultura" class="row justify-content-center pb-5">
          <div class="col-lg-7 col-12 mt-5 position-relative">
            <router-link :to="'/details/' + kultura.Nid">
              <img
                class="w-100"
                :src="kultura['Vodeca slika']"
                alt="Image Not Available"
              />
            </router-link>
            <h3 class="d-md-block d-none">
              <router-link
                :to="'/details/' + kultura.Nid"
                class="
                  position-absolute
                  text-light
                  bottom-0
                  bg-news-title
                  center-title
                  px-3
                  py-2
                  mb-3
                "
                >{{ kultura.Naslov }}</router-link
              >
            </h3>
          </div>
        </div>
        <div
          v-else
          class="spinner-border text-danger d-flex mx-auto align-slef-center"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    </section>
    <TheFooter />
  </div>
</template>

<script>
import TheHeader from "../UI/TheHeader.vue";
import TheFooter from "../UI/TheFooter.vue";
import CarouselMain from "../carousel/CarouselMain.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

export default {
  components: {
    TheHeader,
    CarouselMain,
    TheFooter,
  },
  setup() {
    const store = useStore();
    const current = ref(0);
    async function getLatestArticles() {
      await store.dispatch("setLatest", "latest");
    }

    const latestArticles = computed(() => {
      return store.getters.getArticles;
    });

    async function getZajednica() {
      await store.dispatch("setZajednica", "latest");
    }

    const zajednica = computed(() => {
      if (store.getters.getZajednica[0]) {
        return store.getters.getZajednica[0];
      } else return "null";
    });

    async function getSport() {
      await store.dispatch("setSport", "latest");
    }

    const sport = computed(() => {
      if (store.getters.getSports[0]) {
        return store.getters.getSports[0];
      } else return "null";
    });

    async function getKultura() {
      await store.dispatch("setCultures", "latest");
    }

    const kultura = computed(() => {
      if (store.getters.getCultures[0]) {
        return store.getters.getCultures[0];
      } else return "null";
    });

    const loadedZajednica = ref(false);
    const loadedSport = ref(false);
    const loadedKultura = ref(false);

    onMounted(async function () {
      store.dispatch("Reset");
      await getLatestArticles();
      current.value = latestArticles.value.find(
        (node) => node.Nid == Math.max(node.Nid)
      ).Nid;
      await getZajednica();
      loadedZajednica.value = true;
      await getSport();
      loadedSport.value = true;
      await getKultura();
      loadedKultura.value = true;
    });

    return {
      current,
      latestArticles,
      sport,
      zajednica,
      kultura,
      loadedZajednica,
      loadedSport,
      loadedKultura,
    };
  },
};
</script>

<style scoped>
h1 {
  font: 700 4.5rem "Open Sans", sans-serif;
}

p {
  background-image: radial-gradient(
    circle farthest-corner at 10% 20%,
    rgba(249, 0, 0, 1) 0%,
    rgba(247, 87, 0, 1) 90%
  );
  background-size: cover;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding-bottom: 5px;
}
</style>