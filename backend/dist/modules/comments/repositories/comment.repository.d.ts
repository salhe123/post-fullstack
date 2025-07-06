import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';
export declare class CommentRepository {
    private readonly repo;
    constructor(repo: Repository<Comment>);
    findByPostId(postId: string): Promise<Comment[]>;
    save(comment: Comment): Promise<Comment>;
}
