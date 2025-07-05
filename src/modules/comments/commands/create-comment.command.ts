export class CreateCommentCommand {
  constructor(
    public readonly content: string,
    public readonly postId: string,
    public readonly authorId: string,
  ) {}
}
