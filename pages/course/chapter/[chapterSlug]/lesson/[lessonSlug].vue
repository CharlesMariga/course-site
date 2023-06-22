<script setup lang="ts">
import { useRoute } from "vue-router";
import { useCourse } from "../../../../../composables/useCourse";
import { computed } from "vue";

const route = useRoute();
const course = useCourse();

const chapter = computed(() =>
  course.chapters.find((chapter) => chapter.slug === route.params.chapterSlug)
);

const lesson = computed(() =>
  chapter?.value?.lessons.find(
    (lesson) => lesson.slug === route.params.lessonSlug
  )
);

const title = computed(() => `${lesson?.value?.title} - ${course.title}`);

useHead({
  title,
});

const progress = useLocalStorage("progress", () => [[false]]);

const isLessonComplete = computed(() => {
  if (!chapter?.value?.number) return false;

  if (!progress.value[chapter.value.number - 1]) return false;

  if (!lesson?.value?.number) return false;

  if (!progress.value[chapter.value.number - 1][lesson.value.number - 1])
    return false;

  return progress.value[chapter.value.number - 1][lesson.value.number - 1];
});

const toggleComplete = () => {
  if (!chapter?.value?.number || !lesson.value?.number) return;

  if (!progress.value[chapter.value.number - 1]) {
    progress.value[chapter.value.number - 1] = [];
  }

  progress.value[chapter.value.number - 1][lesson.value.number - 1] =
    !isLessonComplete.value;
};
</script>

<template>
  <div>
    <p class="mb-1 mt-0 font-bold uppercase text-slate-400">
      Lesson {{ chapter?.number }} - {{ lesson?.number }}
    </p>
    <h2 class="my-0">{{ lesson?.title }}</h2>
    <div class="mb-8 mt-2 flex space-x-4">
      <NuxtLink
        v-if="lesson?.sourceUrl"
        target="_blank"
        class="text-md font-normal text-gray-500 underline"
        :to="lesson?.sourceUrl"
        >Download Source Code</NuxtLink
      >
      <NuxtLink
        v-if="lesson?.downloadUrl"
        target="_blank"
        class="text-md font-normal text-gray-500 underline"
        :to="lesson?.downloadUrl"
        >Download video</NuxtLink
      >
    </div>
    <VideoPlayer v-if="lesson?.videoId" :videoId="lesson.videoId" />
    <p>{{ lesson?.text }}</p>
    <ClientOnly>
      <LessonCompleteButton
        :modelValue="isLessonComplete"
        @update:modelValue="throw createError('Could not update');"
      />
    </ClientOnly>
  </div>
</template>
