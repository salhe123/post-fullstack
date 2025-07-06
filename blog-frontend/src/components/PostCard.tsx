import { Link } from "react-router-dom";
import type { Post } from "../types/index";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition">
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      <p className="text-gray-600 mb-4">{post.content.substring(0, 100)}...</p>
      <Link to={`/posts/${post.id}`} className="text-blue-600 hover:underline">
        Read More
      </Link>
    </div>
  );
};

export default PostCard;
