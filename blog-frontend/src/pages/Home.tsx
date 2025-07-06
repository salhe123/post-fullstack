import { useEffect, useState } from "react";
import { getPosts } from "../services/post.service";
import PostCard from "../components/PostCard";
import type { Post } from "../types/index";

const Home = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response);
      } catch (err) {
        setError("Failed to load posts.");
      }
    };
    fetchPosts();
  }, []);

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Blog Posts</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Home;
