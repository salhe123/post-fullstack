import { PostRepository } from './repositories/post.repository';
import { CreatePostCommand } from './commands/create-post.command';
import { UpdatePostCommand } from './commands/update-post.command';
import { DeletePostCommand } from './commands/delete-post.command';
import { GetPostQuery } from './queries/get-post.query';
import { GetPostsQuery } from './queries/get-posts.query';
import { Post } from './entities/post.entity';
export declare class PostsService {
    private readonly postRepository;
    constructor(postRepository: PostRepository);
    createPost(command: CreatePostCommand): Promise<Post>;
    updatePost(command: UpdatePostCommand): Promise<Post>;
    deletePost(command: DeletePostCommand): Promise<void>;
    getPost(query: GetPostQuery): Promise<Post | null>;
    getPosts(_query: GetPostsQuery): Promise<Post[]>;
}
