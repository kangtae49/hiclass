import { useState } from "react";
import { ExcalidrawDataFactory } from "./excalidrawData.types";
import {EXCALIDRAW_DATA_TYPES} from "@/app/excalidraw-data/excalidrawData.constants.ts";
import {useInjection} from "inversify-react";

export const useExcalidrawDataStore = (id: string) => {
  const factory = useInjection<ExcalidrawDataFactory>(EXCALIDRAW_DATA_TYPES.ExcalidrawDataFactory);
  const [store] = useState(() => {
    return factory(id);
  });

  return store;
};