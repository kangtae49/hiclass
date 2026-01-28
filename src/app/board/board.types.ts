import {BoardStore} from "./board.store.ts";


export type BoardFactory = (id: string) => BoardStore;

export interface Post {
  boardId: string,
  postId: string
}

