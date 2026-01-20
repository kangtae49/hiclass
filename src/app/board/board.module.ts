import { ContainerModule, Factory  } from "inversify";
import {container, storeCache} from "@/inversify.config.ts";
import {BOARD_TYPES} from "./board.types.ts";
import {BoardStore} from "./board.store.ts";
import {BoardService} from "./board.service.ts";



export const boardModule = new ContainerModule(({bind}) => {
  bind(BOARD_TYPES.BoardService).to(BoardService).inSingletonScope();
  bind(BOARD_TYPES.BoardStore).to(BoardStore).inTransientScope();

  bind<Factory<BoardStore>>(BOARD_TYPES.BoardFactory)
    .toFactory((_context) => {
      return (id: string) => {
        if (!storeCache.has(id)) {
          const newStore = container.get<BoardStore>(BOARD_TYPES.BoardStore);
          storeCache.set(id, newStore);
        }
        return storeCache.get(id)!;
      }
    })
});