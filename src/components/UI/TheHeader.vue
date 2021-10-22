<template>
  <nav class="navbar navbar-expand-xl navbar-light bg-light">
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
          ><img class="mt-3 mt-xl-0" src="../../assets/logo.png"
        /></router-link>
        <ul class="navbar-nav ms-3 me-auto mb-lg-0 my-3 my-xl-0">
          <li class="nav-item">
            <router-link
              to="/latest"
              class="nav-link h5 pb-0 mb-0 text-danger text-center"
              role="button"
              >Poslednje vesti</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/sport"
              class="nav-link h5 pb-0 mb-0 text-danger ms-xl-3 text-center"
              role="button"
              >Sport</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/kultura"
              class="nav-link h5 pb-0 mb-0 text-danger ms-xl-3 text-center"
              role="button"
              >Kultura</router-link
            >
          </li>
          <li class="nav-item">
            <router-link
              to="/najava"
              class="nav-link h5 pb-0 mb-0 text-danger ms-xl-3 text-center"
              role="button"
              >Najava</router-link
            >
          </li>
          <li class="nav-item">
            <a
              class="nav-link disabled h5 pb-0 mb-0 text-secondary ms-xl-3 text-center"
              role="button"
              >Više vesti</a
            >
          </li>
        </ul>
        <span v-if="isLoggedIn" class="bg-danger profilePicHeader pt-2 my-lg-0 ms-lg-0 my-3 ms-3">{{
          ProfileLetter
        }}</span>
        <form @submit.prevent="search" class="px-lg-0 px-3">
          <div v-if="!isLoggedIn">
            <button
              class="btn btn-outline-secondary bg-light text-danger mb-2 pb-1"
              @click.prevent="login"
            >
              Login
            </button>
            <button
              class="
                btn btn-outline-secondary
                bg-light
                text-danger
                mb-2
                ms-3
                pb-1
              "
              @click.prevent="register"
            >
              Register
            </button>
          </div>
          <div class="d-flex align-items-center" v-else>
            <button
              class="btn btn-outline-secondary bg-light text-danger mb-2 pb-1"
              @click.prevent="logout"
            >
              Logout
            </button>
            <p class="lead h2 ms-auto text-right">{{ username }}</p>
          </div>
          <div class="d-flex">
            <input
              class="form-control me-2 pb-1"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-model="searchTerm"
            />
            <button class="btn btn-outline-danger pb-1" type="submit">
              Search
            </button>
          </div>
        </form>
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
      ProfileLetter.value = (username.value);
      ProfileLetter.value = ProfileLetter.value[0].toUpperCase();
    }
    })
    
    if (isLoggedIn.value) {
      ProfileLetter.value = (username.value);
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