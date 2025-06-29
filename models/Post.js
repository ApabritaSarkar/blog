import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String, // Will store HTML string from React-Quill
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

// Prevent model overwrite in development (hot reload fix)
export default mongoose.models.Post || mongoose.model('Post', PostSchema);
