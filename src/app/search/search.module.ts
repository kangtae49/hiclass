import {ContainerModule, Factory, ResolutionContext} from "inversify";
import {SearchStore} from "./search.store.ts";
import {SearchService} from "./search.service.ts";
import {SEARCH_TYPES} from "./search.constants.ts";


export const searchModule = new ContainerModule(({bind}) => {
  bind(SEARCH_TYPES.SearchService).to(SearchService).inSingletonScope();
  bind(SEARCH_TYPES.SearchStore).to(SearchStore).inTransientScope();

  bind<Map<string, SearchStore>>(SEARCH_TYPES.SearchStoreCacheMap).toConstantValue(new Map());
  bind<Factory<SearchStore>>(SEARCH_TYPES.SearchFactory)
    .toFactory((context: ResolutionContext) => {
      const cacheMap = context.get<Map<string, SearchStore>>(SEARCH_TYPES.SearchStoreCacheMap);

      return (id: string) => {
        if (!cacheMap.has(id)) {
          const newStore = context.get<SearchStore>(SEARCH_TYPES.SearchStore);
          cacheMap.set(id, newStore);
        }
        return cacheMap.get(id)!;
      }
    })
});