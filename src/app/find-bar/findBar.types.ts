import {FindBarStore} from "./findBar.store.ts";

export type FindBarFactory = (id: string) => FindBarStore;