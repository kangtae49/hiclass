
import {useState} from "react";
import {type FindBarFactory} from "./findBar.types.ts";
import {useInjection} from "inversify-react";
import {FIND_BAR_TYPES} from "./findBar.constants.ts";

function useFindBarStore(id: string) {
  const factory = useInjection<FindBarFactory>(FIND_BAR_TYPES.FindBarFactory);

  const [store] = useState(() => {
    return factory(id);
  })

  return store
}

export default useFindBarStore
