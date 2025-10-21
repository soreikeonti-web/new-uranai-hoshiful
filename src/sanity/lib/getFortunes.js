// src/sanity/lib/getFortunes.js
import { client } from './client'

export async function getFortunes() {
  // Draftは除外し、作成日時の新しい順で取得（最新が先頭）
  const query = `
    *[_type == "fortune" && !(_id in path("drafts.**"))]
      | order(_createdAt desc) {
        _id,
        zodiacSign,
        date,
        summary,
        overall,
        love,
        money,
        work,
        luckyColor,
        luckyItem,
        affirmation,
        "slug": slug.current
      }
  `
  return client.fetch(query)
}
