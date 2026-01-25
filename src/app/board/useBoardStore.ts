import {useState} from "react";
import {type BoardFactory} from "./board.types.ts";
import {useInjection} from "inversify-react";
import {BOARD_TYPES} from "./board.constants.ts";

function useBoardStore(id: string) {
  const factory = useInjection<BoardFactory>(BOARD_TYPES.BoardFactory);

  const [store] = useState(() => {
    return factory(id);
  })

  return store
}

export default useBoardStore
