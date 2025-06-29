import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function AdminDashboard() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPosts = async () => {
    const res = await fetch('/api/posts');
    const data = await res.json();
    setPosts(data.posts || []);
    setLoading(false);
  };

  const handleDelete = async (slug) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const res = await fetch(`/api/posts/${slug}`, {
      method: 'DELETE',
    });
    if (res.ok) {
      alert('Post deleted');
      fetchPosts(); // Refresh list
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div style={{ maxWidth: '800px', margin: 'auto', padding: '2rem' }}>
      <h1>Admin Dashboard</h1>
      {loading ? <p>Loading...</p> : (
        <ul>
          {posts.map(post => (
            <li key={post._id} style={{ marginBottom: '1rem' }}>
              <strong>{post.title}</strong> — <em>{post.slug}</em><br />
              <Link href={`/posts/${post.slug}`} target="_blank">View</Link> |{' '}
              <Link href={`/admin/edit?slug=${post.slug}`}>Edit</Link> |{' '}
              <button onClick={() => handleDelete(post.slug)} style={{ color: 'red', background: 'none', border: 'none', cursor: 'pointer' }}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
