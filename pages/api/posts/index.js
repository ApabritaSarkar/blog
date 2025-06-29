import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    const posts = await Post.find().sort({ createdAt: -1 }).lean();
    return res.status(200).json({ posts });
  }

  res.status(405).json({ error: 'Method not allowed' });
}
