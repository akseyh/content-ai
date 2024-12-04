import GithubProvider from "next-auth/providers/github";
import { NuxtAuthHandler } from "#auth";

export default NuxtAuthHandler({
  secret: process.env.AUTH_SECRET,
  providers: [
    // @ts-expect-error Use .default here for it to work during SSR.
    GithubProvider.default({
      clientId: process.env.GITHUB_PROVIDER_CLIENT_ID,
      clientSecret: process.env.GITHUB_PROVIDER_CLIENT_SECRET,
    }),
  ],
});
