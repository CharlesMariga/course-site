<template>
  <div class="w-full h-full min-h-screen p-12 bg-gray-100">
    <div class="mb-12 prose mx-auto">
      <h1 class="text-center">
        <span class="font-medium">
          Course:
          <span class="font-bold">Mastering Nuxt 3</span>
        </span>
      </h1>
    </div>

    <div class="max-w-7xl mx-auto flex gap-4 justify-center">
      <div class="bg-white rounded-md flex p-8">
        <h3>Chapter</h3>
      </div>
      <div class="bg-white rounde-md p-12 flex-1 max-w-2xl">
        <NuxtPage />
      </div>
    </div>
  </div>
</template>
