<script setup lang="ts">
const { chapters, title } = useCourse();

const resetError = (error: any) => {
  error.value = null;
};
</script>

<template>
  <div>
    <div class="prose mx-auto mb-12">
      <h1 class="text-center">
        <span class="font-medium">
          Course:
          <span class="font-bold">{{ title }}</span>
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
            :to="lesson.path"
            v-for="(lesson, index) in chapter.lessons"
            :key="lesson.slug"
            class="prose-sm -mx-4 flex flex-row space-x-1 px-4 py-1 font-normal no-underline"
            :class="{
              'text-blue-500': $route.fullPath === lesson.path,
              'text-gray-600': $route.fullPath !== lesson.path,
            }"
          >
            <span class="text-gray-500">{{ index + 1 }}.</span>
            <span>{{ lesson.title }}</span>
          </NuxtLink>
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
