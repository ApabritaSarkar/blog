import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import slugify from 'slugify';
import Head from 'next/head';

export default async function handler(req, res) {
  await dbConnect();
  const { slug } = req.query;

  if (req.method === 'GET') {
    const post = await Post.findOne({ slug }).lean();
    if (!post) return res.status(404).json({ error: 'Post not found' });

    post._id = post._id.toString();
    post.createdAt = post.createdAt.toString();
    post.updatedAt = post.updatedAt.toString();

    return res.status(200).json({ post });
  }

  if (req.method === 'PUT') {
    const { title, content } = req.body;
    const newSlug = slugify(title, { lower: true, strict: true });

    const updated = await Post.findOneAndUpdate(
      { slug },
      { title, content, slug: newSlug },
      { new: true }
    );

    if (!updated) return res.status(404).json({ error: 'Post not found' });

    return res.status(200).json({ post: updated });
  }

  if (req.method === 'DELETE') {
    const deleted = await Post.findOneAndDelete({ slug });
    if (!deleted) return res.status(404).json({ error: 'Post not found' });

    return res.status(200).json({ message: 'Post deleted' });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
