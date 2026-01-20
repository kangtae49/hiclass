import {BoardStore} from "./board.store.ts";


export type BoardFactory = (id: string) => BoardStore;

export const BOARD_TYPES = {
  BoardService: Symbol("BoardService"),
  BoardStore: Symbol("BoardStore"),
  BoardFactory: Symbol("BoardFactory"),
}
