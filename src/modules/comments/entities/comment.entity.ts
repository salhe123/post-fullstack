import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';
import { User } from '../../auth/entities/user.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  content!: string;

  @ManyToOne(() => Post, (post) => post.comments)
  post!: Post;

  @ManyToOne(() => User, (user) => user.comments)
  author!: User;
}
