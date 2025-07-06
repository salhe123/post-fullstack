export interface User {
  id: string;
  email: string;
  name: string;
  role: string;
}

export interface Post {
  id: string;
  title: string;
  content: string;
  author: User;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  post: Post;
  author: User;
}
