import { useEffect, useState, type FormEvent } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getPost, deletePost } from "../services/post.service";
import { createComment, getComments } from "../services/comment.service";
import CommentCard from "../components/CommentCard";
import type { Post, Comment } from "../types";
import { useAuthStore } from "../store/authStore";

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const postData = await getPost(id!);
        setPost(postData);
        const commentData = await getComments(id!);
        setComments(commentData);
      } catch (err) {
        setError("Failed to load post or comments.");
      }
    };
    fetchPost();
  }, [id]);

  const handleCommentSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!user) {
      navigate("/login");
      return;
    }
    try {
      const comment = await createComment(id!, newComment, user.token);
      setComments([...comments, comment]);
      setNewComment("");
    } catch (err) {
      setError("Failed to add comment.");
    }
  };

  const handleDelete = async () => {
    if (!user) return;
    try {
      await deletePost(id!, user.token);
      navigate("/");
    } catch (err) {
      setError("Failed to delete post.");
    }
  };

  if (!post) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500">By {post.author.name}</p>
      {user && (user.role === "ADMIN" || user.email === post.author.email) && (
        <div className="flex space-x-4 mt-4">
          <Link
            to={`/posts/edit/${id}`}
            className="text-blue-600 hover:underline"
          >
            Edit
          </Link>
          <button
            onClick={handleDelete}
            className="text-red-600 hover:underline"
          >
            Delete
          </button>
        </div>
      )}
      <h2 className="text-2xl font-semibold mt-8 mb-4">Comments</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {comments.map((comment) => (
        <CommentCard key={comment.id} comment={comment} />
      ))}
      {user && (
        <form onSubmit={handleCommentSubmit} className="mt-6">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Add a comment..."
            required
          />
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white p-2 rounded-md hover:bg-blue-700 transition"
          >
            Post Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default PostDetail;
