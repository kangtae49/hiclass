import "reflect-metadata";
import {Container} from "inversify";
import {excalidrawModule} from "@/app/excalidraw/excalidraw.module.ts";
import {excalidrawDataModule} from "@/app/excalidraw-data/excalidrawData.module.ts";
import {toJS} from "mobx";
import {jsonDataModule} from "@/app/json-data/jsonData.module.ts";
import {boardModule} from "@/app/board/board.module.ts";
import {justLayoutModule} from "@kangtae49/just-layout";

const container = new Container();


const appModules = [
  justLayoutModule,
  jsonDataModule,
  boardModule,
  excalidrawModule,
  excalidrawDataModule,
]
container.load(
  ...appModules
);

// const storeCache = new Map<string, any>();


// if (process.env.NODE_ENV === 'development') {
//   (window as any).container = container;
//   (window as any).toJS = toJS;
// }


// const getF = (facId: string, storeId: string) => {
//   return container.get(Symbol.for(facId))(storeId)
// }

// (window as any).storeCache = storeCache;
(window as any).toJS = toJS;
// toJS(storeCache.get('LAYOUT_ID').layout)


export { container };