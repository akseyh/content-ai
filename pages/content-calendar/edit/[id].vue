<template>
  <div class="min-h-screen bg-gray-900">
    <Header />
    <main class="container mx-auto px-4 py-8">
      <div class="bg-gray-800 rounded-lg shadow-lg p-8">
        <div class="flex items-center mb-6">
          <button
            @click="navigateTo('/content-calendar')"
            class="mr-4 text-gray-500 hover:text-gray-300 transition-colors duration-150"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h1 class="text-2xl font-bold text-white">İçerik Takvimi Düzenle</h1>
        </div>

        <form @submit.prevent="updateCalendar" class="space-y-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div class="space-y-2">
              <label for="name" class="block text-sm font-medium text-white">
                <span class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  İsim
                </span>
              </label>
              <input
                type="text"
                id="name"
                v-model="form.name"
                required
                class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400 hover:bg-gray-600 transition-colors duration-200 py-2.5 px-4"
                placeholder="İçerik takvimi ismi"
              />
            </div>

            <div>
              <label for="category" class="block text-sm font-medium text-white"
                >Kategori</label
              >
              <input
                type="text"
                id="category"
                v-model="form.category"
                class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400 hover:bg-gray-600 transition-colors duration-200 py-2.5 px-4"
              />
            </div>

            <div>
              <label for="date" class="block text-sm font-medium text-white"
                >Başlangıç Tarihi</label
              >
              <input
                type="date"
                id="date"
                v-model="form.date"
                required
                class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400 hover:bg-gray-600 transition-colors duration-200 py-2.5 px-4"
              />
            </div>

            <div>
              <label for="dateTo" class="block text-sm font-medium text-white"
                >Bitiş Tarihi</label
              >
              <input
                type="date"
                id="dateTo"
                v-model="form.dateTo"
                class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400 hover:bg-gray-600 transition-colors duration-200 py-2.5 px-4"
              />
            </div>
          </div>

          <div class="space-y-2">
            <label
              for="description"
              class="block text-sm font-medium text-white"
            >
              <span class="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-4 w-4 mr-1"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z"
                    clip-rule="evenodd"
                  />
                </svg>
                Açıklama
              </span>
            </label>
            <textarea
              id="description"
              v-model="form.description"
              rows="4"
              class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400 hover:bg-gray-600 transition-colors duration-200 py-2.5 px-4"
              placeholder="İçerik takvimi hakkında açıklama"
            ></textarea>
          </div>

          <div class="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isActive"
              v-model="form.isActive"
              class="h-5 w-5 rounded border-gray-600 text-blue-600 focus:ring-blue-500 bg-gray-700"
            />
            <label for="isActive" class="text-sm text-white flex items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clip-rule="evenodd"
                />
              </svg>
              Aktif
            </label>
          </div>

          <div class="flex justify-end space-x-4 pt-6">
            <button
              type="button"
              @click="navigateTo('/content-calendar')"
              class="inline-flex items-center px-6 py-3 border border-gray-600 shadow-sm text-sm font-medium rounded-md text-gray-300 bg-gray-700 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
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
              İptal
            </button>
            <button
              type="submit"
              class="inline-flex items-center px-6 py-3 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 13l4 4L19 7"
                />
              </svg>
              Güncelle
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
const navigateTo = (path: string) => {
  router.push(path);
};
const calendarId = route.params.id;

const form = ref({
  name: "",
  date: "",
  dateTo: "" as string | null,
  category: "",
  description: "",
  isActive: false,
});

onMounted(async () => {
  const { data } = await useFetch<ContentCalendar>(
    `/api/content-calendar/${calendarId}`
  );
  if (data.value) {
    form.value = {
      name: data.value.name,
      date: new Date(data.value.date).toISOString().split("T")[0],
      dateTo: data.value.dateTo
        ? new Date(data.value.dateTo).toISOString().split("T")[0]
        : "",
      category: data.value.category,
      description: data.value.description,
      isActive: data.value.isActive,
    };
  }
});

const updateCalendar = async () => {
  try {
    const formData = {
      name: form.value.name,
      category: form.value.category,
      description: form.value.description,
      isActive: form.value.isActive,
      date: form.value.date,
      dateTo: form.value.dateTo || null,
    };

    await $fetch(`/api/content-calendar/${calendarId}`, {
      method: "PUT",
      body: formData,
    });

    window.alert("İçerik takvimi başarıyla güncellendi!");
    navigateTo("/content-calendar");
  } catch (error: any) {
    console.error("Error updating content calendar:", error);
    window.alert(
      "İçerik takvimi güncellenemedi. Lütfen zorunlu alanları doldurun."
    );
  }
};

interface ContentCalendar {
  id: string;
  name: string;
  date: Date;
  dateTo: Date | null;
  category: string;
  description: string;
  isActive: boolean;
}
</script>
