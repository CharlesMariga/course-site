<script setup lang="ts">
const { title } = useCourse();
</script>

<template>
  <div class="prose mx-auto h-9 max-w-2xl">
    <h1>Login in to {{ title }}</h1>
    <button class="rounded bg-blue-500 px-4 py-2 font-bold text-white">
      Log in with Github
    </button>
  </div>
</template>
