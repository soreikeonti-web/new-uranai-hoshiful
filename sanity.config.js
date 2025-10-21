'use client'

/**
 * Sanity Studio の設定ファイル
 * /src/app/studio/[[...index]]/page.jsx から読み込まれます
 */

import { defineConfig } from 'sanity'
import { visionTool } from '@sanity/vision'
import { structureTool } from 'sanity/structure'  // ← ✅ コメントアウト解除して必須！

import { apiVersion, dataset, projectId } from './src/sanity/env'
import { schemaTypes } from './src/sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || projectId,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || dataset,

  schema: {
    types: schemaTypes,
  },

  // ✅ プラグイン設定
  plugins: [
    structureTool(), // ← デフォルト構造でドキュメント一覧が出せる
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
