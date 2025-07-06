import { Post } from '../../posts/entities/post.entity';
import { Comment } from '../../comments/entities/comment.entity';
export declare class User {
    id: string;
    email: string;
    name: string;
    password: string;
    role: string;
    posts: Post[];
    comments: Comment[];
}
