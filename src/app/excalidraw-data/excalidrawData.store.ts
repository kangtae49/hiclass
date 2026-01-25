import { injectable, inject } from "inversify";
import {ExcalidrawData, ExcalidrawDataMap} from "./excalidrawData.types";
import { ExcalidrawDataService } from "./excalidrawData.service.ts";
import {makeAutoObservable} from "mobx";
import {EXCALIDRAW_DATA_TYPES} from "@/app/excalidraw-data/excalidrawData.constants.ts";

@injectable()
export class ExcalidrawDataStore {
  service: ExcalidrawDataService;
  excalidrawDataMap: ExcalidrawDataMap = {}

  constructor(
    @inject(EXCALIDRAW_DATA_TYPES.ExcalidrawDataService) service: ExcalidrawDataService
  ) {
    this.service = service;

    makeAutoObservable(this, {
      service: false
    }, { autoBind: true });
  }

  updateExcalidrawData = (payload: ExcalidrawData) => {
    const existing = this.excalidrawDataMap[payload.path] || {};
    const newExcalidrawData: ExcalidrawData = {
      ...existing,
      data: payload.data,
      timestamp: payload.timestamp,
    } as ExcalidrawData

    this.excalidrawDataMap = {
      ...this.excalidrawDataMap,
      [payload.path]: newExcalidrawData
    }
  }

}