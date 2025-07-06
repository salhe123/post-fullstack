"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateCommentCommand = void 0;
class CreateCommentCommand {
    content;
    postId;
    authorId;
    constructor(content, postId, authorId) {
        this.content = content;
        this.postId = postId;
        this.authorId = authorId;
    }
}
exports.CreateCommentCommand = CreateCommentCommand;
//# sourceMappingURL=create-comment.command.js.map