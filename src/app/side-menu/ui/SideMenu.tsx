import "./SideMenu.css"
import Jdenticon from "react-jdenticon";
import IconMinimize from "@/assets/minimize.svg?react"
import {JustUtil} from "@/app/components/just-layout/justUtil.ts";
import {CONTENTS_VIEW, SIDE_MENU_NODE_NAME} from "@/app/layout/layout";
import {useJustLayoutStore} from "@/app/components/just-layout/useJustLayoutStore.ts";
import {JustId} from "@/app/components/just-layout/justLayout.types.ts";
import {observer} from "mobx-react-lite";
import pathUtils from "@/utils/pathUtils.ts";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import {useEffect} from "react";

interface Props {
  justId: JustId
  layoutId: string
}
const SideMenu = observer(({justId: _justId, layoutId}: Props) => {
  const justLayoutStore = useJustLayoutStore(layoutId)
  const boardListKey = pathUtils.getScriptSubPath("data\\board_list.json")
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)

  const toggleSideMenu = () => {
    justLayoutStore.toggleWin({nodeName: SIDE_MENU_NODE_NAME})
  }

  const openBoard = (board: {boardId: string, boardNm: string}) => {
    const justId: JustId = {viewId: "board-list-view", title: board.boardNm, params: board}
    console.log('openBoard', justId)
    justLayoutStore.openWinByNodeName({justId, nodeName: CONTENTS_VIEW})
  }
  // const openWin = (justId: JustId) => {
  //   justLayoutStore.openWinMenu({justId, nodeName: CONTENTS_VIEW})
  // }

  useEffect(() => {
    console.log(boardListKey)
    window.api.addWatchPath([boardListKey])
  }, [])

  useEffect(() => {
    if (!jsonDataStore.jsonDataMap[boardListKey]?.data) return;
    console.log(jsonDataStore.jsonDataMap[boardListKey])

  }, [jsonDataStore.jsonDataMap[boardListKey]])


  return (
    <div className="side-menu">
      <div className="side-menu-title">
        <div className="side-menu-name">햇살반</div>
        <div className="side-menu-minimize side-menu-icon" onClick={toggleSideMenu}><IconMinimize /></div>
      </div>
      <div className="side-menu-items">
        {
          jsonDataStore.jsonDataMap[boardListKey]?.data.boardList.map(item =>
            <div key={JustUtil.toString(item.boardId)} className="side-menu-item" onClick={() => openBoard(item)}>
              <div className="side-menu-icon">
                <Jdenticon size="25" value={item.boardNm} />
              </div>
              <div className="side-menu-name">{item.boardNm}</div>
            </div>
          )
        }
      </div>
    </div>
  )
})

export default SideMenu