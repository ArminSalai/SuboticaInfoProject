<template>
	<div class="bg-pattern">
		<TheHeader />
		<div class="container">
			<section class="row my-5">
				<CarouselMain
					class="ms-0 col-lg-8 col-12 order-lg-first order-last"
					:latest-articles="latestArticles"
					:current="current"
				/>
				<div
					class="mt-4 mb-3 py-3 mb-0 ps-4 col-lg-4 overflow-hidden text-light"
				>
					<h1>Aktuelno</h1>
					<p class="indented">{{ aktuelno }}</p>
				</div>
			</section>
		</div>
		<div class="space"></div>
		<section class="bg-darker text-light">
			<div class="container">
        <div class="space"></div>
				<div v-if="loadedZajednica" class="row justify-content-center">
					<router-link to="/kategorija/zajednica/sve" class="col-lg-5 col-12 text-light text-decoration-none"><h2 class="display-2 m-0 pt-5 text-lg-center text-left">Zajednica</h2></router-link>
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
				<hr class="my-5 mx-3 bg-light" />
				<div v-if="loadedSport" class="row justify-content-center">
					<router-link to="/sport" class="col-lg-5 col-12 text-light text-decoration-none"><h2 class="display-2 m-0 pt-5 text-lg-center text-left">Sport</h2></router-link>
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
				<hr class="my-5 mx-3 bg-light" />
				<div v-if="loadedKultura" class="row justify-content-center pb-5">
					<router-link to="/kultura" class="col-lg-5 col-12 text-light text-decoration-none"><h2 class="display-2 m-0 pt-5 text-lg-center text-left">Kultura</h2></router-link>
					<div class="col-lg-7 col-12 my-5 position-relative">
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
      <div class="space"></div>
		</section>
		<section>
			<div class="container py-5 my-3">
				<h2 class="display-2 mb-5 text-light">Ostale Kategorije</h2>
				<div class="row">
					<div class="col-lg-4 auto-border border-secondary p-4">
						<router-link
							class="text-decoration-none"
							to="/kategorija/privreda/sve"
						>
							<h5 class="text-info">Privreda</h5>
							<h4 class="text-light fw-lighter">{{ Privreda }}</h4>
						</router-link>
					</div>
					<div class="col-lg-4 auto-border border-secondary p-4">
						<router-link
							class="text-decoration-none"
							to="/kategorija/press/sve"
						>
							<h5 class="text-info">Press</h5>
							<h4 class="text-light fw-lighter">{{ Press }}</h4>
						</router-link>
					</div>
					<div class="col-lg-4 p-4">
						<router-link
							class="text-decoration-none"
							to="/kategorija/intervju/sve"
						>
							<h5 class="text-info">Intervju</h5>
							<h4 class="text-light fw-lighter">{{ Intervju }}</h4>
						</router-link>
					</div>
				</div>
			</div>
		</section>
		<TheFooter class="mt-5" />
	</div>
</template>

<script>
import TheHeader from "../UI/TheHeader.vue";
import TheFooter from "../UI/TheFooter.vue";
import shortenDesc from "../hooks/shortenDesc.js";
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
		const aktuelno = computed(() => {
			if (store.getters.getArticles[0] !== undefined)
				return shortenDesc(store.getters.getArticles[0]["Sadrzaj clanka"], 300);
			else return "";
		});

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
			} else return "";
		});

		const Privreda = computed(() => {
			if (store.getters.getPrivreda[0]) {
				return store.getters.getPrivreda[0].Naslov;
			} else return "";
		});

		const Press = computed(() => {
			if (store.getters.getPress[0]) {
				return store.getters.getPress[0].Naslov;
			} else return "";
		});

		const Intervju = computed(() => {
			if (store.getters.getIntervju[0]) {
				return store.getters.getIntervju[0].Naslov;
			} else return "";
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
			store.dispatch("loadPrivredaItems");
			store.dispatch("loadPressItems", { page: 0, category: "" });
			store.dispatch("loadIntervjuItems");
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
			aktuelno,
			Privreda,
			Press,
			Intervju,
		};
	},
};
</script>

<style scoped>
h1 {
	font: 700 4.5rem "Open Sans", sans-serif;
}

.bg-darker {
	background-color: #101418;
}

.auto-border {
	border-right: 2px solid white;
}

@media (max-width: 992px) {
	.auto-border {
		border: 0;
		border-bottom: 2px solid white;
	}
}

h2 {
	font-weight: 400;
	padding-bottom: 5px;
}

h4 {
	font: 600 2.5rem "Open Sans", sans-serif;
}
</style>