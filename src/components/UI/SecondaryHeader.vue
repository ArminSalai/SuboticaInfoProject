<template>
	<nav class="navbar navbar-expand-xl navbar-dark">
		<div class="container">
			<div class="d-flex flex-column w-100">
				<div class="d-flex">
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
				</div>
				<div>
					<div class="collapse navbar-collapse" id="navbarTogglerDemo01">
						<div></div>
						<router-link to="/main" class="navbar-brand"
							><img
								class="mt-3 mt-xl-0"
								src="../../assets/logo.png"
								width="200"
						/></router-link>
						<div class="d-flex align-items-center ms-auto">
							<div class="d-flex max-cont">
								<form @submit.prevent="search" class="px-lg-0 px-3">
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
							<div class="d-flex justify-content-center ms-auto">
								<button
									v-if="isLoggedIn"
									class="btn btn-danger mx-2 pb-1 mt-2"
									@click.prevent="logout"
								>
									Logout
								</button>
							</div>
							<div
								v-if="!isLoggedIn"
								class="my-3 d-flex justify-content-center"
							>
								<button class="btn btn-danger pb-1 mt-2" @click.prevent="login">
									Login
								</button>
								<button
									class="btn btn-danger mx-2 pb-1 mt-2"
									@click.prevent="register"
								>
									Register
								</button>
							</div>
							<div
								class="d-flex align-items-center justify-content-center"
								v-else
							>
								<p class="lead h2 mx-3 text-right mb-0 mt-2">{{ username }}</p>
								<span
									class="bg-danger profilePicHeader my-xl-auto ms-lg-0 my-3"
								>
									{{ ProfileLetter }}
								</span>
							</div>
						</div>
					</div>
				</div>
				<div class="mt-lg-0 mt-3 pb-xl-2">
					<hr class="bg-light mb-0" />
					<div class="collapse navbar-collapse" id="navbarTogglerDemo01">
						<ul
							class="
								navbar-nav
								me-auto
								sHBg
								mb-lg-0
								mx-0
								w-100
								my-3 my-xl-0
								d-flex
								justify-content-center
							"
						>
							<li class="nav-item">
								<router-link
									to="/main"
									class="nav-link h5 my-2 text-light mx-xl-3 text-center"
									role="button"
									>Home</router-link
								>
							</li>
							<li class="nav-item">
								<router-link
									to="/kategorija/zajednica/sve"
									class="nav-link h5 my-2 text-light mx-xl-3 text-center"
									role="button"
									>Zajednica</router-link
								>
							</li>
							<li class="nav-item">
								<router-link
									to="/kategorija/privreda/sve"
									class="nav-link h5 my-2 text-light mx-xl-3 text-center"
									role="button"
									>Privreda</router-link
								>
							</li>
							<li class="nav-item">
								<router-link
									to="/kultura"
									class="nav-link h5 my-2 text-light mx-xl-3 text-center"
									role="button"
									>Kultura</router-link
								>
							</li>
							<li class="nav-item">
								<router-link
									to="/sport"
									class="nav-link h5 my-2 text-light mx-xl-3 text-center"
									role="button"
									>Sport</router-link
								>
							</li>

							<li class="nav-item">
								<router-link
									to="/kategorija/intervju/sve"
									class="nav-link h5 my-2 text-light mx-xl-3 text-center"
									role="button"
									>Intervju</router-link
								>
							</li>
							<li class="nav-item">
								<router-link
									to="/kategorija/press/sve"
									class="nav-link h5 my-2 text-light mx-xl-3 text-center"
									role="button"
									>Press</router-link
								>
							</li>
							<li class="nav-item">
								<router-link
									to="/najava"
									class="nav-link h5 my-2 text-light mx-xl-3 text-center"
									role="button"
									>Najava</router-link
								>
							</li>
							<li class="nav-item">
								<router-link
									to="/daily"
									class="nav-link h5 my-2 text-light mx-xl-3 text-center"
									role="button"
									>Daily Photo</router-link
								>
							</li>
							<li class="nav-item">
								<a
									class="
										nav-link
										h5
										my-2
										mx-xl-3
										disabled
										text-secondary text-center
									"
									role="button"
									>Više vesti</a
								>
							</li>
							<li class="nav-item">
								<router-link
									to="/latest"
									class="nav-link h5 my-2 text-light text-center mx-xl-3"
									role="button"
									>Arhiva</router-link
								>
							</li>
						</ul>
						<hr class="bg-light my-0" />
					</div>
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
	font-size: 1rem;
}

.router-link-active {
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