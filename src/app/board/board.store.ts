import {inject, injectable} from "inversify";
import {makeAutoObservable} from "mobx";
import {BOARD_TYPES} from "./board.constants.ts";
import {BoardService} from "./board.service.ts";


@injectable()
export class BoardStore {
  service: BoardService;


  constructor(
    @inject(BOARD_TYPES.BoardService) service: BoardService
  ) {
    makeAutoObservable(this, {service: false}, { autoBind: true })
  }

}