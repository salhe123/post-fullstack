import { CommentRepository } from './repositories/comment.repository';
import { CreateCommentCommand } from './commands/create-comment.command';
import { GetCommentsQuery } from './queries/get-comments.query';
import { Comment } from './entities/comment.entity';
export declare class CommentsService {
    private readonly commentRepository;
    constructor(commentRepository: CommentRepository);
    createComment(command: CreateCommentCommand): Promise<Comment>;
    getComments(query: GetCommentsQuery): Promise<Comment[]>;
}
