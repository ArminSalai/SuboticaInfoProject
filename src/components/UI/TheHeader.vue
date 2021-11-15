<template>
	<nav class="navbar navbar-expand-xl navbar-dark">
		<div class="container">
			<button
				class="navbar-toggler ms-auto"
				type="button"
				data-bs-toggle="collapse"
				data-bs-target="#navbarTogglerDemo01"
				aria-controls="navbarTogglerDemo01"
				aria-expanded="false"
				aria-label="Toggle navigation"
			>
				<span class="navbar-toggler-icon"></span>
			</button>
			<div class="collapse navbar-collapse" id="navbarTogglerDemo01">
				<router-link to="/main" class="navbar-brand"
					><img class="mt-3 mt-xl-0" src="../../assets/logo.png" width="200"
				/></router-link>
				<ul class="navbar-nav ms-xl-5 ms-0 me-3 mb-lg-0 my-3 my-xl-0 fw-light">
					<li class="nav-item">
						<router-link
							to="/latest"
							class="nav-link h5 pb-0 mb-0 text-light text-center"
							role="button"
							>Poslednje vesti</router-link
						>
					</li>
					<li class="nav-item">
						<router-link
							to="/sport"
							class="nav-link h5 pb-0 mb-0 text-light ms-xl-2 text-center"
							role="button"
							>Sport</router-link
						>
					</li>
					<li class="nav-item">
						<router-link
							to="/kultura"
							class="nav-link h5 pb-0 mb-0 text-light ms-xl-2 text-center"
							role="button"
							>Kultura</router-link
						>
					</li>
					<li class="nav-item">
						<router-link
							to="/najava"
							class="nav-link h5 pb-0 mb-0 text-light ms-xl-2 text-center"
							role="button"
							>Najava</router-link
						>
					</li>
					<li class="nav-item">
						<a
							class="
								nav-link
								disabled
								h5
								pb-0
								mb-0
								text-secondary
								ms-xl-2
								text-center
							"
							role="button"
							>Više vesti</a
						>
					</li>
				</ul>
				<div class="d-flex justify-content-start max-cont">
					<form @submit.prevent="search" class="px-0">
									<div class="d-flex w-50 mt-2 ms-xl-auto me-xl-4 ms-0">
										<div
											class="btn-group"
											role="group"
											aria-label="Basic example"
										>
											<input
												type="text"
												class="rounded-end rounded-pill form-control border-0"
												placeholder="Search"
												aria-label="Search"
												aria-describedby="button-addon2"
												v-model="searchTerm"
											/>
											<button
												class="
													rounded-start rounded-pill
													form-control
													border-0
													mx-auto
													w-25
													ps-0
													pe-3
													text-light
												"
												type="submit"
												id="button-addon2"
											>
												<i class="bi bi-search text-dark"></i>
											</button>
										</div>
									</div>
								</form>
				</div>
				<div
					v-if="!isLoggedIn"
					class="my-3 d-xl-flex d-inline justify-content-center"
				>
					<button class="btn btn-danger pb-1 mt-2" @click.prevent="login">
						Login
					</button>
					<button
						class="btn btn-danger mx-xl-2 ms-2 me-0 pb-1 mt-2"
						@click.prevent="register"
					>
						Register
					</button>
				</div>
				<div class="d-flex align-items-center justify-content-start" v-else>
					<p class="lead h2 mx-3 text-light text-right mb-0 mt-2">
						{{ username }}
					</p>
					<span
						class="
							bg-danger
							profilePicHeader
							my-xl-auto
							ms-lg-0
							my-3
							order-xl-last order-first
						"
					>
						{{ ProfileLetter }}
					</span>
				</div>
				<div class="d-xl-flex d-inline justify-content-center">
					<button
						v-if="isLoggedIn"
						class="btn btn-danger mx-lg-2 ms-0 mt-2 pb-1"
						@click.prevent="logout"
					>
						Logout
					</button>
				</div>
			</div>
		</div>
	</nav>
</template>

<script>
import { computed, onUpdated, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

export default {
	setup() {
		const searchTerm = ref("");
		const store = useStore();
		const router = useRouter();
		const ProfileLetter = ref("");
		function search() {
			router.push("/search");
			store.dispatch("setTerm", searchTerm);
		}

		const isLoggedIn = computed(() => {
			return store.getters.getLoggedIn;
		});

		function register() {
			router.push("/register");
		}

		function login() {
			router.push("/login");
		}

		const username = computed(() => {
			return store.getters.getUserName;
		});

		function logout() {
			store.dispatch("logout");
		}

		onUpdated(() => {
			if (isLoggedIn.value) {
				ProfileLetter.value = username.value;
				ProfileLetter.value = ProfileLetter.value[0].toUpperCase();
			}
		});

		if (isLoggedIn.value) {
			ProfileLetter.value = username.value;
			ProfileLetter.value = ProfileLetter.value[0].toUpperCase();
		}

		return {
			search,
			searchTerm,
			register,
			isLoggedIn,
			login,
			logout,
			username,
			ProfileLetter,
		};
	},
};
</script>

<style scoped>
  .nav-link {
    font-size: 1.2rem;
  }
.nav-link:hover {
	animation: toRed 0.2s ease-out forwards;
}

.form-control {
	border-radius: 0;
}

@keyframes toRed {
	to {
		background-image: radial-gradient(
			circle farthest-corner at 10% 20%,
			rgba(247, 87, 0, 1) 0%,
			rgba(249, 0, 0, 1) 90.1%
		);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
		padding-bottom: 5px;
	}
}
</style>