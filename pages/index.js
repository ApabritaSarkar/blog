export default function HomePage() {
  return (
    <div className="max-w-3xl mx-auto py-16 px-4 text-center">
      <h1 className="text-4xl font-bold mb-4 text-green-600">🌿 Welcome to GreenVerse Blog</h1>
      <p className="text-gray-600 mb-8">A full-stack blog built with Next.js + MongoDB.</p>

      <div className="text-left">
        <h2 className="text-xl font-semibold mb-2">🔗 Useful Links</h2>
        <ul className="list-disc list-inside space-y-2 text-blue-600">
          <li><a href="/admin" target="_blank">Admin Dashboard</a></li>
          <li><a href="/admin/create" target="_blank">Create Blog Post</a></li>
          <li><a href="/posts/my-first-blog" target="_blank">Example Blog Post</a></li>
        </ul>
      </div>
    </div>
  );
}
