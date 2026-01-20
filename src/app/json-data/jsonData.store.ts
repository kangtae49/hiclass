import {inject, injectable} from "inversify";
import {makeAutoObservable} from "mobx";
import {JSON_DATA_TYPES, JsonData, JsonDataMap} from "./jsonData.types.ts";
import {JsonDataService} from "./jsonData.service.ts";

export interface JsonDataPlayloadIsLocked {
  key: string
  isLocked: boolean
}

@injectable()
export class JsonDataStore {
  service: JsonDataService;
  jsonDataMap: JsonDataMap = {}

  constructor(
    @inject(JSON_DATA_TYPES.JsonDataService) service: JsonDataService
  ) {
    makeAutoObservable(this, {service: false}, { autoBind: true })
  }

  setJsonDataMap = (payload: JsonDataMap) => {
    this.jsonDataMap = payload
  }

  updateJsonDataMap = (payload: JsonDataMap) => {

    this.jsonDataMap = {
      ...this.jsonDataMap,
      ...payload,
    }
  }

  updateJsonData = (payload: JsonData) =>  {
    const existing = this.jsonDataMap[payload.path] || {};
    const newJsonData: JsonData = {
      ...existing,
      data: payload.data,
      timestamp: payload.timestamp,
    } as JsonData

    this.jsonDataMap = {
      ...this.jsonDataMap,
      [payload.path]: newJsonData
    }
  }

  updateIsLocked = (payload: JsonDataPlayloadIsLocked) => {
    const existing = this.jsonDataMap[payload.key] || {};
    const newJsonData: JsonData = {
      ...existing,
      isLocked: payload.isLocked
    } as JsonData

    this.jsonDataMap = {
      ...this.jsonDataMap,
      [payload.key]: newJsonData
    }
  }

}