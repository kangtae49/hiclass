import {ContainerModule, Factory, ResolutionContext} from "inversify";
import {PostStore} from "./post.store.ts";
import {PostService} from "./post.service.ts";
import {POST_TYPES} from "./post.constants.ts";


export const postModule = new ContainerModule(({bind}) => {
  bind(POST_TYPES.PostService).to(PostService).inSingletonScope();
  bind(POST_TYPES.PostStore).to(PostStore).inTransientScope();

  bind<Map<string, PostStore>>(POST_TYPES.PostStoreCacheMap).toConstantValue(new Map());
  bind<Factory<PostStore>>(POST_TYPES.PostFactory)
    .toFactory((context: ResolutionContext) => {
      const cacheMap = context.get<Map<string, PostStore>>(POST_TYPES.PostStoreCacheMap);

      return (id: string) => {
        if (!cacheMap.has(id)) {
          const newStore = context.get<PostStore>(POST_TYPES.PostStore);
          cacheMap.set(id, newStore);
        }
        return cacheMap.get(id)!;
      }
    })
});