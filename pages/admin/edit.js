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
    setMessage('');
    const res = await fetch(`/api/posts/${slug}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });
    const data = await res.json();
    if (res.ok) {
      setMessage('✅ Post updated!');
      router.push('/admin');
    } else {
      setMessage(`❌ ${data.error}`);
    }
  };

  useEffect(() => {
    if (slug) fetchPost();
  }, [slug]);

  if (loading) return <p className="text-center py-12">Loading post...</p>;

  return (
    <div className="max-w-3xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6 text-green-700">✏️ Edit Post</h1>

      <form onSubmit={handleUpdate} className="space-y-6">
        <input
          type="text"
          placeholder="Blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-3 text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        <div className="bg-white rounded-md shadow-md">
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            className="min-h-[200px]"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium"
        >
          Update Post
        </button>

        {message && (
          <div className="text-sm mt-2 font-medium text-center text-blue-700">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}
