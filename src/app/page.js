import { client } from "../sanity/lib/client";

export default async function Home() {
  // Sanity から posts データを取得（スキーマに応じて変更可能）
  const posts = await client.fetch(`*[_type == "post"]{title, _id}`);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🔮 Sanity 接続テストページ</h1>
      <p style={styles.text}>Sanity から取得したデータ一覧：</p>

      <ul style={styles.list}>
        {posts.length > 0 ? (
          posts.map((post) => (
            <li key={post._id} style={styles.item}>
              {post.title}
            </li>
          ))
        ) : (
          <li style={styles.itemEmpty}>データがありません</li>
        )}
      </ul>
    </div>
  );
}

const styles = {
  container: {
    fontFamily: "sans-serif",
    minHeight: "100vh",
    padding: "40px",
    backgroundColor: "#f9f9f9",
  },
  title: { fontSize: "2rem", marginBottom: "20px", color: "#333" },
  text: { fontSize: "1.2rem", marginBottom: "20px" },
  list: { listStyle: "none", padding: 0 },
  item: {
    background: "#fff",
    border: "1px solid #ddd",
    padding: "10px 15px",
    borderRadius: "6px",
    marginBottom: "10px",
  },
  itemEmpty: { color: "#888" },
};
