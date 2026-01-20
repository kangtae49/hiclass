import "./BoardListView.css"
import {observer} from "mobx-react-lite";
import {JustId} from "@/app/components/just-layout/justLayout.types.ts";
import {List} from "react-window";
import BoardListRow from "@/app/board/ui/BoardListRow.tsx";
import {JustUtil} from "@/app/components/just-layout/justUtil.ts";
import pathUtils from "@/utils/pathUtils.ts";
import {useEffect} from "react";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";

interface Props {
  justId: JustId
  layoutId: string
}

const BoardListView = observer(({justId, layoutId}: Props) => {
  console.log("BoardListView", justId)
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)
  const boardId = JustUtil.getParamString(justId, "boardId")!
  const boardListKey = pathUtils.getScriptSubPath(`data\\${boardId}.json`)


  useEffect(() => {
    window.api.addWatchPath([boardListKey])
  }, [])
  const data = jsonDataStore.jsonDataMap[boardListKey]?.data
  const count = data?.page.totalElements ?? 0

  return (
    <div className="board-list-view">
      <div className="board-list-title">
        <div className="board-list-name">{JustUtil.getParamString(justId, "boardNm")}</div>
      </div>
      <div className="board-list-content">
        <List
            className="board-list-table"
            rowComponent={BoardListRow}
            rowCount={count}
          // rowCount={200}
            rowHeight={25}
            rowProps={{
              count,
              layoutId,
              boardId,
            }}
            style={{}}
        />
      </div>
    </div>
  )
})

export default BoardListView
