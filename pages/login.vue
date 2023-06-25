<script setup lang="ts">
const { title } = useCourse();
const supabase = useSupabaseAuthClient();

const login = async () => {
  const { error, data } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });

  if (error) console.error("Error: ", error);
};
</script>

<template>
  <div class="prose mx-auto h-9 max-w-2xl">
    <h1>Login in to {{ title }}</h1>
    <button
      class="rounded bg-blue-500 px-4 py-2 font-bold text-white"
      @click="login"
    >
      Log in with Github
    </button>
  </div>
</template>
