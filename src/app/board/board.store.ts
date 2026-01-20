import {inject, injectable} from "inversify";
import {makeAutoObservable} from "mobx";
import {BOARD_TYPES} from "./board.types.ts";
import {BoardService} from "./board.service.ts";

interface Post {
  boardId: string,
  postId: string
}

@injectable()
export class BoardStore {
  service: BoardService;
  post: Post | null = null;

  constructor(
    @inject(BOARD_TYPES.BoardService) service: BoardService
  ) {
    makeAutoObservable(this, {service: false}, { autoBind: true })
  }

  setPost = (payload: Post) => { this.post = payload }

}