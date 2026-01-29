import {observer} from "mobx-react-lite";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import pathUtils from "@/utils/pathUtils.ts";
import {format} from "date-fns";
import {replaceUrl} from "@/utils/htmlUtils.ts";
import {useEffect} from "react";
import PostAttachList from "@/app/board/ui/PostAttachList.tsx";
import CommentList from "@/app/board/ui/CommentList.tsx";
import {JustId, JustUtil, useJustLayoutStore} from "@kangtae49/just-layout";
import {CONTENTS_VIEW} from "@/app/layout/layout.tsx";
import useBoardStore from "@/app/board/useBoardStore.ts";
import {BOARD_ID} from "@/app/board/board.constants.ts";

interface Props {
  justId: JustId
  layoutId: string
}

const postView = observer(({justId, layoutId}: Props) => {
  const boardStore = useBoardStore(BOARD_ID)
  const justLayoutStore = useJustLayoutStore(layoutId)
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)
  const postId = JustUtil.getParamString(justId, "postId")!
  const boardId = JustUtil.getParamString(justId, "boardId")!
  console.log("postView", justId, postId, boardId)

  const boardListKey = pathUtils.getScriptSubPath(`data\\${boardId}.json`)
  const commentKey = pathUtils.getScriptSubPath(`data\\${boardId}_comment\\${postId}.json`)

  const boardListData = jsonDataStore.jsonDataMap[boardListKey]?.data

  const posts = boardListData?.['_embedded']['posts']
  const post = posts?.find(post => post.postId === postId)
  // const commentListData = jsonDataStore.jsonDataMap[commentKey]?.data
  // const comments = commentListData?.['_embedded']['postComments']

  const title = post?.postTitle
  const posted = post?.posted ? format(new Date(post.posted), "yyyy-MM-dd HH:mm:ss") : ''
  const boardNm = post?.board.boardName
  const htmlContent = replaceUrl(post?.postContent, pathUtils.getScriptSubPath(`data\\${boardId}_attach`))
  const userName = post?.writeUser.userName

  useEffect(() => {
    if (commentKey) {
      window.api.addWatchPath([commentKey])
    }
    if (boardListKey) {
      window.api.addWatchPath([boardListKey])
    }
  }, [commentKey, boardListKey])

  const openPost = () => {
    const boardJustId: JustId = {viewId: "board-list-view", title: boardNm, params: {boardId: boardId, boardNm: boardNm}}
    console.log('openBoard', boardJustId)
    justLayoutStore.openWinByNodeName({justId: boardJustId, nodeName: CONTENTS_VIEW})
    if (!postId || !boardId) return;
    const justId: JustId = { viewId: "post-active-view", title: '내용' }
    boardStore.setPost({boardId, postId})
    justLayoutStore.openWinByNodeName({justId, nodeName: CONTENTS_VIEW})
  }

  return (
    <div className="post-active-view">
      <div className="tm">
        <span onClick={openPost}> {boardNm} </span>
        {posted}
        {userName}
      </div>
        <div className="post-title"><strong onClick={openPost}>{title}</strong></div>
        <div className="post-content">
          <div className="post-html" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
          <CommentList
            boardId={boardId}
            postId={postId}
            commentKey={commentKey}
           // comments={jsonDataStore.jsonDataMap[commentKey]?.data._embedded.postComments}
          />
          <PostAttachList
            boardId={boardId}
            postId={postId}
            files={post?.files}
          />
        </div>
    </div>
  )
})

export default postView