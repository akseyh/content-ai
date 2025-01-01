<template>
  <div class="w-full flex flex-col bg-gray-800 min-h-screen">
    <Header />
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold text-white mb-4">Geçmiş İçerikler</h1>
      <ContentHistory />
    </div>
  </div>
</template>

<script setup lang="ts">
import ContentHistory from "~/components/ContentHistory.vue";
import Header from "~/components/Header.vue";
</script>
