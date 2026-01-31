
import {useState} from "react";
import {type PostFactory} from "./post.types.ts";
import {useInjection} from "inversify-react";
import {POST_TYPES} from "./post.constants.ts";

function usePostStore(id: string) {
  const factory = useInjection<PostFactory>(POST_TYPES.PostFactory);

  const [store] = useState(() => {
    return factory(id);
  })

  return store
}

export default usePostStore
