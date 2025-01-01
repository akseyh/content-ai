<template>
  <div class="w-full flex flex-col gap-y-4">
    <div
      v-for="content in contents"
      :key="content.id"
      class="bg-gray-700 p-4 rounded-md"
    >
      <p class="text-white">{{ content.text }}</p>
      <img
        v-if="content.image"
        :src="content.image"
        alt="Generated Image"
        class="mt-2 rounded-md"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const contents = ref([]);

onMounted(async () => {
  try {
    const response = await $fetch("/api/content");
    contents.value = response;
  } catch (error) {
    console.error("İçerik geçmişi alınırken bir hata oluştu:", error);
  }
});
</script>
