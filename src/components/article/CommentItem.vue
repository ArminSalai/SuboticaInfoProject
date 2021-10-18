<template>
  <li class="p-4">
    <div class="row">
      <div class="col-2 d-flex justify-content-center align-items-center">
        <span class="bg-danger rounded-circle profilePic"></span>
      </div>
      <div class="col-8 d-flex flex-column">
        <h4 class="text-secondary">{{ username }}</h4>
        <p class="text-light">
          {{ comment }}
        </p>
      </div>
    </div>
  </li>
</template>

<script>
export default {
  props: ['username', 'comment']
};
</script>