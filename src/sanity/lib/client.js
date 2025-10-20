// src/sanity/lib/client.js
import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2025-10-20', // 日付は任意でOK（今日の日付など）
  useCdn: false, // 本番で高速化したいときは true
})
