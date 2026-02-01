
import {useState} from "react";
import {type SearchFactory} from "./search.types.ts";
import {useInjection} from "inversify-react";
import {SEARCH_TYPES} from "./search.constants.ts";

function useSearchStore(id: string) {
  const factory = useInjection<SearchFactory>(SEARCH_TYPES.SearchFactory);

  const [store] = useState(() => {
    return factory(id);
  })

  return store
}

export default useSearchStore
