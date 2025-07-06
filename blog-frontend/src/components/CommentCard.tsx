import type { Comment } from "../types";

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <div className="bg-gray-50 p-4 rounded-lg shadow-sm mb-2">
      <p className="text-gray-800">{comment.content}</p>
      <p className="text-sm text-gray-500">By {comment.author.name}</p>
    </div>
  );
};

export default CommentCard;
