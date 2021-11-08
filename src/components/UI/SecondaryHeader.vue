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
            <form @submit.prevent="search" class="ms-lg-auto px-lg-0 px-3 mt-3">
              <span
                v-if="isLoggedIn"
                class="
                  bg-danger
                  profilePicHeader
                  pt-2
                  my-lg-0
                  ms-lg-0
                  my-3
                  ms-3
                "
                >{{ ProfileLetter }}</span
              >
              <div v-if="!isLoggedIn">
                <button
                type="button"
                  class="
                    btn btn-outline-secondary
                    bg-light
                    text-danger
                    mb-2
                    pb-1
                  "
                  @click.prevent="login"
                >
                  Login
                </button>
                <button
                type="button"
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
                  type="button"
                  class="
                    btn btn-outline-secondary
                    bg-light
                    text-danger
                    mb-2
                    pb-1
                  "
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
                  class="nav-link h5 my-2 text-light mx-xl-3 text-center"
                  role="button"
                  >Home</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/kategorija/zajednica/sve"
                  class="nav-link h5 my-2 text-light mx-xl-3 text-center"
                  role="button"
                  >Zajednica</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/kategorija/privreda/sve"
                  class="nav-link h5 my-2 text-light mx-xl-3 text-center"
                  role="button"
                  >Privreda</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/kultura"
                  class="nav-link h5 my-2 text-light mx-xl-3 text-center"
                  role="button"
                  >Kultura</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/sport"
                  class="nav-link h5 my-2 text-light mx-xl-3 text-center"
                  role="button"
                  >Sport</router-link
                >
              </li>

              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/kategorija/intervju/sve"
                  class="nav-link h5 my-2 text-light mx-xl-3 text-center"
                  role="button"
                  >Intervju</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/kategorija/press/sve"
                  class="nav-link h5 my-2 text-light mx-xl-3 text-center"
                  role="button"
                  >Press</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/najava"
                  class="nav-link h5 my-2 text-light mx-xl-3 text-center"
                  role="button"
                  >Najava</router-link
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/daily"
                  class="nav-link h5 my-2 text-light mx-xl-3 text-center"
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
                    my-2
                    text-light
                    mx-xl-3
                    text-secondary text-dark text-center
                  "
                  role="button"
                  >Više vesti</a
                >
              </li>
              <li class="nav-item secondaryHeaderBg">
                <router-link
                  to="/latest"
                  class="nav-link h5 my-2 text-light text-center mx-xl-3"
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