<template>
  <nav class="navbar navbar-expand-xl navbar-light bg-light">
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
            <router-link to="/main" class="navbar-brand"
              ><img class="mt-3 mt-xl-0" src="../../assets/logo.png"
            /></router-link>
            <form
              @submit.prevent="search"
              class="px-lg-0 px-3 ms-auto d-flex my-3"
            >
              <span
                v-if="isLoggedIn"
                class="bg-danger profilePicHeader pt-2 my-lg-0 my-3"
                >{{ ProfileLetter }}</span
              >
              <div v-if="!isLoggedIn" class="mt-2">
                <button
                  class="btn btn-outline-secondary bg-light text-danger pb-1"
                  @click.prevent="login"
                >
                  Login
                </button>
                <button
                  class="
                    btn btn-outline-secondary
                    bg-light
                    text-danger
                    ms-3
                    me-3
                    pb-1
                  "
                  @click.prevent="register"
                >
                  Register
                </button>
              </div>
              <div class="d-flex align-items-center" v-else>
                <p class="lead h2 ms-auto mb-0 text-right">{{ username }}</p>
                <button
                  class="
                    btn btn-outline-secondary
                    bg-light
                    text-danger
                    pb-1
                    mx-3
                  "
                  @click.prevent="logout"
                >
                  Logout
                </button>
              </div>
              <div class="d-flex py-lg-2">
                <input
                  class="form-control me-2 pb-1 my-xl-0 my-lg-2 my-4"
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  v-model="searchTerm"
                />
                <button
                  class="btn btn-outline-danger pb-1 my-xl-0 my-lg-2 my-4"
                  type="submit"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </div>
        <div class="mt-lg-2 mt-3 py-xl-2">
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
                justify-content-between
              "
            >
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/main"
                  class="
                    nav-link
                    h5
                    pb-0
                    mb-0
                    ps-0
                    pe-3
                    text-light
                    ms-xl-3
                    text-center
                  "
                  role="button"
                  >Home</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/kategorija/zajednica/sve"
                  class="
                    nav-link
                    h5
                    pb-0
                    mb-0
                    ps-0
                    pe-3
                    text-light
                    ms-xl-3
                    text-center
                  "
                  role="button"
                  >Zajednica</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/kategorija/privreda/sve"
                  class="
                    nav-link
                    h5
                    pb-0
                    mb-0
                    ps-0
                    pe-3
                    text-light
                    ms-xl-3
                    text-center
                  "
                  role="button"
                  >Privreda</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/kultura"
                  class="
                    nav-link
                    h5
                    pb-0
                    mb-0
                    ps-0
                    pe-3
                    text-light
                    ms-xl-3
                    text-center
                  "
                  role="button"
                  >Kultura</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/sport"
                  class="
                    nav-link
                    h5
                    pb-0
                    mb-0
                    ps-0
                    pe-3
                    text-light
                    ms-xl-3
                    text-center
                  "
                  role="button"
                  >Sport</router-link
                >
              </li>

              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/kategorija/intervju/sve"
                  class="
                    nav-link
                    h5
                    pb-0
                    mb-0
                    ps-0
                    pe-3
                    text-light
                    ms-xl-3
                    text-center
                  "
                  role="button"
                  >Intervju</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/kategorija/press/sve"
                  class="
                    nav-link
                    h5
                    pb-0
                    mb-0
                    ps-0
                    pe-3
                    text-light
                    ms-xl-3
                    text-center
                  "
                  role="button"
                  >Press</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/najava"
                  class="
                    nav-link
                    h5
                    pb-0
                    mb-0
                    ps-0
                    pe-3
                    text-light
                    ms-xl-3
                    text-center
                  "
                  role="button"
                  >Najava</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/daily"
                  class="
                    nav-link
                    h5
                    pb-0
                    mb-0
                    ps-0
                    pe-3
                    text-light
                    ms-xl-3
                    text-center
                  "
                  role="button"
                  >Daily Photo</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <a
                  class="
                    nav-link
                    disabled
                    h5
                    pb-0
                    mb-0
                    text-secondary
                    ms-xl-3
                    text-dark text-center
                    ps-0
                    pe-3
                  "
                  role="button"
                  >Više vesti</a
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/latest"
                  class="
                    nav-link
                    h5
                    pb-0
                    mb-0
                    ps-0
                    ps-xl-3
                    pe-3
                    text-light text-center
                    mb-xl-0
                    mb-3
                  "
                  role="button"
                  >Arhiva</router-link
                >
              </li>
            </ul>
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