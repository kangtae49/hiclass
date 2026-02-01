import {inject, injectable} from "inversify";
import {makeAutoObservable} from "mobx";
import {SEARCH_TYPES} from "./search.constants.ts";
import {SearchService} from "./search.service.ts";

@injectable()
export class SearchStore {
  service: SearchService;
  searchText: string = ''
  postList: any [] = []

  constructor(
    @inject(SEARCH_TYPES.SearchService) service: SearchService
  ) {
    makeAutoObservable(this, {service: false}, { autoBind: true })
  }

  setSearchText = (payload: string) => { this.searchText = payload }
  setPostList = (payload: any[]) => { this.postList = payload }
}