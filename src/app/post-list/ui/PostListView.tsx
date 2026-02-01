import "./PostListView.css"
import {observer} from "mobx-react-lite";
import {List, ListImperativeAPI} from "react-window";
import PostListRow from "@/app/post-list/ui/PostListRow.tsx";
import pathUtils from "@/utils/pathUtils.ts";
import {useEffect, useRef} from "react";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import {JustId, JustUtil} from "@kangtae49/just-layout";
import usePostStore from "@/app/post/usePostStore.ts";
import {POST_ACTIVE_ID} from "@/app/post/post.constants.ts";

interface Props {
  justId: JustId
  layoutId: string
}

const PostListView = observer(({justId, layoutId}: Props) => {
  const listRef = useRef<ListImperativeAPI | null>(null);
  const postStore = usePostStore(POST_ACTIVE_ID)
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)
  const boardId = JustUtil.getParamString(justId, "boardId")!
  const boardListKey = pathUtils.getScriptSubPath(`data\\${boardId}.json`)

  const data = jsonDataStore.jsonDataMap[boardListKey]?.data
  const count = data?.page.totalElements ?? 0

  useEffect(() => {
    window.api.addWatchPath([boardListKey])
  }, [])

  useEffect(() => {
    if (postStore.post === null) return;
    if (!data) return;
    const idx = data._embedded.posts.findIndex((post: any) => post.postId === postStore.post?.postId)
    if (idx >= 0) {
      listRef?.current?.scrollToRow({align: "auto", behavior: "auto", index: idx})
    }
  }, [postStore.post])


  return (
    <div className="post-list-view">
      <div className="post-list-title">
        <div className="post-list-name">{JustUtil.getParamString(justId, "boardNm")}</div>
      </div>
      <div className="post-list-content">
        <List
          listRef={listRef}
          className="post-list-table"
          rowComponent={PostListRow}
          rowCount={count}
          // rowCount={200}
          rowHeight={25}
          rowProps={{
            count,
            layoutId,
            boardId,
          }}
          overscanCount={250}
          style={{}}
        />
      </div>
    </div>
  )
})

export default PostListView
