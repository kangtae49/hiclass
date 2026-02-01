import './App.css'
import "@kangtae49/just-layout/style.css"
import WatchListener from "@/app/listeners/WatchListener";
import React, {useEffect} from "react";

import {observer} from "mobx-react-lite";
import KeyDownListener from "@/app/listeners/KeyDownListener.tsx";
import {EXCALIDRAW_DATA_KEYS} from "@/app/excalidraw-data/excalidrawData.constants.ts";
import type {JustId, WinInfo} from "@kangtae49/just-layout";
import {JustUtil, useJustLayoutStore} from "@kangtae49/just-layout";
import {JustLayoutView} from "@kangtae49/just-layout";
import {initialLayoutValue, LAYOUT_ID, ViewId, viewMap} from "@/app/layout/layout.tsx";

function getWinInfo(justId: JustId): WinInfo {
  const viewId = justId.viewId as ViewId;
  return viewMap[viewId]
}

const App = observer(() => {
  const layoutId = LAYOUT_ID
  const layoutFullScreenId = `${layoutId}_FULLSCREEN`
  // const justLayoutStore = useJustLayoutStore(layoutId);
  const justLayoutFullScreenStore = useJustLayoutStore(layoutFullScreenId)

  useEffect(() => {



    const startWatcher = async () => {
      await window.api.startWatching()


      await window.api.addWatchPath(EXCALIDRAW_DATA_KEYS.map((justId) => JustUtil.getParamString(justId, 'file')!))
    }
    startWatcher()

    window.api.onSuspend((event) => {
      console.log('onSuspend', event)
    })


    // CONFIG_KEYS.forEach((justId: JustId) => {
    //   const file: string = JustUtil.getParamString(justId, 'file');
    //   window.api.readDataExcel(file)
    //     .then(gridData => {
    //       if (gridData) {
    //         updateGridData(gridData)
    //       }
    //     })
    // })
    // EXCALIDRAW_DATA_KEYS.forEach((justId: JustId) => {
    //   const file: string = JustUtil.getParamString(justId, 'file');
    //   window.api.readDataExcalidraw(file)
    //     .then(excalidrawData => {
    //       if (excalidrawData) {
    //         updateExcalidrawData(excalidrawData)
    //       }
    //     })
    // })
    return () => {
      window.api.stopWatching()
    }

  }, [])

  useEffect(() => {
    console.log('useEffect justLayoutFullScreenStore.layout', justLayoutFullScreenStore.layout)
    const isFull = justLayoutFullScreenStore.layout !== null
    console.log('isFull', isFull)
    const changeScreen = async (isFull: boolean) => {
      const isFullScreen = await window.api.isFullScreen()
      if (isFullScreen !== isFull) {
        await window.api.setFullScreen(isFull)
      }

      const isMaximized = await window.api.isMaximized();
      if (isMaximized !== isFull) {
        if (isFull) {
          window.api.maximize()
        } else {
          window.api.unmaximize()
        }
      }
    }
    changeScreen(isFull)
  }, [justLayoutFullScreenStore.layout])

  // const closeWin = (justId: JustId) => {
  //   console.log('closeWin!!!', justId)
  // }
  // const onClickTitle = (_e: React.MouseEvent, _justId: JustId) => {
  // }
  // const onDoubleClickTitle = (_e: React.MouseEvent, _justId: JustId) => {
  //   // justLayoutStore.toggleWin({nodeName: SIDE_MENU_NODE_NAME})
  // }

  return (
    <>
      <KeyDownListener />
      <WatchListener />
      <div className="just-app">
        <div className="just-con">
          <JustLayoutView
            layoutId={layoutId}
            initialValue={initialLayoutValue}
            getWinInfo={getWinInfo}
          />
        </div>
      </div>
    </>
  )
})

export default App

