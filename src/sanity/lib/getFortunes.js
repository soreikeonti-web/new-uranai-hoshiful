// src/sanity/lib/getFortunes.js
import { client } from './client'

export async function getFortunes() {
  const query = `*[_type == "fortune"] | order(date desc) {
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
  }`
  return await client.fetch(query)
}
