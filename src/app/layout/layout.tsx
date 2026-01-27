import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome";
import {faCircleQuestion, faCircleInfo, faPen} from "@fortawesome/free-solid-svg-icons";
import SideMenu from "@/app/side-menu/ui/SideMenu.tsx";
import Jdenticon from "react-jdenticon";
import AboutView from "@/app/about/AboutView.tsx";
import JustToolBar from "@/app/tool-bar/JustToolBar.tsx";
import React from "react";
import JustStatusBar from "@/app/status-bar/JustStatusBar.tsx";
import JustUtilBar from "@/app/util-bar/JustUtilBar.tsx";
import JustBottomPanel from "@/app/bottom-panel/JustBottomPanel.tsx";
import TopMenuBar from "@/app/top-menu/TopMenuBar.tsx";
import ExcalidrawView from "@/app/excalidraw/ExcalidrawView.tsx";
import ExcalidrawDataView from "@/app/excalidraw-data/ExcalidrawDataView.tsx";
import PostView from "@/app/board/ui/PostView.tsx";
import PostActiveView from "@/app/board/ui/PostActiveView.tsx";
import BoardListView from "@/app/board/ui/BoardListView.tsx";
import {JustId, JustNode, JustSplitPixels, JustUtil, WinInfo} from "@kangtae49/just-layout";
import TabTitle from "@/app/layout/TabTitle.tsx";
import pathUtils from "@/utils/pathUtils.ts";


export const LAYOUT_ID = "LAYOUT_ID"



export const TOP_MENU_NODE_NAME = "TOP_MENU_NODE_NAME"

export const STATUS_BAR_NODE_NAME = "STATUS_BAR_NODE"

export const BOTTOM_PANEL_NODE_NAME = "BOTTOM_PANEL_NODE"

export const TOOL_BAR_NODE_NAME = "TOOL_BAR_NODE"
export const UTIL_BAR_NODE_NAME = "UTIL_BAR_NODE"


export const SIDE_MENU_NODE_NAME = "SIDE_MENU_NODE"

export const JOB_MONITOR_LIST_NODE_NAME = "JOB_MONITOR_LIST_NODE"
export const JOB_MONITOR_VIEW_NODE_NAME = "JOB_MONITOR_VIEW_NODE"

export const CONTENTS_VIEW = "CONTENTS_VIEW"

export const INIT_SIDE_MENU_SIZE = 200
export const INIT_BOTTOM_PANEL_SIZE = 200

export type ViewId = "top-menu" | "status-bar"
  | "bottom-panel" | "tool-bar" | "util-bar"
  | "side-menu"
  | "board-list-view" | "post-view" | "post-active-view"
  | "about" | "help"
  | "excalidraw-data-view" | "excalidraw-view"

export const DND_ACCEPT_CONTENT = [
  "board-list-view", "post-view", "post-active-view",
  "about", "help",
  "excalidraw-view", "excalidraw-data-view",
]

export interface SideMenuItem {
  menuId: JustId,
  menuName: string
}

export const topMenuId: JustId = {viewId: 'top-menu', title: 'Top Menu'};
export const statusBarId: JustId = {viewId: 'status-bar', title: 'Status Bar'};
export const toolBarId: JustId = {viewId: 'tool-bar', title: 'Tool Bar'};
export const utilBarId: JustId = {viewId: 'util-bar', title: 'Util Bar'};
export const sideMenuId: JustId = {viewId: 'side-menu', title: 'Menu'};
export const aboutId: JustId = {viewId: 'about', title: 'About'};

export const helpId: JustId = {viewId: 'help', title: 'Help', params: {file: pathUtils.getScriptSubPath('data\\help.excalidraw')}};



export const excalidrawViewId: JustId = {viewId: 'excalidraw-view', title: 'Excalidraw View'};




export const viewMap: Record<ViewId, WinInfo> = {
  "top-menu": {
    getTabIcon: () => <div />,
    getView: (justId, layoutId) => {
      return (
        <TopMenuBar justId={justId} layoutId={layoutId}/>
      )
    }
  },
  "status-bar": {
    getTabIcon: () => <div />,
    getView: (justId, layoutId) => {
      return (
        <JustStatusBar justId={justId} layoutId={layoutId} />
      )
    }
  },
  "bottom-panel": {
    getTabIcon: () => <div />,
    getView: (justId, layoutId) => {
      return (
        <JustBottomPanel justId={justId} layoutId={layoutId} />
      )
    }
  },
  "util-bar": {
    getTabIcon: () => <div />,
    getView: (justId, layoutId) => {
      return (
        <JustUtilBar justId={justId} layoutId={layoutId} />
      )
    }
  },
  "tool-bar": {
    getTabIcon: () => <div/>,
    getView: (justId, layoutId) => {
      return (
        <JustToolBar justId={justId} layoutId={layoutId} />
      )
    }
  },
  "side-menu": {
    getTabIcon: () => <Icon icon={faCircleQuestion} />,
    getView: (justId, layoutId) => {
      return (
        <SideMenu justId={justId} layoutId={layoutId} />
      )
    }
  },
  "board-list-view": {
    getTabIcon: (justId) => <Jdenticon size="30" value={JustUtil.getParamString(justId, "boardNm")} />,
    getView: (justId, layoutId) => {
      return (
        <BoardListView justId={justId} layoutId={layoutId} />
      )
    }
  },
  "post-view": {
    getTabIcon: () => <Jdenticon size="30" value="post-view" />,
    getView: (justId, layoutId) => {
      return (
        <PostView justId={justId} layoutId={layoutId} />
      )
    }
  },
  "post-active-view": {
    getTabTitle: (props) => <TabTitle {...props} />,
    getTabIcon: () => <Jdenticon size="30" value="post-active-view" />,
    getView: (justId, layoutId) => {
      return (
        <PostActiveView justId={justId} layoutId={layoutId} />
      )
    }
  },
  "about": {
    getTabIcon: () => <Icon icon={faCircleInfo} />,
    getView: (justId, layoutId) => {
      return (
        <AboutView justId={justId} layoutId={layoutId} />
      )
    }
  },
  "help": {
    getTabIcon: () => <Icon icon={faCircleQuestion} />,
    getView: (justId, layoutId) => {
      return (
        <ExcalidrawDataView justId={justId} layoutId={layoutId} />
      )
    }
  },
  "excalidraw-view": {
    getTabIcon: () => <Icon icon={faPen} />,
    getView: (justId, layoutId) => {
      return (
        <ExcalidrawView justId={justId} layoutId={layoutId} />
      )
    }
  },
  "excalidraw-data-view": {
    getTabIcon: () => <Icon icon={faPen}/>,
    getView: (justId, layoutId) => {
      return (
        <ExcalidrawDataView justId={justId} layoutId={layoutId}/>
      )
    }
  }
}
// as Record<ViewId, WinInfo>;
// } as Record<ViewId, GetWinInfoFn>;


// CONFIG_KEYS.forEach((justId: JustId) => {
//
//   viewMap[justId.viewId as ViewId] = (justId: JustId) => ({
//     title: JustUtil.getParamString(justId, 'title'),
//     icon: <Jdenticon size="30" value={"setting-config"} />,
//     view: <GridView justId={justId} />
//   });
// })




export const layoutSideMenu: JustNode = {
  type: 'split-pixels',
  name: SIDE_MENU_NODE_NAME,
  direction: 'row',
  primary: 'first',
  primaryDefaultSize: 200,
  size: 200,
  // minSize: 38,
  first: {
    type: 'stack',
    tabs: [sideMenuId],
    active: sideMenuId,
    hideTitle: true,
  },
  second: {
    type: 'stack',
    name: CONTENTS_VIEW,
    dndAccept: DND_ACCEPT_CONTENT,
    tabs: [aboutId],
    active: aboutId,
  },
  // second: {
  //   type: 'split-percentage',
  //   name: CONTENTS_VIEW,
  //   direction: 'column',
  //   size: 50,
  //   dndAccept: DND_ACCEPT_CONTENT,
  //   first: {
  //     type: 'stack',
  //     tabs: [page01Id],
  //     active: page01Id
  //   },
  //   second: {
  //     type: 'stack',
  //     tabs: [aboutId, excalidrawViewId],
  //     active: excalidrawViewId
  //   }
  // },
}




const layoutUtilBar: JustSplitPixels = {
  type: 'split-pixels',
  direction: 'row',
  name: UTIL_BAR_NODE_NAME,
  primary: 'second',
  primaryDefaultSize: 40,
  size: 0,
  noSplitter: true,
  first: layoutSideMenu,
  second: {
    type: 'stack',
    tabs: [utilBarId],
    active: utilBarId,
    hideTitle: true,
  }
}

const layoutJobMonitor: JustSplitPixels = {
  type: 'split-pixels',
  direction: 'row',
  name: JOB_MONITOR_LIST_NODE_NAME,
  primary: 'first',
  primaryDefaultSize: 200,
  size: 200,
  noSplitter: false,
  first: {
    type: 'stack',
    tabs: [],
    active: null,
    hideTitle: true,
  },
  second: {
    type: 'stack',
    tabs: [],
    active: null,
    name: JOB_MONITOR_VIEW_NODE_NAME,
    dndAccept: ['job-monitor-view'],
  }
}

const layoutBottomPanel: JustSplitPixels  = {
  type: 'split-pixels',
  direction: 'column',
  name: BOTTOM_PANEL_NODE_NAME,
  primary: 'second',
  primaryDefaultSize: INIT_BOTTOM_PANEL_SIZE,
  size: INIT_BOTTOM_PANEL_SIZE,
  primaryHide: true,
  // noSplitter: false,
  first: layoutUtilBar,
  second: layoutJobMonitor,
}
const layoutToolBar: JustSplitPixels  = {
  type: 'split-pixels',
  direction: 'row',
  name: TOOL_BAR_NODE_NAME,
  primary: 'first',
  primaryDefaultSize: 40,
  size: 40,
  noSplitter: true,
  first: {
    type: 'stack',
    tabs: [toolBarId],
    active: toolBarId,
    hideTitle: true,
  },
  second: layoutBottomPanel
}

const layoutStatusBar: JustSplitPixels  = {
  type: 'split-pixels',
  direction: 'column',
  name: STATUS_BAR_NODE_NAME,
  primary: 'second',
  primaryDefaultSize: 40,
  size: 34,
  noSplitter: true,
  first: layoutToolBar,
  second: {
    type: 'stack',
    tabs: [statusBarId],
    active: statusBarId,
    hideTitle: true
  },
}

const layoutTopMenu: JustSplitPixels = {
  type: 'split-pixels',
  direction: 'column',
  name: TOP_MENU_NODE_NAME,
  primary: 'first',
  primaryDefaultSize: 40,
  size: 40,
  noSplitter: true,
  first: {
    type: 'stack',
    tabs: [topMenuId],
    active: topMenuId,
    hideTitle: true
  },
  second: layoutStatusBar
}


export const initialLayoutValue: JustNode = layoutTopMenu


