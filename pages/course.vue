<script setup lang="ts">
import { useCourse } from "~/composables/useCourse";

const { chapters } = useCourse();
</script>

<template>
  <div class="h-full min-h-screen w-full bg-gray-100 p-12">
    <div class="prose mx-auto mb-12">
      <h1 class="text-center">
        <span class="font-medium">
          Course:
          <span class="font-bold">Mastering Nuxt 3</span>
        </span>
      </h1>
    </div>

    <div class="mx-auto flex max-w-7xl justify-center gap-4">
      <div class="prose flex max-w-[300px] flex-col rounded-md bg-white p-8">
        <h3>Chapters</h3>
        <div
          class="mb-4 flex flex-col space-y-1"
          v-for="chapter in chapters"
          :key="chapter.slug"
        >
          <h4>{{ chapter.title }}</h4>
          <NuxtLink
            :to="`/course/chapter/${chapter.slug}/lesson/${lesson.slug}`"
            v-for="(lesson, index) in chapter.lessons"
            :key="lesson.slug"
            class="prose-sm -mx-4 flex flex-row space-x-1 px-4 py-1 font-normal no-underline"
            :class="{
              'text-blue-500':
                lesson.slug === $route.params.lessonSlug &&
                chapter.slug === $route.params.chapterSlug,
              'text-gray-600':
                lesson.slug !== $route.params.lessonSlug ||
                chapter.slug !== $route.params.chapterSlug,
            }"
          >
            <span class="text-gray-500">{{ index + 1 }}.</span>
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
      </div>
      <div class="rounde-md max-w-2xl flex-1 bg-white p-12">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
