<script setup lang="ts">
import { useCourseProgressStore } from "~/stores/courseProgess";
import { storeToRefs } from "pinia";

const user = useSupabaseUser();
const course = await useCourse();
const firstLesson = await useFirstLesson();

// Get chapter completion percentages
const { percentageCompleted } = storeToRefs(useCourseProgressStore());

const resetError = async (error: any) => {
  await navigateTo(firstLesson.path);
  error.value = null;
};
</script>

<template>
  <div>
    <div
      class="prose mx-auto mb-12 flex max-w-5xl items-center justify-between"
    >
      <h1 class="text-center">
        <span class="font-medium">
          <span class="font-bold">{{ course.title }}</span>
        </span>
      </h1>
      <UserCard />
    </div>

    <div class="mx-auto flex max-w-7xl justify-center gap-4">
      <div class="prose flex max-w-[300px] flex-col rounded-md bg-white p-8">
        <h3>Chapters</h3>
        <div
          class="mb-4 flex flex-col space-y-1"
          v-for="(chapter, index) in course.chapters"
          :key="chapter.slug"
        >
          <h4 class="flex items-center justify-between">
            {{ chapter.title }}
            <span
              v-if="percentageCompleted && user"
              class="text-sm text-emerald-500"
              >{{ percentageCompleted.chapters[index] }}% complete</span
            >
          </h4>
          <NuxtLink
            :to="lesson.path"
            v-for="(lesson, index) in chapter.lessons"
            :key="lesson.slug"
            class="prose-sm -mx-4 flex cursor-pointer flex-row space-x-1 px-4 py-1 font-normal no-underline"
            :class="{
              'text-blue-500': $route.fullPath === lesson.path,
              'text-gray-600': $route.fullPath !== lesson.path,
            }"
          >
            <span class="text-gray-500">{{ index + 1 }}.</span>
            <span>{{ lesson.title }}</span>
          </NuxtLink>
        </div>
        <div
          v-if="percentageCompleted"
          class="mt-8 flex justify-between text-sm font-medium text-gray-500"
        >
          Course completion: <span>{{ percentageCompleted.course }}%</span>
        </div>
      </div>

      <div class="rounde-md prose max-w-2xl flex-1 bg-white p-12">
        <NuxtErrorBoundary>
          <NuxtPage />
          <template #error="{ error }">
            <p>
              Oh no, something went wrong with the lesson!
              <code>{{ error }}</code>
            </p>
            <button
              class="rounded-md bg-gray-500 px-3 py-2 font-bold text-white hover:cursor-pointer"
              @click="resetError(error)"
            >
              Reset
            </button>
          </template>
        </NuxtErrorBoundary>
      </div>
    </div>
  </div>
</template>
