<script setup lang="ts">
defineProps<{
  subject: string;
  text: string;
  image: string;
  date: Date;
}>();
</script>

<template>
  <div
    class="bg-white rounded-xl shadow-sm p-4 hover:shadow-md transition-shadow"
  >
    <div class="flex items-center gap-3 mb-4">
      <img
        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
        alt="Avatar"
        class="w-12 h-12 rounded-full"
      />
      <div class="flex flex-col">
        <span class="font-semibold text-gray-900">Content AI</span>
        <span class="text-gray-500 text-sm">@content-ai</span>
      </div>
    </div>

    <h3 class="text-xl font-semibold mb-2 text-gray-900">{{ subject }}</h3>

    <p class="text-lg mb-4 text-gray-800">{{ text }}</p>

    <img
      v-if="image"
      :src="image"
      :alt="subject"
      class="w-full object-cover rounded-lg mb-4"
    />

    <div
      class="flex items-center justify-between pt-4 border-t border-gray-100"
    >
      <span class="text-sm text-gray-500">
        {{ new Date(date).toLocaleString("tr-TR") }}
      </span>
      <div class="flex gap-6">
        <button
          class="hover:bg-blue-50 p-2 rounded-full transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500 group-hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
        </button>
        <button
          class="hover:bg-green-50 p-2 rounded-full transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500 group-hover:text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </button>
        <button
          class="hover:bg-red-50 p-2 rounded-full transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500 group-hover:text-red-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </button>
        <button
          class="hover:bg-blue-50 p-2 rounded-full transition-colors group"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-5 w-5 text-gray-500 group-hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
