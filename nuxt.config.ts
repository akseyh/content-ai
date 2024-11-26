// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: "2024-04-03",
  devtools: { enabled: true },
  modules: [
    "@nuxt/ui",
    "@vee-validate/nuxt",
    "@prisma/nuxt",
    "@sidebase/nuxt-auth",
  ],
  auth: {
    provider: {
      type: "authjs",
    },
    baseURL: `http://localhost:3000`,
  },
});
