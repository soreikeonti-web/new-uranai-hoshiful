'use client'

import { Studio } from 'sanity'
import config from '../../../sanity.config'  // ← 修正ポイント①

// Studio は動的な方が安全（本番でエラー回避できる）
export const dynamic = 'force-dynamic'       // ← 修正ポイント②

export default function StudioPage() {
  return <Studio config={config} />
}
