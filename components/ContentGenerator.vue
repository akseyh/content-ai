<script setup lang="ts">
import * as yup from "yup";

const schema = yup.object({
  input: yup.string().required("Konu girilmesi zorunludur"),
});

const content = ref();
const err = ref(false);
const loading = ref(false);
const showSuggestion = ref(false);
const contentSuggestion = ref<string | null>(null);
const generateImage = ref<boolean>(false);

async function onSubmit(values: any) {
  try {
    loading.value = true;

    const response = await generateContent(values.input, generateImage.value);

    loading.value = false;

    content.value = response;
  } catch (error) {
    loading.value = false;
    err.value = true;
  }
}

async function fetchContentSuggestion() {
  try {
    loading.value = true;
    const response = await $fetch<string>("/api/content/suggest", {
      method: "POST",
    });
    contentSuggestion.value = response;
    showSuggestion.value = true;
  } catch (error) {
    console.error("Konu önerisi alınamadı:", error);
  } finally {
    loading.value = false;
  }
}
</script>

<template>
  <div class="mt-40 sm:w-1/2 w-full mx-6">
    <Form
      ref="form"
      :validation-schema="schema"
      @submit="onSubmit"
      class="flex flex-col gap-y-4"
    >
      <h1 class="text-4xl font-bold text-white">Sosyal Medya İçerik Üretici</h1>
      <div class="flex flex-col">
        <label for="input" class="font-semibold text-lg text-white"
          >İçeriğin Konusu</label
        >
        <Field
          name="input"
          type="text"
          as="textarea"
          class="w-full bg-gray-800 rounded text-white p-2 border border-gray-700"
          placeholder="İçeriğin konusu hakkında bilgi verin"
        />
        <ErrorMessage name="input" class="text-red-500" />
      </div>

      <div class="flex items-center gap-x-2 text-white">
        <UToggle v-model="generateImage" color="primary" size="sm" />
        <span class="text-sm font-medium">Resim Üret</span>
      </div>

      <div class="flex gap-x-2">
        <UButton
          type="submit"
          :disabled="loading"
          :loading="loading"
          class="bg-gray-700 rounded py-2 flex-grow"
        >
          İçerik Oluştur
        </UButton>
        <UButton
          type="button"
          :disabled="loading"
          :loading="loading"
          color="blue"
          class="bg-blue-600 hover:bg-blue-700 text-white rounded py-1 px-2 text-sm min-w-[100px]"
          @click="fetchContentSuggestion"
        >
          Konu Öner
        </UButton>
      </div>
    </Form>
    <Transition name="slide-fade">
      <div v-if="showSuggestion" class="relative">
        <div
          class="absolute z-10 bg-gray-800 border border-gray-700 rounded p-4 mt-2 shadow-md w-full"
        >
          <div class="flex justify-between items-start mb-2">
            <p class="text-white">{{ contentSuggestion }}</p>
            <button
              @click="showSuggestion = false"
              class="text-gray-400 hover:text-white"
            >
              ✕
            </button>
          </div>
        </div>
      </div>
    </Transition>
    <div v-if="err">
      <span class="text-red-500">Bir hata oluştu...</span>
    </div>
    <ContentCard
      class="mt-6"
      v-else-if="content"
      :date="content.createdDate"
      :text="content.text"
      :subject="content.subject"
      :image="content.image"
    />
  </div>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
