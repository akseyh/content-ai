<script setup lang="ts">
import * as yup from "yup";

const schema = yup.object({
  input: yup.string().required("Konu girilmesi zorunludur"),
});

const content = ref();
const err = ref(false);
const loading = ref(false);

async function onSubmit(values: any) {
  try {
    loading.value = true;

    const response = await generateContent(values.input);

    loading.value = false;

    content.value = response;
  } catch (error) {
    loading.value = false;
    err.value = true;
  }
}
</script>

<template>
  <div class="mt-40 sm:w-1/2 w-full mx-6">
    <Form
      :validation-schema="schema"
      @submit="onSubmit"
      class="flex flex-col gap-y-4"
    >
      <h1 class="text-4xl font-bold">Sosyal Medya İçerik Üretici</h1>
      <div class="flex flex-col">
        <label for="input" class="font-semibold text-lg">İçeriğin Konusu</label>
        <Field
          name="input"
          type="text"
          as="textarea"
          class="w-full bg-gray-200 rounded text-black p-2"
          placeholder="İçeriğin konusu hakkında bilgi verin"
        />
        <ErrorMessage name="input" class="text-red-500" />
      </div>

      <UButton
        type="submit"
        :disabled="loading"
        :loading="loading"
        class="bg-gray-700 rounded py-2"
      >
        İçerik Oluştur
      </UButton>
    </Form>

    <div v-if="err">
      <span class="text-red-500">Something went wrong...</span>
    </div>
    <ContentCard
      class="mt-6"
      v-else-if="content"
      :date="content.createdAt"
      :subject="content.subject"
      :text="content.text"
    />
  </div>
</template>
