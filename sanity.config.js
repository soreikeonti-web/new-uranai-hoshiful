'use client'

/**
 * Sanity Studio の設定ファイル
 * /src/app/studio/[[...index]]/page.jsx から読み込まれます
 */

import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
// import { structureTool } from 'sanity/structure' ← 一旦コメントアウトして安全にする

// APIバージョン・プロジェクトIDなどの環境変数
import { apiVersion, dataset, projectId } from './src/sanity/env'

// ✅ schemaTypes を正しく import
import { schemaTypes } from './src/sanity/schemaTypes'

// ✅ Sanity Studio の構成ツール（※使う場合のみ有効化する）
// import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',

  // ← 環境変数から読み込む
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || dataset,

  // ✅ スキーマ設定（必須）
  schema: {
    types: schemaTypes,
  },

  // ✅ プラグイン設定
  plugins: [
    structureTool(), // ← これでOK（structure は一旦使わない）
    visionTool({ defaultApiVersion: apiVersion }),
  ],
  
})
