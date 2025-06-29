import dbConnect from '@/lib/dbConnect';
import Post from '@/models/Post';
import Head from 'next/head';

export async function getServerSideProps(context) {
  const { slug } = context.params;

  await dbConnect();

  const post = await Post.findOne({ slug }).lean();

  if (!post) {
    return { notFound: true };
  }

  post._id = post._id.toString();
  post.createdAt = post.createdAt.toString();
  post.updatedAt = post.updatedAt.toString();

  return {
    props: {
      post,
    },
  };
}

export default function PostPage({ post }) {
  return (
    <>
      <Head>
        <title>{post.title} | GreenVerse Blog</title>
        <meta
          name="description"
          content={post.content.replace(/<[^>]+>/g, '').slice(0, 160)}
        />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.content.replace(/<[^>]+>/g, '').slice(0, 160)}
        />
      </Head>

      <article className="max-w-3xl mx-auto py-16 px-4 prose prose-green prose-lg">
        <h1 className="mb-6 text-4xl font-bold text-green-700">{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </article>
    </>
  );
}
