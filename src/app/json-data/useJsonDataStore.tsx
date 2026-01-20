import {useState} from "react";
import {JSON_DATA_TYPES, JsonDataFactory} from "./jsonData.types.ts";
import {container} from "@/inversify.config.ts";

function useJsonDataStore(id: string) {
  const [store] = useState(() => {
    const factory = container.get<JsonDataFactory>(JSON_DATA_TYPES.JsonDataFactory);
    return factory(id);
  })

  return store
}

export default useJsonDataStore
