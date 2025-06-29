export default function HomePage() {
  return (
    <div style={{ textAlign: 'center', padding: '4rem' }}>
      <h1>🌿 Welcome to Blog</h1>
      <p>Use <code>/admin</code> to manage blog posts.</p>
      <p>Use <code>/posts/[slug]</code> to view public blog pages.</p>
    </div>
  );
}
