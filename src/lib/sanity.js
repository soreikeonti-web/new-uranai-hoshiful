import { createClient } from "@sanity/client";

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  useCdn: false, // 最新データを取得したいので false 推奨
  apiVersion: "2023-01-01",
  token: process.env.SANITY_API_TOKEN,
});
