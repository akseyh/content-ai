<template>
  <div class="w-full flex flex-col bg-gray-800 min-h-screen">
    <Header />
    <div class="container mx-auto p-4">
      <h1 class="text-2xl font-bold text-white mb-4">Profil Ayarları</h1>
      <div class="bg-gray-700 p-4 rounded-md">
        <ProfileSetup />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileSetup from "~/components/ProfileSetup.vue";
import Header from "~/components/Header.vue";
</script>
