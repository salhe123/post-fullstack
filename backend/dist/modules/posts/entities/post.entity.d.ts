import { User } from '../../auth/entities/user.entity';
import { Comment } from '../../comments/entities/comment.entity';
export declare class Post {
    id: string;
    title: string;
    content: string;
    author: User;
    comments: Comment[];
}
