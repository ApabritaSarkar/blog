export default function HomePage() {
  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '3rem' }}>
      <h1>🌿 Welcome to Blog</h1>
      <p>This is a full-stack blog platform built with Next.js and MongoDB.</p>

      <h2 style={{ marginTop: '2rem' }}>🔗 Useful Links</h2>
      <ul style={{ lineHeight: '2' }}>
        <li><strong>Admin Dashboard:</strong> <a href="/admin" target="_blank">/admin</a></li>
        <li><strong>Create Blog Post:</strong> <a href="/admin/create" target="_blank">/admin/create</a></li>
        <li><strong>Public Blog Example:</strong> <a href="/posts/my-first-blog" target="_blank">/posts/my-first-blog</a></li>
      </ul>

      <p style={{ marginTop: '2rem', fontStyle: 'italic' }}>
        Tip: You can add new posts, edit or delete them from the admin dashboard.
      </p>
    </div>
  );
}
