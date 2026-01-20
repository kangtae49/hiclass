import { ContainerModule, Factory  } from "inversify";
import {container, storeCache} from "@/inversify.config.ts";
import {JSON_DATA_TYPES} from "./jsonData.types.ts";
import {JsonDataStore} from "./jsonData.store.ts";
import {JsonDataService} from "./jsonData.service.ts";

// const storeCache = new Map<string, GridDataStore>();


export const jsonDataModule = new ContainerModule(({bind}) => {
  bind(JSON_DATA_TYPES.JsonDataService).to(JsonDataService).inSingletonScope();
  bind(JSON_DATA_TYPES.JsonDataStore).to(JsonDataStore).inTransientScope();

  bind<Factory<JsonDataStore>>(JSON_DATA_TYPES.JsonDataFactory)
    .toFactory((_context) => {
      return (id: string) => {
        if (!storeCache.has(id)) {
          const newStore = container.get<JsonDataStore>(JSON_DATA_TYPES.JsonDataStore);
          storeCache.set(id, newStore);
        }
        return storeCache.get(id)!;
      }
    })
});