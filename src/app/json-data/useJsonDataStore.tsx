import {useState} from "react";
import {JsonDataFactory} from "./jsonData.types.ts";
import {useInjection} from "inversify-react";
import {JSON_DATA_TYPES} from "@/app/json-data/jsonData.constants.ts";

function useJsonDataStore(id: string) {
  const factory = useInjection<JsonDataFactory>(JSON_DATA_TYPES.JsonDataFactory);

  const [store] = useState(() => {
    return factory(id);
  })

  return store
}

export default useJsonDataStore
