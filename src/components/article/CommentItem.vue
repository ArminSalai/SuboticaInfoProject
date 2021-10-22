<template>
  <li class="p-4">
    <div class="row">
      <div class="col-2 d-flex justify-content-center align-items-center">
        <span class="bg-danger rounded-circle profilePic text-light display-3 pt-3 d-flex align-items-center justify-content-center overflow-hidden">{{ ProfileLetter }}</span>
      </div>
      <div class="col-8 d-flex flex-column">
        <h4 class="text-secondary">{{ username }}</h4>
        <p class="text-light">
          {{ comment }}
        </p>
      </div>
      <div class="col d-flex flex-column justify-content-center">
        <div class="likeButton mb-2" alt="like" @click="likeComment"></div>
        <p class="text-light likeText" v-if="likeCount">{{ likeCount }}</p>
        <div class="dislikeButton" alt="like"></div>
      </div>
    </div>
  </li>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
export default {
  props: ['username', 'comment', 'likeCount', 'id'],
  setup(props) {
    const store = useStore();
    const ProfileLetter = ref(props.username);
    ProfileLetter.value = ProfileLetter.value[0].toUpperCase();

    function likeComment() {
      store.dispatch('likeComment', props.id);
    }
    
    return {
      ProfileLetter,
      likeComment
    }
  }
};
</script>