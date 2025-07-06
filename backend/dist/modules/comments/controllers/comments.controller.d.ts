import { CommentsService } from '../comments.service';
import { CreateCommentDto } from '../dtos/create-comment.dto';
import { Comment } from '../entities/comment.entity';
export declare class CommentsController {
    private readonly commentsService;
    constructor(commentsService: CommentsService);
    create(postId: string, dto: CreateCommentDto, req: any): Promise<Comment>;
    getAll(postId: string): Promise<Comment[]>;
}
