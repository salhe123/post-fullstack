import { Post } from '../entities/post.entity';

export interface PostRepository {
  create(post: Partial<Post>): Promise<Post>;
  findOne(id: number): Promise<Post>;
  findOneWithComments(id: number): Promise<Post>;
  findAll(): Promise<Post[]>;
  update(id: number, post: Partial<Post>): Promise<Post>;
  delete(id: number): Promise<void>;
}
