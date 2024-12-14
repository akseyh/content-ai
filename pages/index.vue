<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
</script>

<template>
  <div class="w-full flex flex-col bg-gray-800 min-h-screen">
    <Header />
    <div class="w-full flex justify-center">
      <ContentGenerator />
    </div>
  </div>

  <ContentHistory />
</template>
