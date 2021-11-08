<template>
  <div>
    <SecondaryHeader />
    <div class="container mt-5">
      <h1>Najava Događaja</h1>
      <u class="list-unstyled text-decoration-none">
        <DayItem
          v-for="movie in moives"
          :key="movie.Nid"
          :title="movie.Naslov"
          :index="movie.Nid"
          :image="movie['Vodeca slika']"
          :loc="movie['Mesto odrzavanja']"
          :dateStart="movie['Pocetak dogadjaja']"
          :dateEnd="movie['Kraj dogadjaja']"
        />
      </u>
    </div>
    <TheFooter />
  </div>
</template>

<script>
import SecondaryHeader from "../UI/SecondaryHeader.vue";
import TheFooter from "../UI/TheFooter.vue";
import DayItem from "../najava/DayItem.vue";
import { useStore } from "vuex";
import { onMounted, computed } from "vue";

export default {
  components: {
    SecondaryHeader,
    DayItem,
    TheFooter,
  },
  setup() {
    const store = useStore();
    const moives = computed(() => {
      return store.getters.getNajava[0];
    });

    onMounted(async function () {
      store.dispatch("Reset");
      await store.dispatch("setNajava");
    });
    return {
      moives,
    };
  },
};
</script>