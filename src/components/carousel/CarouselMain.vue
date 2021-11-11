<template>
  <div class="container mt-5">
    <div class="container-fluid p-0">
      <div
        id="carouselExampleCaptions"
        class="carousel slide"
        data-bs-ride="carousel"
      >
        <div class="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            class="active visually-hidden"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
            class="visually-hidden"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
            class="visually-hidden"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="3"
            aria-label="Slide 4"
            class="visually-hidden"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="4"
            aria-label="Slide 5"
            class="visually-hidden"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="5"
            aria-label="Slide 6"
            class="visually-hidden"
          ></button>
        </div>
        <div class="carousel-inner rounded-4">
          <CarouselItem
            v-for="article in latestArticles"
            :key="article.Nid"
            :index="article.Nid"
            :current="current"
            :titleLatest="article.Naslov"
            :descLatest="article['Sadrzaj clanka']"
            :imageLatest="article['Vodeca slika']"
            :dateLatest="article['Post date']"
          />
          <div
            v-if="latestArticles.length < 4"
            class="carousel-height bg-dark d-flex justify-content-center align-items-center"
          >
            <div
              class="
                spinner-border
                text-danger
                d-flex
                mx-auto
                align-slef-center
              "
              role="status"
            >
              <span class="visually-hidden">Loading...</span>
            </div>
          </div>
        </div>
        <button
          class="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <div
            class="
              bg-news-title
              rounded rounded-2
              h-25
              p-2
              d-flex
              justify-items-center
              align-items-center
            "
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </div>
        </button>
        <button
          class="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <div
            class="
              bg-news-title
              rounded rounded-2
              h-25
              p-2
              d-flex
              justify-items-center
              align-items-center
            "
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </div>
        </button>
      </div>
    </div>
  </div>
</template>
      

<script>
import CarouselItem from "../carousel/CarouselItem.vue";
export default {
  props: ["latest-articles", "current"],
  components: {
    CarouselItem,
  },
};
</script>

<style scoped>
  .rounded-4 {
    border-radius: 1rem;
  }
</style>