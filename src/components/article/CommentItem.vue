<template>
  <li class="p-4">
    <div class="row">
      <div class="col-2 d-flex justify-content-center align-items-center">
        <span
          class="
            bg-danger
            profilePic
            pt-2
          "
          >{{ ProfileLetter }}</span
        >
      </div>
      <div class="col-8 d-flex flex-column">
        <h4 class="text-secondary">{{ username }}</h4>
        <p class="text-light">
          {{ comment }}
        </p>
      </div>
      <div class="col d-flex flex-column justify-content-center">
        <div class="likeButton mb-2" alt="like" :class="liked?'bg-info' : ''" @click="likeComment"></div>
        <p class="likeText" :class="liked?'text-info' : 'text-light'" v-if="likeCount">{{ likeCount }}</p>
        <div class="dislikeButton" alt="like" :class="disliked?'bg-info' : ''" @click="dislikeComment"></div>
        <p class="likeText" :class="disliked?'text-info' : 'text-light'" v-if="dislikeCount">
          {{ dislikeCount }}
        </p>
      </div>
    </div>
  </li>
</template>

<script>
import { computed, onMounted, ref } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";
export default {
  props: ["username", "comment", "likedBy", "dislikedBy", "id"],
  setup(props) {
    const store = useStore();
    const route = useRoute();
    const likeCount = computed(() => {
      return props.likedBy.length - 1;
    });
    const dislikeCount = computed(() => {
      return props.dislikedBy.length - 1;
    });
    const ProfileLetter = ref(props.username);
    ProfileLetter.value = ProfileLetter.value[0].toUpperCase();

    
    const liked = ref(false);
    
    async function likeComment() {
      if(store.getters.getUserName == "") {
        alert("Please try logging in first");
        return;
      }
      await store.dispatch("likeComment", props.id);
      await store.dispatch("loadComments", route.params.Nid);
    }

    const disliked = ref(false);

    async function dislikeComment() {
      if(store.getters.getUserName == "") {
        alert("Please try logging in first");
        return;
      }
      await store.dispatch("dislikeComment", props.id);
      store.dispatch("loadComments", route.params.Nid);
    }

    onMounted(() => {
      if(props.likedBy.find(lB => lB == localStorage.getItem('userId')) != undefined)
        liked.value = true;
      if(props.dislikedBy.find(lB => lB == localStorage.getItem('userId')) != undefined)
        disliked.value = true;
    })

    return {
      ProfileLetter,
      likeComment,
      likeCount,
      dislikeCount,
      dislikeComment,
      liked,
      disliked
    };
  },
};
</script>