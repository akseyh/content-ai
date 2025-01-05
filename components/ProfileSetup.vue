<template>
  <div>
    <form @submit.prevent="submitProfile" class="space-y-4">
      <div>
        <label for="industry" class="block text-white text-sm font-medium mb-1"
          >Sektör:</label
        >
        <input
          type="text"
          id="industry"
          v-model="profile.industry"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
        />
      </div>
      <div>
        <label
          for="targetAudience"
          class="block text-white text-sm font-medium mb-1"
          >Hedef Kitle:</label
        >
        <input
          type="text"
          id="targetAudience"
          v-model="profile.targetAudience"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
        />
      </div>
      <div>
        <label for="tone" class="block text-white text-sm font-medium mb-1"
          >Ton:</label
        >
        <input
          type="text"
          id="tone"
          v-model="profile.tone"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
        />
      </div>
      <div>
        <label
          for="brandPersonality"
          class="block text-white text-sm font-medium mb-1"
          >Marka Kişiliği:</label
        >
        <input
          type="text"
          id="brandPersonality"
          v-model="profile.brandPersonality"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
        />
      </div>
      <div>
        <label for="url" class="block text-white text-sm font-medium mb-1"
          >URL:</label
        >
        <input
          type="text"
          id="url"
          v-model="profile.url"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:border-blue-500 bg-gray-700 text-white"
        />
      </div>
      <button
        type="submit"
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Kaydet
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

const profile = ref({
  industry: "",
  targetAudience: "",
  tone: "",
  brandPersonality: "",
  url: "",
});

onMounted(async () => {
  try {
    const response = await $fetch(`/api/profile`);
    if (response) {
      profile.value = response;
    }
  } catch (error) {
    console.error("Profil getirme hatası:", error);
    alert("Profil bilgileri alınırken bir hata oluştu.");
  }
});

async function submitProfile() {
  try {
    const response = await $fetch("/api/profile/update", {
      method: "POST",
      body: profile.value,
    });
    if (response.success) {
      alert("Profil başarıyla güncellendi!");
    } else {
      alert("Profil güncellenirken bir hata oluştu.");
    }
  } catch (error) {
    alert("Profil güncellenirken bir hata oluştu.");
    console.error("Profil güncelleme hatası:", error);
  }
}
</script>
