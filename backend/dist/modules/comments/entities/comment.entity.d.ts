import { Post } from '../../posts/entities/post.entity';
import { User } from '../../auth/entities/user.entity';
export declare class Comment {
    id: string;
    content: string;
    post: Post;
    author: User;
}
