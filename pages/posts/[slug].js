import dbConnect from "@/lib/dbConnect";
import Post from "@/models/Post";
import Head from "next/head";

export async function getServerSideProps(context) {
  const { slug } = context.params;

  await dbConnect();

  const post = await Post.findOne({ slug }).lean();

  if (!post) {
    return { notFound: true };
  }

  // Fix: Convert _id and dates to strings
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
          content={post.content.replace(/<[^>]+>/g, "").slice(0, 160)}
        />
        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.content.replace(/<[^>]+>/g, "").slice(0, 160)}
        />
      </Head>

      <div style={{ maxWidth: "700px", margin: "auto", padding: "2rem" }}>
        <h1>{post.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: post.content }} />
      </div>
    </>
  );
}
