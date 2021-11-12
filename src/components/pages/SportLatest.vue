<template>
  <div class="bg-pattern">
    <SecondaryHeader />
    <div class="container mb-5">
      <div v-if="sports[0]" class="my-5">
        <router-link
          :to="'/details/' + sports[0].Nid"
          class="text-decoration-none display-3 text-light"
          >{{ sports[0].Naslov }}</router-link
        >
        <div class="row mt-4">
          <router-link :to="'/details/' + sports[0].Nid">
            <img
              :src="sports[0]['Vodeca slika']"
              class="w-100 img-fluid"
              alt="No Image Avaliable"
            />
          </router-link>
          <div class="row mt-3">
            <p class="lead indented text-light">{{ desc }}</p>
          </div>
        </div>
      </div>
      <ul class="list-unstyled p-0 mt-5">
        <CategoryItem
          v-for="sport in sports"
          :key="sport.Nid"
          :index="sport.Nid"
          :title="sport.Naslov"
          :fullDesc="sport['Sadrzaj clanka']"
          :image="sport['Vodeca slika']"
          :date="sport['Post date']"
        />
      </ul>
      <router-link
        to="/kategorija/sport/sve"
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

export default {
  components: {
    SecondaryHeader,
    CategoryItem,
    TheFooter,
  },
  setup() {
    const store = useStore();
    const sports = computed(() => {
      return store.getters.getSports;
    });

    const desc = computed(() => {
      return shortenDesc(sports.value[0]["Sadrzaj clanka"], 150);
    });

    onMounted(async function () {
      store.dispatch("Reset");
      await store.dispatch("setSport");
    });

    return {
      sports,
      desc,
    };
  },
};
</script>