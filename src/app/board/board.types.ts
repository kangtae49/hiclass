import {BoardStore} from "./board.store.ts";


export type BoardFactory = (id: string) => BoardStore;


