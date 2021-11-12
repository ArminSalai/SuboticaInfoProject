<template>
  <div v-if="panoramica" class="container-flex overflow-hidden">
    <div class="position-relative">
      <img :src="pic" class="panorama" alt="No Image Available" />
      <p class="h4 footer-title pt-2 pb-2 px-5 text-dark d-md-block d-none">
        {{ title }}
      </p>
    </div>
    <div class="py-3">
      <p class="lead text-center text-light mb-1 mt-3">
        This page is a replicated version of
        <a href="https://www.subotica.info/" class="text-light"
          >https://www.subotica.info/</a
        >.
      </p>
      <p class="lead text-center text-light">
        This site was created by Armin Salai
      </p>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, onMounted } from "vue";

export default {
  setup() {
    const store = useStore();
    const panoramica = computed(() => {
      return store.getters.getPanoramica;
    });

    const pic = computed(() => {
      return panoramica.value["Panoramska slika"];
    });

    const title = computed(() => {
      return panoramica.value.Naslov;
    });

    onMounted(async function () {
      await store.dispatch("setPanoramica");
    });

    return {
      pic,
      title,
      panoramica,
    };
  },
};
</script>

<style scoped>
  .panorama {
    height: 400px;
    width: 100%;
    object-fit: cover;
  }
</style>