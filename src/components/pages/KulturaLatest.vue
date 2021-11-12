<template>
  <div class="bg-pattern">
    <SecondaryHeader />
    <div class="container mb-5">
      <div v-if="infos && infos[0]" class="mt-5">
        <router-link
          :to="'/details/' + infos[0].Nid"
          class="text-decoration-none h2 display-2 text-light"
          >{{ infos[0].Naslov }}</router-link
        >
        <div class="row">
          <router-link :to="'/details/' + infos[0].Nid">
            <img
              :src="infos[0]['Vodeca slika']"
              class="w-100 img-fluid mt-3"
              alt="No Image Avaliable"
            />
          </router-link>
          <div class="row">
            <p class="lead text-light mt-4 indented">{{ desc }}</p>
          </div>
        </div>
      </div>
      <ul class="list-unstyled mt-5">
        <CategoryItem
          data-aos="fade-left"
          v-for="info in infos"
          :key="info.Nid"
          :index="info.Nid"
          :title="info.Naslov"
          :fullDesc="info['Sadrzaj članka']"
          :image="info['Vodeca slika']"
          :date="info['Post date']"
        />
      </ul>
      <router-link
        to="/kategorija/kultura/sve"
        class="
          lead
          mb-5
          text-decoration-none text-light
          bg-danger
          rounded-2
          p-3
          pt-3
        "
        >Ostale vesti</router-link
      >
    </div>
    <TheFooter />
  </div>
</template>

<script>
import SecondaryHeader from "../UI/SecondaryHeader.vue";
import TheFooter from "../UI/TheFooter.vue";
import shortenDesc from "../hooks/shortenDesc.js";
import CategoryItem from "../categories/CategoryItem.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import AOS from "aos";
import "aos/dist/aos.js";

export default {
  components: {
    SecondaryHeader,
    CategoryItem,
    TheFooter,
  },
  setup() {
    const store = useStore();
    const infos = computed(() => {
      return store.getters.getCultures[0];
    });

    const desc = computed(() => {
      return shortenDesc(infos.value[0]["Sadrzaj članka"], 150);
    });

    onMounted(async function () {
      store.dispatch("Reset");
      await store.dispatch("setCultures");
    });

    return {
      infos,
      desc,
    };
  },
  created() {
    AOS.init();
  }
};
</script>