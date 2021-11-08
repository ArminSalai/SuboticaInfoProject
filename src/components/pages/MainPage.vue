<template>
  <div>
    <TheHeader />
    <section>
      <CarouselMain :latest-articles="latestArticles" :current="current" />
    </section>
    <section class="bg-dark text-light mt-5">
      <div class="container">
        <p class="display-2 m-0 pt-5">Zajednica</p>
        <div v-if="loadedZajednica" class="row justify-content-center">
          <div class="col-7 mt-5 position-relative">
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
        <div v-else class="spinner-border text-danger d-flex mx-auto align-slef-center" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <hr class="mt-5 mx-3" />
        <p class="display-2 m-0 pt-5">Sport</p>
        <div v-if="loadedSport" class="row justify-content-center">
          <div class="col-7 mt-5 position-relative">
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
        <div v-else class="spinner-border text-danger d-flex mx-auto align-slef-center" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
        <hr class="mt-5 mx-3" />
        <p class="display-2 m-0 pt-5">Kultura</p>
        <div v-if="loadedKultura" class="row justify-content-center pb-5">
          <div class="col-7 mt-5 position-relative">
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
        <div v-else class="spinner-border text-danger d-flex mx-auto align-slef-center" role="status">
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
      loadedKultura
    };
  },
};
</script>