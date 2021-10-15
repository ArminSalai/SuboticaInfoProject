<template>
  <TheHeader />
  <div class="container">
    <div v-if="infos[0]" class="mt-5">
      <router-link
        :to="'/details/' + infos[0].Nid"
        class="text-decoration-none h2 text-dark"
        >{{ infos[0].Naslov }}</router-link
      >
      <div class="row">
        <img
          :src="infos[0]['Vodeca slika']"
          class="w-100 img-fluid"
          alt="No Image Avaliable"
        />
        <div class="row">
          <p class="lead indented">{{ desc }}</p>
        </div>
      </div>
    </div>
    <ul class="list-unstyled mt-5">
      <CategoryItem
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
      class="lead mb-5 text-decoration-none text-dark"
      >Ostale vesti</router-link
    >
  </div>
</template>

<script>
import TheHeader from "../UI/TheHeader.vue";
import shortenDesc from "../hooks/shortenDesc.js";
import CategoryItem from "../categories/CategoryItem.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

export default {
  components: {
    TheHeader,
    CategoryItem,
  },
  setup() {
    const store = useStore();
    const infos = computed(() => {
      return store.getters.getAdditionals;
    });

    const desc = computed(() => {
      console.log(infos.value[0]);
      return shortenDesc(infos.value[0]["Sadrzaj članka"], 150);
    });

    onMounted(async function () {
      store.dispatch("Reset");
      await store.dispatch("setCategory", {
        category: "kultura",
      });
    });

    return {
      infos,
      desc,
    };
  },
};
</script>