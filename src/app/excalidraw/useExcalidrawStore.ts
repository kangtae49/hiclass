import { useState } from "react";
import { ExcalidrawFactory } from "./excalidraw.types";
import {EXCALIDRAW_TYPES} from "@/app/excalidraw/excalidraw.constants.ts";
import {useInjection} from "inversify-react";

export const useExcalidrawStore = (id: string) => {
  const factory = useInjection<ExcalidrawFactory>(EXCALIDRAW_TYPES.ExcalidrawFactory);
  const [store] = useState(() => {
    return factory(id);
  });

  return store;
};