import {PostStore} from "./post.store.ts";

export type PostFactory = (id: string) => PostStore;

export interface Post {
  boardId: string,
  postId: string
}

