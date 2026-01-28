import {inject, injectable} from "inversify";
import {makeAutoObservable} from "mobx";
import {BOARD_TYPES} from "./board.constants.ts";
import {BoardService} from "./board.service.ts";

interface Post {
  boardId: string,
  postId: string
}

@injectable()
export class BoardStore {
  service: BoardService;
  post: Post | null = null;
  showContent: boolean = true
  showComment: boolean = true
  showAttach: boolean = true

  constructor(
    @inject(BOARD_TYPES.BoardService) service: BoardService
  ) {
    makeAutoObservable(this, {service: false}, { autoBind: true })
  }

  setPost = (payload: Post) => { this.post = payload }

  setShowContent = (payload: boolean) => { this.showContent = payload }
  setShowComment = (payload: boolean) => { this.showComment = payload }
  setShowAttach = (payload: boolean) => { this.showAttach = payload }

}