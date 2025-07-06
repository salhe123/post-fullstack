import { PostsService } from '../posts.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { UpdatePostDto } from '../dtos/update-post.dto';
import { Post as PostEntity } from '../entities/post.entity';
interface AuthRequest extends Request {
    user: {
        id: string;
    };
}
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(dto: CreatePostDto, req: AuthRequest): Promise<PostEntity>;
    update(id: string, dto: UpdatePostDto, req: AuthRequest): Promise<PostEntity>;
    delete(id: string, req: AuthRequest): Promise<void>;
    get(id: string): Promise<PostEntity | null>;
    getAll(): Promise<PostEntity[]>;
}
export {};
