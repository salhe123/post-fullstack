"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePostCommand = void 0;
class UpdatePostCommand {
    id;
    title;
    content;
    authorId;
    constructor(id, title, content, authorId) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.authorId = authorId;
    }
}
exports.UpdatePostCommand = UpdatePostCommand;
//# sourceMappingURL=update-post.command.js.map