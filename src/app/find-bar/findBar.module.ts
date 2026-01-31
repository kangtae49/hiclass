import {ContainerModule, Factory, ResolutionContext} from "inversify";
import {FindBarStore} from "./findBar.store.ts";
import {FindBarService} from "./findBar.service.ts";
import {FIND_BAR_TYPES} from "./findBar.constants.ts";


export const findBarModule = new ContainerModule(({bind}) => {
  bind(FIND_BAR_TYPES.FindBarService).to(FindBarService).inSingletonScope();
  bind(FIND_BAR_TYPES.FindBarStore).to(FindBarStore).inTransientScope();

  bind<Map<string, FindBarStore>>(FIND_BAR_TYPES.FindBarStoreCacheMap).toConstantValue(new Map());
  bind<Factory<FindBarStore>>(FIND_BAR_TYPES.FindBarFactory)
    .toFactory((context: ResolutionContext) => {
      const cacheMap = context.get<Map<string, FindBarStore>>(FIND_BAR_TYPES.FindBarStoreCacheMap);

      return (id: string) => {
        if (!cacheMap.has(id)) {
          const newStore = context.get<FindBarStore>(FIND_BAR_TYPES.FindBarStore);
          cacheMap.set(id, newStore);
        }
        return cacheMap.get(id)!;
      }
    })
});