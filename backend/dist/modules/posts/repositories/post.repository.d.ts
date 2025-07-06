import { Repository } from 'typeorm';
import { Post } from '../entities/post.entity';
export declare class PostRepository {
    private readonly repo;
    constructor(repo: Repository<Post>);
    findAll(): Promise<Post[]>;
    findById(id: string): Promise<Post | null>;
    save(post: Post): Promise<Post>;
    delete(id: string): Promise<void>;
}
