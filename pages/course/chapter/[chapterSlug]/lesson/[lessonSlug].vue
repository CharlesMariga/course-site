<script setup lang="ts">
import { useRoute } from "vue-router";
import { computed } from "vue";
import useLesson from "~/composables/useLesson";
import { useCourseProgressStore } from "~/stores/courseProgess";

const route = useRoute();
const course = await useCourse();
const store = useCourseProgressStore();
const { initialize, toggleComplete } = store;
const { chapterSlug, lessonSlug } = route.params;
const user = useSupabaseUser();

const lesson = await useLesson(chapterSlug as string, lessonSlug as string);

initialize();

definePageMeta({
  middleware: [
    async function ({ params }, from) {
      const course = await useCourse();

      const chapter = computed(() =>
        course.value.chapters.find(
          (chapter) => chapter.slug === params.chapterSlug
        )
      );

      if (!chapter.value) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: "Chapter not found",
          })
        );
      }

      const lesson = computed(() =>
        chapter?.value?.lessons.find(
          (lesson) => lesson.slug === params.lessonSlug
        )
      );

      if (!lesson.value) {
        return abortNavigation(
          createError({
            statusCode: 404,
            message: "Lesson not found",
          })
        );
      }
    },
    "auth",
  ],
});

// Check if the current lesson is completed
const isCompleted =
  computed(
    () => store.progress?.[chapterSlug as string]?.[lessonSlug as string]
  ) || 0;

const chapter = computed(() =>
  course.value.chapters.find(
    (chapter) => chapter.slug === route.params.chapterSlug
  )
);

const title = computed(() => `${lesson?.value?.title} - ${course.value.title}`);

useHead({
  title,
});
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
        v-if="user"
        :modelValue="isCompleted"
        @update:modelValue="toggleComplete"
      />
    </ClientOnly>
  </div>
</template>
