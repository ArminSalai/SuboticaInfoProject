<template>
  <TheHeader class="mb-5" />
  <div class="container-fluid w-75">
    <img :src="image" class="img-fluid w-100" alt="No Image Provided" />
    <br />
    <span class="badge bg-danger text-light rounded-pill my-3"
      ><p class="m-0 pt-1 px-3">{{ category }}</p></span
    >
    <h1>{{ title }}</h1>
    <p class="text-danger">{{ date }}</p>
    <hr />
    <p class="lead indented">
      {{ desc }}
    </p>
    <div id="gallery"></div>
    <p class="fw-bold mt-3">
      Tagovi: <span class="fw-light">{{ tagovi }}</span>
    </p>
    <p class="fw-bold mt-3">
      Ličnosti: <span class="fw-light">{{ licnosti }}</span>
    </p>
    <p class="fw-bold mt-3">
      Autor teksta: <span class="fw-light">{{ autor }}</span>
    </p>
    <p class="fw-bold mt-3">
      Fotograf: <span class="fw-light">{{ fotograf }}</span>
    </p>
  </div>
  <div class="container-fluid w-75">
    <form @submit.prevent class="bg-dark text-light p-3 pb-5">
      <div class="row">
        <div class="col-2"></div>
        <div class="col-8">
          <label for="comment" class="mb-1 text-secondary">Kommentar:</label>
          <textarea
            v-model="comment"
            name="comment"
            id="comment"
            rows="2"
            class="form-control"
          ></textarea>
        </div>
        <div class="col d-flex align-items-end">
          <button class="btn btn-danger text-light pt-2" @click="postComment">
            Poslaj
          </button>
        </div>
      </div>
    </form>
    <ul class="bg-dark list-unstyled">
      <CommentItem
        v-for="comm in comments"
        :key="comm.id"
        :username="comm.user"
        :comment="comm.comment"
        :likedBy="comm.likedBy"
        :dislikedBy="comm.dislikedBy"
        :id="comm.id"
      />
    </ul>
  </div>
  <TheFooter />
</template>

<script>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { ref, onMounted, computed } from "vue";
import TheHeader from "../UI/TheHeader.vue";
import CommentItem from "../article/CommentItem.vue";
import TheFooter from "../UI/TheFooter.vue";

export default {
  components: {
    TheHeader,
    TheFooter,
    CommentItem,
  },
  setup() {
    const store = useStore();
    const route = useRoute();
    const comment = ref("");

    async function getArticle() {
      await store.dispatch("setArticle", route.params.Nid);
      let div = document.querySelector("#gallery");
      for (const element of eval(gallery.value)) {
        let img = document.createElement("img");
        img.setAttribute("src", element.Image);
        img.setAttribute("alt", element.Alt);
        img.setAttribute("title", element.Title);
        img.setAttribute("class", "m-2");
        img.style.width = "15rem";
        img.style.height = "10rem";
        img.style.objectFit = "cover";
        div.appendChild(img);
      }
    }

    const article = computed(() => {
      return store.getters.getArticles;
    });

    const category = computed(
      () =>
        String(article.value.Kategorija).substring(0, 1).toUpperCase() +
        String(article.value.Kategorija).substring(1)
    );
    const title = computed(() => article.value.Naslov);
    const desc = computed(() => article.value["Sadrzaj clanka"]);
    const image = computed(() => article.value["Vodeca slika"]);
    const date = computed(() => article.value["Post date"]);
    const gallery = computed(() => article.value["Photo gallery"]);
    const tagovi = computed(() => article.value.Tagovi);
    const licnosti = computed(() => article.value.Licnosti);
    const autor = computed(() => article.value["Autor teksta"]);
    const fotograf = computed(() => article.value["Fotograf"]);

    const comments = computed(() => {
      return store.getters.getComments;
    });

    async function postComment() {
      await store.dispatch("comment", {
        comment: comment.value,
        articleNid: article.value.Nid,
      });
      comment.value = "";
      store.dispatch("loadComments", article.value.Nid);
    }

    onMounted(async function () {
      await getArticle();
      await store.dispatch("loadComments", article.value.Nid);
    });

    return {
      category,
      title,
      desc,
      image,
      date,
      tagovi,
      licnosti,
      autor,
      fotograf,
      postComment,
      comment,
      comments,
    };
  },
};
</script>