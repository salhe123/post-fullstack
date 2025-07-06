"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseConfig = void 0;
const user_entity_1 = require("../modules/auth/entities/user.entity");
const post_entity_1 = require("../modules/posts/entities/post.entity");
const comment_entity_1 = require("../modules/comments/entities/comment.entity");
exports.databaseConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL || 'postgres://blog_user:123456@db:5432/blog',
    entities: [user_entity_1.User, post_entity_1.Post, comment_entity_1.Comment],
    synchronize: true,
    retryAttempts: 10,
    retryDelay: 3000,
};
//# sourceMappingURL=database.config.js.map