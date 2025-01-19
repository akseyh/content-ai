<template>
  <div class="min-h-screen bg-gray-900">
    <Header />
    <main class="container mx-auto px-4 py-8">
      <div class="bg-gray-800 rounded-lg shadow-lg p-6">
        <div class="flex items-center mb-6">
          <button
            @click="navigateTo('/content-calendar')"
            class="mr-4 text-gray-500 hover:text-gray-700 transition-colors duration-150"
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
          <h1 class="text-2xl font-bold text-white">Yeni İçerik Takvimi</h1>
        </div>

        <form @submit.prevent="createCalendar" class="space-y-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div class="space-y-1">
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
                placeholder="Takvim adı"
              />
            </div>

            <div class="space-y-1">
              <label
                for="category"
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
                      d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Kategori
                </span>
              </label>
              <input
                type="text"
                id="category"
                v-model="form.category"
                required
                class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400 hover:bg-gray-600 transition-colors duration-200 py-2.5 px-4"
                placeholder="Kategori adı"
              />
            </div>

            <div class="space-y-1">
              <label for="date" class="block text-sm font-medium text-white">
                <span class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Başlangıç Tarihi
                </span>
              </label>
              <input
                type="date"
                id="date"
                v-model="form.date"
                required
                class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400 hover:bg-gray-600 transition-colors duration-200 py-2.5 px-4"
              />
            </div>

            <div class="space-y-1">
              <label for="dateTo" class="block text-sm font-medium text-white">
                <span class="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-4 w-4 mr-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Bitiş Tarihi
                </span>
              </label>
              <input
                type="date"
                id="dateTo"
                v-model="form.dateTo"
                class="mt-1 block w-full rounded-md border border-gray-600 bg-gray-700 text-white shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm placeholder-gray-400 hover:bg-gray-600 transition-colors duration-200 py-2.5 px-4"
              />
            </div>
          </div>

          <div class="space-y-1">
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
              class="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
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

          <div class="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              @click="navigateTo('/content-calendar')"
              class="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1.5"
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
              class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-4 w-4 mr-1.5"
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
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";

const form = ref({
  name: "",
  date: "",
  dateTo: "",
  category: "",
  description: "",
  isActive: false,
});

const router = useRouter();
const navigateTo = (path: string) => {
  router.push(path);
};

const createCalendar = async () => {
  try {
    const formData = {
      name: form.value.name,
      category: form.value.category,
      description: form.value.description,
      isActive: form.value.isActive,
      date: new Date(form.value.date).toISOString(),
      dateTo: form.value.dateTo
        ? new Date(form.value.dateTo).toISOString()
        : null,
    };

    await $fetch("/api/content-calendar", {
      method: "POST",
      body: formData,
    });

    window.alert("İçerik takvimi başarıyla oluşturuldu!");
    navigateTo("/content-calendar");
  } catch (error: any) {
    console.error("Error creating content calendar:", error);
    window.alert(
      "İçerik takvimi oluşturulamadı. Lütfen zorunlu alanları doldurun ve tarihleri doğru formatta girdiğinizden emin olun."
    );
  }
};
</script>
