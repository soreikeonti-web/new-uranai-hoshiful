'use client'

// next-sanity/studio は使わず、公式の Studio コンポーネントを直に使う
import { Studio } from 'sanity'
import config from '../../../../sanity.config'

// Studio は静的でもOK。必要なら 'force-dynamic' にしても可
export const dynamic = 'force-static'

export default function StudioPage() {
  return <Studio config={config} />
}
