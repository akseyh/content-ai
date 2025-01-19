<template>
  <header class="bg-gray-900 p-4">
    <nav class="container mx-auto flex justify-between items-center">
      <div class="text-white font-bold text-xl">İçerik Üretici</div>
      <ul class="flex space-x-6">
        <li>
          <button
            @click="navigateTo('/')"
            class="text-gray-300 hover:text-white"
          >
            Anasayfa
          </button>
        </li>
        <li>
          <button
            @click="navigateTo('/profile')"
            class="text-gray-300 hover:text-white"
          >
            Profil
          </button>
        </li>
        <li>
          <button
            @click="navigateTo('/content-calendar')"
            class="text-gray-300 hover:text-white"
          >
            Önemli Günler
          </button>
        </li>
        <li>
          <button
            @click="navigateTo('/history')"
            class="text-gray-300 hover:text-white"
          >
            Geçmiş
          </button>
        </li>
      </ul>
    </nav>
  </header>
</template>

<script setup lang="ts">
const navigateTo = useRouter().push;
</script>
