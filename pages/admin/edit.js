import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });

export default function EditPost() {
  const router = useRouter();
  const { slug } = router.query;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  const fetchPost = async () => {
    if (!slug) return;
    const res = await fetch(`/api/posts/${slug}`);
    const data = await res.json();
    if (res.ok) {
      setTitle(data.post.title);
      setContent(data.post.content);
    } else {
      setMessage(data.error || 'Post not found');
    }
    setLoading(false);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Post updated successfully!');
      router.push('/admin');
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  if (loading) return <p>Loading post...</p>;

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: '2rem' }}>
      <h1>Edit Post</h1>
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ width: '100%', padding: '10px', fontSize: '16px', marginBottom: '1rem' }}
        />
        <ReactQuill
          value={content}
          onChange={setContent}
          style={{ height: '300px', marginBottom: '1rem' }}
        />
        <button type="submit" style={{
          background: '#0070f3',
          color: '#fff',
          padding: '10px 20px',
          border: 'none',
          fontSize: '16px',
          cursor: 'pointer',
        }}>
          Update Post
        </button>
        {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
      </form>
    </div>
  );
}
