<script setup lang="ts">
const firstLesson = await useFirstLesson();
</script>

<template>
  <div class="flex justify-center">
    <NuxtLink
      :href="firstLesson.path"
      class="text-center text-2xl font-bold underline"
    >
      Go to the first lesson
    </NuxtLink>
  </div>
</template>
