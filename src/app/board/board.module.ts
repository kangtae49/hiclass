import {ContainerModule, Factory, ResolutionContext} from "inversify";
import {BoardStore} from "./board.store.ts";
import {BoardService} from "./board.service.ts";
import {BOARD_TYPES} from "./board.constants.ts";


export const boardModule = new ContainerModule(({bind}) => {
  bind(BOARD_TYPES.BoardService).to(BoardService).inSingletonScope();
  bind(BOARD_TYPES.BoardStore).to(BoardStore).inTransientScope();

  bind<Map<string, BoardStore>>(BOARD_TYPES.BoardStoreCacheMap).toConstantValue(new Map());
  bind<Factory<BoardStore>>(BOARD_TYPES.BoardFactory)
    .toFactory((context: ResolutionContext) => {
      const cacheMap = context.get<Map<string, BoardStore>>(BOARD_TYPES.BoardStoreCacheMap);

      return (id: string) => {
        if (!cacheMap.has(id)) {
          const newStore = context.get<BoardStore>(BOARD_TYPES.BoardStore);
          cacheMap.set(id, newStore);
        }
        return cacheMap.get(id)!;
      }
    })
});