<template>
	<div class="bg-pattern fill-page">
		<SecondaryHeader />
		<div class="container text-light mt-5 w-50 rounded-3">
			<h2 class="display-2 ps-4 pt-4">Registruj se:</h2>
			<form
				@submit.prevent="RegisterUser"
				class="d-flex flex-column align-items-center my-5 py-3"
			>
				<div class="row d-flex">
					<div class="col-12">
						<label class="mt-2 lead" for="username">Korisničko ime</label>
						<input
							v-model="username"
							class="form-control pt-2"
							type="text"
							name="username"
							id="username"
							placeholder="Nemanja1234"
						/><br />
						<label class="mt-2 lead" for="email">Imejl</label>
						<input
							v-model="email"
							class="form-control pt-2"
							type="email"
							name="email"
							id="email"
							placeholder="nemanja.vuk@example.com"
						/><br />
						<label class="mt-2 lead" for="password">Lozinka</label>
						<input
							v-model="pass"
							type="password"
							class="form-control pt-2"
							name="password"
							id="password"
						/><br />
						<label class="mt-2 lead" for="password">Lozinka osiguranje</label>
						<input
							v-model="passConfirm"
							type="password"
							class="form-control pt-2"
							name="password"
							id="password"
						/><br />
						<button
							class="btn btn-danger w-50 form-control text-light my-4"
							type="submit"
						>
							Dalje
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</template>

<script>
import SecondaryHeader from "../UI/SecondaryHeader.vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";

export default {
	components: {
		SecondaryHeader,
	},
	setup() {
		const router = useRouter();
		const store = useStore();
		const email = ref("");
		const pass = ref("");
		const passConfirm = ref("");
		const username = ref("");

		async function RegisterUser() {
			if (
				email.value.includes("@") &&
				pass.value.length > 6 &&
				pass.value == passConfirm.value &&
				username.value.length <= 14
			) {
				if( await store.dispatch("register", { email: email.value, password: pass.value, username: username.value }))
				{
					router.push("/main");
				}
			} else {
				alert("Probajte ponovo sa valid imejl adresa i lozinka!");
			}
		}

		return {
			RegisterUser,
			email,
			pass,
			passConfirm,
			username,
		};
	},
};
</script>