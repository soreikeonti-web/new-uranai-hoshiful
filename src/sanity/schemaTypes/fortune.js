// src/sanity/schemaTypes/fortune.js
import { defineType, defineField } from 'sanity'

const zodiacList = [
  { title: 'おひつじ座 (Aries)', value: 'aries' },
  { title: 'おうし座 (Taurus)', value: 'taurus' },
  { title: 'ふたご座 (Gemini)', value: 'gemini' },
  { title: 'かに座 (Cancer)', value: 'cancer' },
  { title: 'しし座 (Leo)', value: 'leo' },
  { title: 'おとめ座 (Virgo)', value: 'virgo' },
  { title: 'てんびん座 (Libra)', value: 'libra' },
  { title: 'さそり座 (Scorpio)', value: 'scorpio' },
  { title: 'いて座 (Sagittarius)', value: 'sagittarius' },
  { title: 'やぎ座 (Capricorn)', value: 'capricorn' },
  { title: 'みずがめ座 (Aquarius)', value: 'aquarius' },
  { title: 'うお座 (Pisces)', value: 'pisces' },
]

export default defineType({
  name: 'fortune',
  title: 'Fortune（12星座占い）',
  type: 'document',

  groups: [
    { name: 'content', title: '本文（必須）' },
    { name: 'scores', title: '運勢スコア' },
    { name: 'quote', title: '名言' },
    { name: 'affirm', title: 'アファメーション' },
    { name: 'product', title: '商品（アフィリエイト）' },
    { name: 'seo', title: 'SEO/タグ' },
    { name: 'system', title: 'システム' },
  ],

  fields: [
    // ---- Content ----
    defineField({
      name: 'zodiacSign',
      title: '星座',
      type: 'string',
      options: { list: zodiacList, layout: 'radio' },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'date',
      title: '日付（運勢の対象日）',
      type: 'date',
      options: { dateFormat: 'YYYY-MM-DD', calendarTodayLabel: '今日' },
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({
      name: 'summary',
      title: '要約（1行・80字以内）',
      type: 'string',
      description: '一覧やOGPに使う短い要約',
      validation: (Rule) => Rule.required().max(80),
      group: 'content',
    }),
    defineField({
      name: 'overall',
      title: '総合運（本文）',
      type: 'text',
      rows: 6,
      validation: (Rule) => Rule.required(),
      group: 'content',
    }),
    defineField({ name: 'love', title: '恋愛運', type: 'text', rows: 4, group: 'content' }),
    defineField({ name: 'money', title: '金運', type: 'text', rows: 4, group: 'content' }),
    defineField({ name: 'work', title: '仕事運', type: 'text', rows: 4, group: 'content' }),
    defineField({ name: 'luckyColor', title: 'ラッキーカラー', type: 'string', group: 'content' }),
    defineField({ name: 'luckyItem', title: 'ラッキーアイテム', type: 'string', group: 'content' }),

    // ---- Scores ----
    defineField({
      name: 'overallScore',
      title: '総合運スコア（0〜5）',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      group: 'scores',
    }),
    defineField({
      name: 'loveScore',
      title: '恋愛運スコア（0〜5）',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      group: 'scores',
    }),
    defineField({
      name: 'moneyScore',
      title: '金運スコア（0〜5）',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      group: 'scores',
    }),
    defineField({
      name: 'workScore',
      title: '仕事運スコア（0〜5）',
      type: 'number',
      validation: (Rule) => Rule.min(0).max(5),
      group: 'scores',
    }),

    // ---- Quote ----
    defineField({
      name: 'quote',
      title: '名言',
      type: 'object',
      group: 'quote',
      fields: [
        defineField({ name: 'text', title: '本文', type: 'text', rows: 3, validation: (Rule) => Rule.max(280) }),
        defineField({ name: 'author', title: '著者', type: 'string' }),
        defineField({ name: 'sourceUrl', title: '出典URL', type: 'url' }),
      ],
    }),

    // ---- Affirmation ----
    defineField({
      name: 'affirmation',
      title: 'アファメーション',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
      group: 'affirm',
    }),

    // ---- Product (Affiliate) ----
    defineField({
      name: 'product',
      title: 'おすすめ商品（アフィリエイト導線）',
      type: 'object',
      group: 'product',
      fields: [
        defineField({ name: 'title', title: '商品名', type: 'string' }),
        defineField({ name: 'description', title: '説明', type: 'text', rows: 3 }),
        defineField({ name: 'url', title: '商品URL（アフィリエイト）', type: 'url' }),
        defineField({ name: 'image', title: '画像', type: 'image', options: { hotspot: true } }),
        defineField({ name: 'price', title: '価格', type: 'string' }),
        defineField({ name: 'tag', title: 'ハッシュタグ', type: 'string' }),
      ],
    }),

    // ---- SEO / Tags ----
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      group: 'seo',
      options: {
        source: (doc) => {
          const sign = doc.zodiacSign || ''
          const d = doc.date || ''
          return d && sign ? `${d}-${sign}` : sign || d
        },
        slugify: (input) =>
          (input || '')
            .toLowerCase()
            .replace(/[^a-z0-9-_]+/g, '-')
            .replace(/--+/g, '-')
            .replace(/^-|-$/g, ''),
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tags',
      title: 'タグ（SNS/SEO）',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
      group: 'seo',
    }),

    // ---- System ----
    defineField({
      name: 'publishedAt',
      title: '公開日時',
      type: 'datetime',
      options: { timeStep: 1 },
      group: 'system',
    }),
    defineField({
      name: 'isAutoGenerated',
      title: 'AI自動生成',
      type: 'boolean',
      initialValue: true,
      group: 'system',
    }),
    defineField({
      name: 'modelInfo',
      title: '生成モデル情報',
      type: 'object',
      group: 'system',
      fields: [
        defineField({ name: 'provider', title: 'プロバイダ（Gemini/GPTなど）', type: 'string' }),
        defineField({ name: 'model', title: 'モデル名', type: 'string' }),
        defineField({ name: 'promptId', title: 'プロンプトID', type: 'string' }),
      ],
    }),
  ],

  initialValue: () => {
    // ローカル日付（YYYY-MM-DD）を自動セット
    const tzOffset = new Date().getTimezoneOffset() * 60000
    const localISODate = new Date(Date.now() - tzOffset).toISOString().slice(0, 10)
    return {
      date: localISODate,
      publishedAt: new Date().toISOString(),
      isAutoGenerated: true,
    }
  },

  preview: {
    select: {
      date: 'date',
      zodiac: 'zodiacSign',
      summary: 'summary',
      overallScore: 'overallScore',
    },
    prepare({ date, zodiac, summary, overallScore }) {
      const map = {
        aries: 'おひつじ座',
        taurus: 'おうし座',
        gemini: 'ふたご座',
        cancer: 'かに座',
        leo: 'しし座',
        virgo: 'おとめ座',
        libra: 'てんびん座',
        scorpio: 'さそり座',
        sagittarius: 'いて座',
        capricorn: 'やぎ座',
        aquarius: 'みずがめ座',
        pisces: 'うお座',
      }
      const title = `${date || ''}｜${map[zodiac] || zodiac || '星座未選択'}`
      const subtitle = summary || (overallScore != null ? `総合⭐️${overallScore}/5` : '')
      return { title, subtitle }
    },
  },
})
