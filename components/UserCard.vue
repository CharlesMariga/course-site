<script setup lang="ts">
const user = useSupabaseUser();

console.log("User: ", user?.value);

const name = computed(() => user?.value?.user_metadata?.full_name);
const profile = computed(() => user?.value?.user_metadata?.avatar_url);
</script>

<template>
  <div v-if="user" class="flex items-center space-x-3 rounded bg-white p-3">
    <img
      class="h-12 w-12 rounded-full border-2 border-blue-400"
      :src="profile"
      alt=""
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button class="text-sm text-slate-500 underline">Log out</button>
    </div>
  </div>
</template>
