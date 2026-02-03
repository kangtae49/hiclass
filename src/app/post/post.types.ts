import {PostStore} from "./post.store.ts";

export type PostFactory = (id: string) => PostStore;

export interface Post {
  boardId: string,
  postId: string
}

export interface JsonPost {
  postId: string
  posted: number
  postTitle: string
  postContent: string
  commentCount: number
  files: JsonFile []
  board: JsonBoard
  writeUser: JsonWriteUser
}

export interface JsonFile {
  seq: number
  fileName: string
  fileContentType: string
  fileOriginalPath: string
  fileConvertPath: string | null
  fileTranscodePath: string | null
}

export interface JsonBoard {
  boardId: string
  boardName: string
}

export interface JsonPage {
  totalElements: number
}

export interface JsonComment {
  comment: string
  writeUser: JsonWriteUser
  files: JsonFile []
  currentId: string
  reactions: any [] | null
}

export interface JsonWriteUser {
  userName: string
}

