import {useState} from "react";
import {BOARD_TYPES, BoardFactory} from "./board.types.ts";
import {container} from "@/inversify.config.ts";

function useBoardStore(id: string) {
  const [store] = useState(() => {
    const factory = container.get<BoardFactory>(BOARD_TYPES.BoardFactory);
    return factory(id);
  })

  return store
}

export default useBoardStore
