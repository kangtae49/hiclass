import {ContainerModule, Factory, ResolutionContext} from "inversify";
import {JSON_DATA_TYPES} from "./jsonData.constants.ts";
import {JsonDataStore} from "./jsonData.store.ts";
import {JsonDataService} from "./jsonData.service.ts";

// const storeCache = new Map<string, GridDataStore>();


export const jsonDataModule = new ContainerModule(({bind}) => {
  bind(JSON_DATA_TYPES.JsonDataService).to(JsonDataService).inSingletonScope();
  bind(JSON_DATA_TYPES.JsonDataStore).to(JsonDataStore).inTransientScope();

  bind<Map<string, JsonDataStore>>(JSON_DATA_TYPES.JsonDataStoreCacheMap).toConstantValue(new Map());
  bind<Factory<JsonDataStore>>(JSON_DATA_TYPES.JsonDataFactory)
    .toFactory((context: ResolutionContext) => {
      const cacheMap = context.get<Map<string, JsonDataStore>>(JSON_DATA_TYPES.JsonDataStoreCacheMap);
      return (id: string) => {
        if (!cacheMap.has(id)) {
          const newStore = context.get<JsonDataStore>(JSON_DATA_TYPES.JsonDataStore)
          cacheMap.set(id, newStore);
        }
        return cacheMap.get(id)!;
      }
    })
});