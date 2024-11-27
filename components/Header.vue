<script setup lang="ts">
const data = await $fetch("/api/token", {
  method: "GET",
});

const { signOut } = useAuth();

async function handleSignOut() {
  await signOut();
}
</script>

<template>
  <div class="flex gap-x-4 items-center p-8">
    <img v-if="data?.picture" :src="data?.picture" class="h-16" />
    <div class="flex flex-col gap-y-2">
      <div>Hoşgeldin {{ data?.name }}!</div>

      <button
        class="bg-red-500 px-2 py-1 rounded text-white"
        @click="handleSignOut"
      >
        Sign Out
      </button>
    </div>
  </div>
</template>
