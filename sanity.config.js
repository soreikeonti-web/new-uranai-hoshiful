'use client'

/**
 * Sanity Studio の設定ファイル
 * /src/app/studio/[[...index]]/page.jsx から読み込まれます
 */

import { defineConfig } from 'sanity'              // ✅ ← これが抜けていた！
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'

// APIバージョン・プロジェクトIDなどの環境変数
import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schema } from './src/sanity/schemaTypes'
import { structure } from './src/sanity/structure'

export default defineConfig({
  basePath: '/studio',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID, // ✅ NEXT_PUBLIC を使用
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,      // ✅ NEXT_PUBLIC を使用
  schema,
  plugins: [
    structureTool({ structure }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
