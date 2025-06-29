import { useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export default function CreatePost() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch("/api/posts/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, content }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Something went wrong");

      setMessage("✅ Post created successfully!");
      setTitle("");
      setContent("");
    } catch (err) {
      setMessage(`❌ Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "700px", margin: "auto", padding: "2rem" }}>
      <h1>Create New Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter blog title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{
            width: "100%",
            padding: "10px",
            fontSize: "16px",
            marginBottom: "1rem",
          }}
        />
        <ReactQuill
          theme="snow"
          value={content}
          onChange={setContent}
          placeholder="Write your blog content here..."
          style={{ height: "300px", marginBottom: "1rem" }}
        />
        <button
          type="submit"
          disabled={loading}
          style={{
            background: "#0070f3",
            color: "#fff",
            padding: "10px 20px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          {loading ? "Creating..." : "Create Post"}
        </button>
        {message && (
          <p style={{ marginTop: "1rem", fontWeight: "bold" }}>{message}</p>
        )}
      </form>
    </div>
  );
}
