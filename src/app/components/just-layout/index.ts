import React, {JSX} from "react";
import {JustId} from "@/app/components/just-layout/justLayout.types.ts";


export interface WinInfo {
  title: string | GetTitleFn
  getIcon: GetIconFn
  getView: GetViewFn
  canDup?: boolean
  showClose?: boolean
  canFullScreen?: boolean
}
export type GetWinInfoFn = (justId: JustId) => WinInfo;
export type GetTitleFn = (justId: JustId) => string;
export type GetViewFn = (justId: JustId, layoutId: string) => JSX.Element;
export type GetIconFn = (justId: JustId, layoutId: string) => JSX.Element;
export type CloseWinFn = (justId: JustId) => void;
export type OnClickTitleFn = (event: React.MouseEvent, justId: JustId) => void;
export type OnDoubleClickTitleFn = (event: React.MouseEvent, justId: JustId) => void;

