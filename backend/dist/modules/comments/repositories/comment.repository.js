"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentRepository = void 0;
const typeorm_1 = require("typeorm");
const comment_entity_1 = require("../entities/comment.entity");
const common_1 = require("@nestjs/common");
const typeorm_2 = require("@nestjs/typeorm");
let CommentRepository = class CommentRepository {
    repo;
    constructor(repo) {
        this.repo = repo;
    }
    async findByPostId(postId) {
        return this.repo.find({
            where: { post: { id: postId } },
            relations: ['author'],
        });
    }
    async save(comment) {
        return this.repo.save(comment);
    }
};
exports.CommentRepository = CommentRepository;
exports.CommentRepository = CommentRepository = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_1.Repository])
], CommentRepository);
//# sourceMappingURL=comment.repository.js.map