import {SearchStore} from "./search.store.ts";

export type SearchFactory = (id: string) => SearchStore;


