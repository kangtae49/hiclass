import './JustToolBar.css'
import classNames from "classnames";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faBars, faGear, faPen} from "@fortawesome/free-solid-svg-icons"
import {Menu, MenuItem} from "@szhsin/react-menu";
import Jdenticon from "react-jdenticon";
import {JustUtil} from "@/app/components/just-layout/justUtil.ts";
import {
  aboutId, CONTENTS_VIEW, excalidrawViewId,
  INIT_SIDE_MENU_SIZE,
  SIDE_MENU_NODE_NAME, ViewId,
  viewMap
} from "@/app/layout/layout.tsx";
import {useJustLayoutStore} from "@/app/components/just-layout/useJustLayoutStore.ts";
import {JustId} from "@/app/components/just-layout/justLayout.types.ts";
import {observer} from "mobx-react-lite";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import {useEffect} from "react";
import pathUtils from "@/utils/pathUtils.ts";
import {BOARD_ID} from "@/app/board/board.constants.ts";
import useBoardStore from "@/app/board/useBoardStore.ts";

interface Props {
  justId: JustId
  layoutId: string
}

const JustToolBar = observer(({justId: _justId, layoutId}: Props) => {
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

  const openWin = (justId: JustId) => {
    justLayoutStore.openWinMenu({justId, nodeName: CONTENTS_VIEW})
  }

  const size = justLayoutStore.getSizeByNodeName({nodeName: SIDE_MENU_NODE_NAME}) ?? INIT_SIDE_MENU_SIZE;
  const isHide = justLayoutStore.isPrimaryHide({nodeName: SIDE_MENU_NODE_NAME}) ?? false;

  useEffect(() => {
    console.log(boardListKey)
    window.api.addWatchPath([boardListKey])
  }, [])

  useEffect(() => {
    if (!jsonDataStore.jsonDataMap[boardListKey]) return;
    console.log(jsonDataStore.jsonDataMap[boardListKey])

  }, [jsonDataStore.jsonDataMap[boardListKey]])

  return (
    <div className="just-tool-bar">
      <div
        className={classNames("just-app-icon", {"on": !isHide})}
        onClick={toggleSideMenu}
      >
        {/*<IconLogo />*/}
        <Icon icon={faBars} />
      </div>
      <div className="just-tool-center">
        {
          (size <= 40 || isHide) &&
          jsonDataStore.jsonDataMap[boardListKey].data.boardList.map(item =>
            <div key={JustUtil.toString(item.boardId)} className="just-tool-center-menu" onClick={() => openBoard(item)} title={item.boardNm}>
              <div className="just-icon">
                <Jdenticon size="25" value={item.boardNm} />
              </div>
            </div>
          )
        }
      </div>
      <div className="just-app-icon" onClick={() => openWin(JustUtil.replaceDup(excalidrawViewId))}>
        <Icon icon={faPen} />
      </div>

      <div className="just-tool-menus">

        <Menu menuButton={
          <div className="just-tool-menu">
            <Icon icon={faGear} />
          </div>
        }>
          {/*<MenuItem className="just-menu-item" onClick={() => openWin(helpId)}>*/}
          {/*  <div className="just-icon">*/}
          {/*    {viewMap[helpId.viewId as ViewId].getIcon(helpId, layoutId)}*/}
          {/*  </div>*/}
          {/*  <div className="just-title">*/}
          {/*    {helpId.title}*/}
          {/*  </div>*/}
          {/*  <div className="just-icon"/>*/}
          {/*</MenuItem>*/}
          <MenuItem className="just-menu-item" onClick={() => openWin(aboutId)}>
            <div className="just-icon">
              {viewMap[aboutId.viewId as ViewId].getIcon(aboutId, layoutId)}
            </div>
            <div className="just-title">
              {aboutId.title}
            </div>
            <div className="just-icon" />
          </MenuItem>
        </Menu>
      </div>

    </div>
  )
})

export default JustToolBar
