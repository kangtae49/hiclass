import "./JustStatusBar.css"
// import {
//   BOTTOM_PANEL_NODE_NAME,
// } from "@/app/layout/layout.tsx";
// import {useJustLayoutStore} from "@/app/components/just-layout/useJustLayoutStore.ts";
import {observer} from "mobx-react-lite";
import {JustId} from "@kangtae49/just-layout";

interface Props {
  justId: JustId
  layoutId: string
}
const JustStatusBar = observer(({justId: _justId}: Props) => {
  // const justLayoutStore = useJustLayoutStore(layoutId)


  // const toggleBottomPanel = () => {
  //   justLayoutStore.toggleWin({nodeName: BOTTOM_PANEL_NODE_NAME})
  // }

  // const size = justLayoutStore.getSizeByNodeName({nodeName: BOTTOM_PANEL_NODE_NAME}) ?? INIT_BOTTOM_PANEL_SIZE;
  // const isHide = justLayoutStore.isPrimaryHide({nodeName: BOTTOM_PANEL_NODE_NAME}) ?? false;
  return (
    <div className="just-status-bar">
      <div className="just-status-center">

      </div>
      {/*<div*/}
      {/*  className={classNames("just-status-icon", {"on": !isHide})}*/}
      {/*  onClick={toggleBottomPanel}*/}
      {/*>*/}
      {/*  <Icon icon={faTerminal} />*/}
      {/*</div>*/}

    </div>
  )
})

export default JustStatusBar
