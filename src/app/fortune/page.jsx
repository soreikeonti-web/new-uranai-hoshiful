// src/app/fortune/page.jsx
import { getFortunes } from '@/sanity/lib/getFortunes'

export default async function FortunePage() {
  const fortunes = await getFortunes()

  return (
    <main style={{ padding: '2rem' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>
        🔮 今日の12星座占い
      </h1>

      {fortunes.length === 0 && <p>まだデータがありません。</p>}

      {fortunes.map((f) => (
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
            {f.date}｜{f.zodiacSign}
          </h2>
          <p style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>{f.summary}</p>
          <p style={{ marginBottom: '0.5rem' }}>🌟 総合運：{f.overall}</p>
          <p style={{ marginBottom: '0.5rem' }}>❤️ 恋愛運：{f.love}</p>
          <p style={{ marginBottom: '0.5rem' }}>💰 金運：{f.money}</p>
          <p style={{ marginBottom: '0.5rem' }}>💼 仕事運：{f.work}</p>
          <p style={{ marginBottom: '0.5rem' }}>🎨 ラッキーカラー：{f.luckyColor}</p>
          <p style={{ marginBottom: '0.5rem' }}>🎁 ラッキーアイテム：{f.luckyItem}</p>
          <p style={{ fontStyle: 'italic', color: '#555' }}>
            💫 アファメーション：「{f.affirmation}」
          </p>
        </div>
      ))}
    </main>
  )
}
