<script setup lang="ts">
import ContentCard from "./ContentCard.vue";

const contents = ref<
  { subject: string; text: string; image: string; createdAt: Date }[]
>([]);

const isHistoryOpen = ref(false);

const toggleHistory = async () => {
  isHistoryOpen.value = !isHistoryOpen.value;

  contents.value = await fetchContents();
};
</script>

<template>
  <button
    class="fixed top-4 right-4 z-50 p-2 bg-white rounded-lg shadow-md hover:bg-gray-50 transition-colors"
    @click="toggleHistory"
  >
    <span v-if="isHistoryOpen" class="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M6 18L18 6M6 6l12 12"
        />
      </svg>
    </span>
    <span v-else class="flex items-center gap-2 transition">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-6 w-6 text-gray-800"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
      <span class="hidden md:inline text-gray-800">Geçmiş</span>
    </span>
  </button>

  <Transition name="slide">
    <div
      class="p-4 fixed right-0 top-0 h-full w-full md:w-1/2 bg-white text-gray-800 shadow-lg z-40 overflow-y-auto transition-transform duration-300 ease-in-out"
      v-if="isHistoryOpen"
    >
      <h2
        class="text-xl font-bold mb-6 pb-2 border-b border-gray-200 text-gray-800"
      >
        Geçmiş İçerikler
      </h2>
      <div class="space-y-4">
        <ContentCard
          v-for="(content, idx) in contents"
          :key="idx"
          :date="content.createdAt"
          :subject="content.subject"
          :text="content.text"
          :image="content.image"
        />
      </div>
    </div>
  </Transition>
</template>

<style>
/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}

.slide-enter-to,
.slide-leave-from {
  transform: translateX(0);
}
</style>
