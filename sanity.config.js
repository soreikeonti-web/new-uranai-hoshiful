'use client'

/**
 * Sanity Studio の設定ファイル
 * /src/app/studio/[[...index]]/page.jsx から読み込まれます
 */

import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'

// APIバージョン・プロジェクトIDなどの環境変数
import { apiVersion, dataset, projectId } from './src/sanity/env'

// ✅ schemaTypes を正しく import
import { schemaTypes } from './src/sanity/schemaTypes'

// ✅ Sanity Studio の構成ツール（必要な場合のみ）
import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',

  // ← ここは環境変数から読み込む
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,

  // ✅ スキーマ設定は必ずこの書き方！
  schema: {
    types: schemaTypes,
  },

  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
