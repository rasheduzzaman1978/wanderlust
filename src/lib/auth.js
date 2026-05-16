import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { jwt } from "better-auth/plugins";

const client = new MongoClient(process.env.MONGODB_URI);

const db = client.db("wanderlust");

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET,

  database: mongodbAdapter(db, {
    client,
  }),

  emailAndPassword: {
    enabled: true,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET,

      redirectURI:
        `${process.env.BETTER_AUTH_URL}/api/auth/callback/google`,
    },
  },
  session: {

      cookieCache: {

        enabled: true,

        strategy: "jwt",

        // max 7 Days
        maxAge:
          7 * 24 * 60 * 60,
      },
    },
  plugins: [
      jwt(),
    ],
});