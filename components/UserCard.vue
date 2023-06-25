<script setup lang="ts">
const user = useSupabaseUser();
const { auth } = useSupabaseAuthClient();

const name = computed(() => user?.value?.user_metadata?.full_name);
const profile = computed(() => user?.value?.user_metadata?.avatar_url);

const logout = async () => {
  const { error } = await auth.signOut();

  if (error) {
    console.error(error);
    return;
  }

  await navigateTo("/login");
};
</script>

<template>
  <div
    v-if="user"
    class="flex items-center space-x-3 self-center rounded bg-white p-3"
  >
    <img
      class="m-0 h-12 w-12 rounded-full border-2 border-blue-400"
      :src="profile"
      alt=""
    />
    <div class="text-right">
      <div class="font-medium">{{ name }}</div>
      <button class="text-sm text-slate-500 underline" @click="logout">
        Log out
      </button>
    </div>
  </div>
</template>
