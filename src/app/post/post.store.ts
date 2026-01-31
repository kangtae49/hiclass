import {inject, injectable} from "inversify";
import {makeAutoObservable} from "mobx";
import {POST_TYPES} from "./post.constants.ts";
import {PostService} from "./post.service.ts";
import {Post} from "./post.types.ts";

@injectable()
export class PostStore {
  service: PostService;
  post: Post | null = null;
  showContent: boolean = true
  showComment: boolean = true
  showAttach: boolean = true


  constructor(
    @inject(POST_TYPES.PostService) service: PostService
  ) {
    makeAutoObservable(this, {service: false}, { autoBind: true })
  }

  setPost = (payload: Post) => { this.post = payload }

  setShowContent = (payload: boolean) => { this.showContent = payload }
  setShowComment = (payload: boolean) => { this.showComment = payload }
  setShowAttach = (payload: boolean) => { this.showAttach = payload }

}