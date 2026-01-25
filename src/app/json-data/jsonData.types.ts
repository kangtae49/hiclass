import {JsonDataStore} from "./jsonData.store.ts";

export interface JsonData {
  path: string,
  timestamp?: number,
  isLocked?: boolean,
  data: any
}

export type JsonDataMap = Record<string, JsonData>

export type JsonDataFactory = (id: string) => JsonDataStore;


