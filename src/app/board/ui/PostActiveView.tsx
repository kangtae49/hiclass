import "./PostActiveView.css"
import {observer} from "mobx-react-lite";
import {JustId} from "@/app/components/just-layout/justLayout.types.ts";
import useBoardStore from "@/app/board/useBoardStore.ts";
import {BOARD_ID} from "@/app/board/board.constants.ts";
import useJsonDataStore from "@/app/json-data/useJsonDataStore.tsx";
import {JSON_DATA_ID} from "@/app/json-data/jsonData.constants.ts";
import pathUtils from "@/utils/pathUtils.ts";
import {useCallback, useEffect} from "react";
import {replaceUrl} from "@/utils/htmlUtils.ts";
import CommentList from "@/app/board/ui/CommentList.tsx";
import PostAttachList from "@/app/board/ui/PostAttachList.tsx";
import {format} from "date-fns";
import {FontAwesomeIcon as Icon} from "@fortawesome/react-fontawesome"
import {faClone} from "@fortawesome/free-solid-svg-icons";
import {CONTENTS_VIEW} from "@/app/layout/layout.tsx";
import {useJustLayoutStore} from "@/app/components/just-layout/useJustLayoutStore.ts";

interface Props {
  justId: JustId
  layoutId: string
}

const PostActiveView = observer(({justId, layoutId}: Props) => {
  const justLayoutStore = useJustLayoutStore(layoutId)
  const boardStore = useBoardStore(BOARD_ID)
  const jsonDataStore = useJsonDataStore(JSON_DATA_ID)
  const postId = boardStore.post?.postId
  const boardId = boardStore.post?.boardId

  const boardListKey = pathUtils.getScriptSubPath(`data\\${boardId}.json`)
  const commentKey = pathUtils.getScriptSubPath(`data\\${boardId}_comment\\${postId}.json`)

  const boardListData = jsonDataStore.jsonDataMap[boardListKey]?.data
  const posts = boardListData?.['_embedded']['posts']
  const post = posts?.find(post => post.postId === postId)
  const commentListData = jsonDataStore.jsonDataMap[commentKey]?.data
  const comments = commentListData?.['_embedded']['postComments']

  const title = post?.postTitle
  const posted = post?.posted ? format(new Date(post.posted), "yyyy-MM-dd HH:mm:ss") : ''
  const boardNm = post?.board.boardName
  const htmlContent = replaceUrl(post?.postContent, pathUtils.getScriptSubPath(`data\\${boardId}_attach`))
  const userName = post?.writeUser.userName

  useEffect(() => {
    window.api.addWatchPath([boardListKey, commentKey])
  }, [])

  const openBoard = () => {
    const postId = boardStore.post?.postId
    const boardId = boardStore.post?.boardId
    if (!boardId || !postId) return
    console.log("openBoard", boardId, postId)
    const boardJustId = {
      ...justId,
      title: post?.postTitle,
      viewId: "post-view",
      params: {boardId, postId}
    }
    justLayoutStore.openWinByNodeName({justId: boardJustId, nodeName: CONTENTS_VIEW})
  }

  return (
    boardStore.post &&
    <div className="post-active-view">
        <div className="tm">{boardNm} {posted} {userName}</div>
        <div className="post-title"><Icon icon={faClone} onClick={() => openBoard()}/><strong>{title}</strong></div>
        <div className="post-content">
          <div className="post-html" dangerouslySetInnerHTML={{ __html: htmlContent }}></div>
          <PostAttachList boardId={boardId!} postId={postId!} files={post?.files} />
          <CommentList boardId={boardId} postId={postId} comments={comments}/>
        </div>
    </div>
  )
})

export default PostActiveView