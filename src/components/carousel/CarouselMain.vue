<template>
	<div class="container w-50">
		<h1 class="mt-5 py-3 mb-0 ps-4 bg-black text-light">Aktuelno</h1>
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
				<div class="carousel-inner">
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
				</div>
				<button
					class="carousel-control-prev"
					type="button"
					data-bs-target="#carouselExampleCaptions"
					data-bs-slide="prev"
				>
					<span class="carousel-control-prev-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Previous</span>
				</button>
				<button
					class="carousel-control-next"
					type="button"
					data-bs-target="#carouselExampleCaptions"
					data-bs-slide="next"
				>
					<span class="carousel-control-next-icon" aria-hidden="true"></span>
					<span class="visually-hidden">Next</span>
				</button>
			</div>
		</div>
	</div>
</template>
      

<script>
import CarouselItem from "../carousel/CarouselItem.vue";
export default {
  props: ['latest-articles', 'current'],
	components: {
		CarouselItem,
	}
};
</script>