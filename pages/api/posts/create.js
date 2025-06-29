import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import slugify from 'slugify';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { title, content } = req.body;

      if (!title || !content) {
        return res.status(400).json({ error: 'Title and content are required' });
      }

      const slug = slugify(title, { lower: true, strict: true });

      const existingPost = await Post.findOne({ slug });
      if (existingPost) {
        return res.status(409).json({ error: 'A post with this slug already exists' });
      }

      const newPost = await Post.create({ title, content, slug });

      res.status(201).json({ message: 'Post created', post: newPost });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
