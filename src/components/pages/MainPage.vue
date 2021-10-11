<template>
  <div>
    <TheHeader />
    <section>
      <CarouselMain :latest-articles="latestArticles" :current="current" />
    </section>
    <section class="bg-dark text-light mt-5">
      <div class="container">
        <p class="display-2 m-0 pt-5">Zajednica</p>
        <div class="row justify-content-center">
          <div class="col-7 mt-5 position-relative">
            <img
              class="w-100"
              :src="zajednica['Vodeca slika']"
              alt="Image Not Available"
            />
						<h3><router-link :to="'/details/' + zajednica.Nid" class="position-absolute text-light bottom-0 bg-news-title center-title px-3 py-2 mb-3">{{ zajednica.Naslov }}</router-link></h3>
          </div>
        </div>
        <p class="display-2 m-0 pt-5">Sport</p>
        <div class="row justify-content-center">
          <div class="col-7 mt-5 position-relative">
            <img
              class="w-100"
              :src="sport['Vodeca slika']"
              alt="Image Not Available"
            />
						<h3><router-link :to="'/details/' + sport.Nid" class="position-absolute text-light bottom-0 bg-news-title center-title px-3 py-2 mb-3">{{ sport.Naslov }}</router-link></h3>
          </div>
        </div>
				<p class="display-2 m-0 pt-5">Kultura</p>
        <div class="row justify-content-center">
          <div class="col-7 mt-5 position-relative">
            <img
              class="w-100"
              :src="kultura['Vodeca slika']"
              alt="Image Not Available"
            />
						<h3><router-link :to="'/details/' + kultura.Nid" class="position-absolute text-light bottom-0 bg-news-title center-title px-3 py-2 mb-3">{{ kultura.Naslov }}</router-link></h3>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import TheHeader from "../UI/TheHeader.vue";
import CarouselMain from "../carousel/CarouselMain.vue";
import { useStore } from "vuex";
import { ref, computed, onMounted } from "vue";

export default {
  components: {
    TheHeader,
    CarouselMain,
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
      await store.dispatch("setCategory", {
        category: "zajednica",
        isLatest: "latest",
      });
    }

    const zajednica = computed(() => {
      if (store.getters.getArticles[6]) {
        return store.getters.getArticles[6];
      } else return "null";
    });

    async function getSport() {
      await store.dispatch("setCategory", {
        category: "sport",
        isLatest: "latest",
      });
    }

    const sport = computed(() => {
      if (store.getters.getArticles[7]) {
        return store.getters.getArticles[7];
      } else return "null";
    });

		async function getKultura() {
      await store.dispatch("setCategory", {
        category: "kultura",
        isLatest: "latest",
      });
    }

    const kultura = computed(() => {
      if (store.getters.getArticles[8]) {
        return store.getters.getArticles[8];
      } else return "null";
    });

    onMounted(async function () {
      await getLatestArticles();
      current.value = latestArticles.value.find(
        (node) => node.Nid == Math.max(node.Nid)
      ).Nid;
			await getZajednica();
      await getSport();
			await getKultura();
    });

    return {
      current,
      latestArticles,
      sport,
			zajednica,
			kultura
    };
  },
};
</script>