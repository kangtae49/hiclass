import {inject, injectable} from "inversify";
import {makeAutoObservable} from "mobx";
import {FIND_BAR_TYPES} from "./findBar.constants.ts";
import {FindBarService} from "./findBar.service.ts";

@injectable()
export class FindBarStore {
  service: FindBarService;

  showFindBar: boolean = false
  findText: string = ''

  constructor(
    @inject(FIND_BAR_TYPES.FindBarService) service: FindBarService
  ) {
    makeAutoObservable(this, {service: false}, { autoBind: true })
  }


  setShowFindBar = (payload: boolean) => { this.showFindBar = payload }
  setFindText = (payload: string) => { this.findText = payload }
}