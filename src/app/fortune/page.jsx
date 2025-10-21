// src/app/fortune/page.jsx
export const dynamic = 'force-dynamic' // ← 常に最新を取得（キャッシュ無効）

import { getFortunes } from '@/sanity/lib/getFortunes'

export default async function FortunePage() {
  const fortunes = await getFortunes()

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        🔮 今日の12星座占い
      </h1>

      {(!fortunes || fortunes.length === 0) && <p>まだデータがありません。</p>}

      {fortunes?.map((f) => (
        <div
          key={f._id}
          style={{
            border: '1px solid #ddd',
            borderRadius: '12px',
            padding: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>
            {(f.date ?? '日付未設定')}｜{f.zodiacSign}
          </h2>

          {f.summary && <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{f.summary}</p>}
          {f.overall && <p style={{ marginBottom: '0.5rem' }}>🌟 総合運：{f.overall}</p>}
          {f.love && <p style={{ marginBottom: '0.5rem' }}>❤️ 恋愛運：{f.love}</p>}
          {f.money && <p style={{ marginBottom: '0.5rem' }}>💰 金運：{f.money}</p>}
          {f.work && <p style={{ marginBottom: '0.5rem' }}>💼 仕事運：{f.work}</p>}
          {f.luckyColor && <p style={{ marginBottom: '0.5rem' }}>🎨 ラッキーカラー：{f.luckyColor}</p>}
          {f.luckyItem && <p style={{ marginBottom: '0.5rem' }}>🎁 ラッキーアイテム：{f.luckyItem}</p>}
          {f.affirmation && (
            <p style={{ fontStyle: 'italic', color: '#555' }}>
              💫 アファメーション：「{f.affirmation}」
            </p>
          )}
        </div>
      ))}
    </main>
  )
}
