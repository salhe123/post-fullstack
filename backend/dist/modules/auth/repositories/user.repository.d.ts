import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UserRepository {
    private readonly repo;
    constructor(repo: Repository<User>);
    findByEmail(email: string): Promise<User | null>;
    save(user: User): Promise<User>;
}
